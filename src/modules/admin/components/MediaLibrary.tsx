// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react'
import { useR2 } from '../useR2'

interface LibFile {
  key: string
  name: string
  folder: string
  size: number
  uploaded: string
  url: string
}

interface Props {
  adminPass: string
  onBack: () => void
}

function formatBytes(b: number) {
  if (b < 1024) return `${b}B`
  if (b < 1048576) return `${(b / 1024).toFixed(0)}KB`
  return `${(b / 1048576).toFixed(1)}MB`
}

function formatDate(s: string) {
  try { return new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' }) }
  catch { return '' }
}

export default function MediaLibrary({ adminPass, onBack }: Props) {
  const { deleteFile, busy } = useR2(adminPass)
  const headers = { 'X-Admin-Pass': adminPass }

  const [files, setFiles] = useState<LibFile[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFolder, setActiveFolder] = useState<string>('__all__')
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<LibFile | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [lightbox, setLightbox] = useState<LibFile | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/list-all', { headers })
      const { files: data } = await res.json()
      setFiles(data ?? [])
    } catch {
      setFiles([])
    } finally {
      setLoading(false)
    }
  }, [adminPass])

  useEffect(() => { load() }, [])

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const folders = ['__all__', ...Array.from(new Set(files.map(f => f.folder).filter(Boolean))).sort()]

  const visible = files.filter(f => {
    if (activeFolder !== '__all__' && f.folder !== activeFolder) return false
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { ok } = await deleteFile(deleteTarget.key)
    setDeleting(false)
    if (ok) {
      setFiles(p => p.filter(f => f.key !== deleteTarget.key))
      showToast('ok', `🗑️ Đã xóa "${deleteTarget.name}"`)
      setDeleteTarget(null)
      if (lightbox?.key === deleteTarget.key) setLightbox(null)
    } else {
      showToast('err', '❌ Xóa thất bại')
    }
  }

  const copyUrl = (file: LibFile) => {
    navigator.clipboard.writeText(window.location.origin + file.url)
    setCopied(file.key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-zinc-950">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[60] px-5 py-3 rounded-xl text-sm font-medium shadow-xl max-w-sm ${toast.type === 'ok' ? 'bg-emerald-900 text-emerald-100 border border-emerald-700' : 'bg-red-900 text-red-100 border border-red-700'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/10 px-6 py-4 bg-zinc-900/40">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-1">
            ← Tổng quan
          </button>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300 text-sm font-medium">🗂️ Thư viện ảnh</span>
          {!loading && (
            <span className="text-[11px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full ml-auto">
              {files.length} ảnh
            </span>
          )}
        </div>

        {/* Folder filter + search */}
        <div className="flex flex-wrap gap-2">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm tên file..."
            className="bg-zinc-800 border border-white/10 focus:border-yellow-400/50 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none w-40"
          />
          <div className="flex flex-wrap gap-1.5">
            {folders.map(f => (
              <button
                key={f}
                onClick={() => setActiveFolder(f)}
                className={`text-[11px] px-3 py-1 rounded-full border transition-all ${
                  activeFolder === f
                    ? 'bg-yellow-400 border-yellow-400 text-zinc-900 font-semibold'
                    : 'border-white/15 text-zinc-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {f === '__all__' ? `Tất cả (${files.length})` : `${f} (${files.filter(fi => fi.folder === f).length})`}
              </button>
            ))}
          </div>
          <button onClick={load} className="ml-auto text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            ↻ Làm mới
          </button>
        </div>
      </div>

      {/* Notice */}
      <div className="flex-shrink-0 mx-6 mt-3 px-3 py-2 bg-blue-950/50 border border-blue-800/40 rounded-xl text-[11px] text-blue-300/80 leading-relaxed">
        ℹ️ Thư viện hiển thị tất cả ảnh đã upload lên R2. Xóa tại đây <strong>không ảnh hưởng website</strong> nếu website đang dùng ảnh từ thư mục <code className="font-mono text-blue-300">/assets/</code> tĩnh — chỉ ảnh upload qua Admin mới bị xóa.
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-zinc-600 text-sm">
              <span className="animate-pulse">Đang tải...</span>
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-20 text-zinc-600 text-sm">
              {search ? `Không tìm thấy ảnh khớp với "${search}"` : 'Chưa có ảnh nào'}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5">
              {visible.map(file => (
                <div
                  key={file.key}
                  className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-white/8 hover:border-yellow-400/40 transition-all cursor-pointer"
                  onClick={() => setLightbox(file)}
                >
                  {/* Thumbnail */}
                  <div className="aspect-square overflow-hidden bg-zinc-800">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-2">
                    <p className="text-[9px] text-zinc-400 font-mono truncate">{file.name}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[8px] text-zinc-600">{formatBytes(file.size)}</span>
                      {file.folder && (
                        <span className="text-[8px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded truncate max-w-[60px]">{file.folder}</span>
                      )}
                    </div>
                  </div>

                  {/* Quick actions on hover */}
                  <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={e => { e.stopPropagation(); copyUrl(file) }}
                      className="w-6 h-6 rounded-md bg-black/70 hover:bg-black text-white text-[10px] flex items-center justify-center"
                      title="Copy URL"
                    >
                      {copied === file.key ? '✓' : '⎘'}
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); setDeleteTarget(file) }}
                      className="w-6 h-6 rounded-md bg-black/70 hover:bg-red-900 text-white text-[10px] flex items-center justify-center"
                      title="Xóa"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/15 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start gap-3">
              <img src={deleteTarget.url} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-white/10" />
              <div>
                <h4 className="text-white font-semibold">Xóa ảnh này?</h4>
                <p className="text-zinc-400 text-xs mt-1 font-mono break-all">{deleteTarget.key}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{formatBytes(deleteTarget.size)}</p>
              </div>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed bg-zinc-800/60 rounded-lg px-3 py-2">
              ⚠️ Ảnh sẽ bị xóa khỏi R2 vĩnh viễn. Nếu website đang dùng URL này, ảnh sẽ bị vỡ.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium rounded-xl py-2.5 text-sm transition-colors"
              >
                {deleting ? 'Đang xóa...' : 'Xóa'}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-white/15 text-zinc-300 hover:text-white rounded-xl py-2.5 text-sm transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={lightbox.url}
              alt={lightbox.name}
              className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* Info bar */}
            <div className="mt-3 flex items-center gap-3 bg-zinc-900/80 backdrop-blur rounded-xl px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{lightbox.name}</p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {lightbox.folder && <span className="mr-2">📁 {lightbox.folder}</span>}
                  {formatBytes(lightbox.size)}
                  {lightbox.uploaded && <span className="ml-2">{formatDate(lightbox.uploaded)}</span>}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => copyUrl(lightbox)}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs transition-colors"
                >
                  {copied === lightbox.key ? '✓ Copied' : '⎘ URL'}
                </button>
                <button
                  onClick={() => { setDeleteTarget(lightbox); setLightbox(null) }}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-red-900 text-zinc-400 hover:text-red-300 rounded-lg text-xs transition-colors"
                >
                  🗑️ Xóa
                </button>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg text-sm flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
