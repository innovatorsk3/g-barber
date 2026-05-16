// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import { useR2, type R2File } from '../useR2'

interface Folder {
  id: string
  label: string
  path: string
  description: string
  hint: string
}

interface Props {
  folder: Folder
  adminPass: string
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FolderPanel({ folder, adminPass }: Props) {
  const { listFolder, uploadFile, deleteFile, busy } = useR2(adminPass)
  const [files, setFiles] = useState<R2File[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<R2File | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const refresh = async () => {
    setLoading(true)
    const list = await listFolder(folder.path)
    setFiles(list)
    setLoading(false)
  }

  useEffect(() => { refresh() }, [folder.id])

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4500)
  }

  const pickFile = (file: File) => {
    setSelected(file)
    setFileName(file.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase())
    setPreview(URL.createObjectURL(file))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) pickFile(file)
  }

  const handleUpload = async () => {
    if (!selected || !fileName.trim()) return
    const { ok, url, error } = await uploadFile(folder.path, fileName.trim(), selected)
    if (ok) {
      showToast('ok', `✅ Upload xong! Ảnh live ngay tại ${url}`)
      setSelected(null)
      setPreview(null)
      setFileName('')
      refresh()
    } else {
      showToast('err', `❌ ${error}`)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const { ok } = await deleteFile(deleteTarget.key)
    if (ok) {
      showToast('ok', `🗑️ Đã xóa "${deleteTarget.name}"`)
      setDeleteTarget(null)
      refresh()
    } else {
      showToast('err', '❌ Xóa thất bại')
    }
  }

  const copyPath = (file: R2File) => {
    navigator.clipboard.writeText(file.url)
    setCopied(file.key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl max-w-sm ${toast.type === 'ok' ? 'bg-emerald-900 text-emerald-100 border border-emerald-700' : 'bg-red-900 text-red-100 border border-red-700'}`}>
          {toast.msg}
        </div>
      )}

      <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-5">
          <h2 className="text-2xl font-semibold text-white">{folder.label}</h2>
          <p className="mt-1 text-sm text-zinc-400">{folder.description}</p>
          <p className="mt-1 text-xs text-zinc-500 font-mono">📁 R2 → {folder.path}/</p>
          <p className="mt-2 text-xs text-zinc-500 bg-zinc-800 rounded px-3 py-1.5 inline-block">
            💡 {folder.hint}
          </p>
        </div>

        {/* Upload zone */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Upload ảnh mới</h3>
          {!selected ? (
            <div
              onDrop={handleDrop}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragOver ? 'border-yellow-400 bg-yellow-400/5' : 'border-white/15 hover:border-white/30 hover:bg-white/[0.02]'}`}
            >
              <p className="text-4xl mb-3">🖼️</p>
              <p className="text-zinc-300 font-medium">Kéo thả ảnh vào đây</p>
              <p className="text-zinc-500 text-sm mt-1">hoặc click để chọn file</p>
              <p className="text-zinc-600 text-xs mt-2">JPG · PNG · WebP · GIF</p>
            </div>
          ) : (
            <div className="bg-zinc-800/60 rounded-2xl p-6 space-y-4 border border-white/10">
              <div className="flex gap-5">
                {preview && (
                  <img src={preview} className="w-32 h-32 object-cover rounded-xl border border-white/10 flex-shrink-0" />
                )}
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider block mb-1.5">Tên file</label>
                    <input
                      value={fileName}
                      onChange={e => setFileName(e.target.value.replace(/[^a-z0-9._-]/gi, '-').toLowerCase())}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-yellow-400/60"
                      placeholder="ten-file.jpg"
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      URL sau upload: <span className="text-zinc-400 font-mono">/uploads/{folder.path}/{fileName}</span>
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">{selected.name} · {formatBytes(selected.size)}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleUpload}
                  disabled={busy || !fileName.trim()}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
                >
                  {busy ? '⏳ Đang upload...' : '⚡ Upload lên R2 (live ngay)'}
                </button>
                <button
                  onClick={() => { setSelected(null); setPreview(null); setFileName('') }}
                  className="px-5 py-2.5 text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f); e.target.value = '' }} />
        </div>

        {/* Current files */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
              Ảnh hiện có
              {!loading && <span className="text-zinc-500 normal-case font-normal ml-1">({files.length} file)</span>}
            </h3>
            <button onClick={refresh} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">↻ Làm mới</button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-zinc-500 text-sm">Đang tải từ R2...</div>
          ) : files.length === 0 ? (
            <div className="text-center py-12 text-zinc-600 text-sm border border-dashed border-white/10 rounded-2xl">
              Chưa có ảnh nào trong thư mục này
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map(file => (
                <div key={file.key} className="group bg-zinc-800/50 rounded-xl overflow-hidden border border-white/8 hover:border-yellow-400/30 transition-all">
                  <div className="relative aspect-square bg-zinc-900">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs text-zinc-300 font-mono truncate">{file.name}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{formatBytes(file.size)}</p>
                    <div className="flex gap-1.5 mt-2">
                      <button
                        onClick={() => copyPath(file)}
                        className="flex-1 text-[10px] py-1 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-colors"
                      >
                        {copied === file.key ? '✅ Copied' : '📋 Copy URL'}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(file)}
                        className="px-2 py-1 rounded-md bg-zinc-700 hover:bg-red-900 text-zinc-400 hover:text-red-300 text-[10px] transition-colors"
                        title="Xóa ảnh"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/15 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h4 className="text-white font-semibold">Xác nhận xóa</h4>
            <p className="text-zinc-400 text-sm">
              Xóa <span className="text-white font-mono">{deleteTarget.name}</span>?<br />
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button onClick={handleDelete} disabled={busy}
                className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium rounded-xl py-2.5 text-sm transition-colors">
                {busy ? 'Đang xóa...' : 'Xóa'}
              </button>
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-white/15 text-zinc-300 hover:text-white rounded-xl py-2.5 text-sm transition-colors">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
