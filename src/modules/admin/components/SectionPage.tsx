// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useR2, type R2File } from '../useR2'
import type { Section } from '../sections'

interface QueueItem {
  id: string
  file: File
  preview: string
  fileName: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  errorMsg?: string
}

interface Props {
  section: Section
  adminPass: string
  onBack: () => void
}

function formatBytes(b: number) {
  if (b < 1024) return `${b}B`
  if (b < 1048576) return `${(b / 1024).toFixed(0)}KB`
  return `${(b / 1048576).toFixed(1)}MB`
}

export default function SectionPage({ section, adminPass, onBack }: Props) {
  const { listFolder, uploadFile, deleteFile, busy } = useR2(adminPass)
  const [files, setFiles] = useState<R2File[]>([])
  const [loadingFiles, setLoadingFiles] = useState(true)
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<R2File | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadedNames = new Set(files.map(f => f.name))

  const refresh = useCallback(async () => {
    setLoadingFiles(true)
    setFiles(await listFolder(section.path))
    setLoadingFiles(false)
  }, [section.id])

  useEffect(() => { refresh() }, [section.id])

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  // Add files to queue
  const enqueue = (rawFiles: FileList | File[], presetName?: string) => {
    const items: QueueItem[] = Array.from(rawFiles)
      .filter(f => f.type.startsWith('image/'))
      .map((f, i) => ({
        id: `${Date.now()}-${i}`,
        file: f,
        preview: URL.createObjectURL(f),
        fileName: presetName || f.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase(),
        status: 'pending' as const,
      }))
    setQueue(p => [...p, ...items])
  }

  // Click on a slot card → add to queue with preset filename
  const clickSlot = (slotFileName: string) => {
    inputRef.current?.click()
    // Store the slot name to use when file is picked
    inputRef.current!.dataset.slotName = slotFileName
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slotName = e.target.dataset.slotName || ''
    if (e.target.files?.length) {
      enqueue(
        e.target.files,
        e.target.files.length === 1 && slotName ? slotName : undefined
      )
    }
    e.target.value = ''
    delete e.target.dataset.slotName
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    enqueue(e.dataTransfer.files)
  }

  const updateQueueItem = (id: string, patch: Partial<QueueItem>) =>
    setQueue(p => p.map(it => it.id === id ? { ...it, ...patch } : it))

  const removeFromQueue = (id: string) =>
    setQueue(p => p.filter(it => it.id !== id))

  const uploadAll = async () => {
    const pending = queue.filter(it => it.status === 'pending')
    if (!pending.length) return
    setUploading(true)
    let doneCount = 0
    for (const item of pending) {
      updateQueueItem(item.id, { status: 'uploading' })
      const { ok, error } = await uploadFile(section.path, item.fileName, item.file)
      if (ok) {
        updateQueueItem(item.id, { status: 'done' })
        doneCount++
      } else {
        updateQueueItem(item.id, { status: 'error', errorMsg: error })
      }
    }
    setUploading(false)
    await refresh()
    if (doneCount > 0) {
      showToast('ok', `✅ Upload xong ${doneCount} ảnh — live ngay!`)
      // Clear done items after short delay
      setTimeout(() => setQueue(p => p.filter(it => it.status !== 'done')), 2000)
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

  const copyUrl = (file: R2File) => {
    navigator.clipboard.writeText(file.url)
    setCopied(file.key)
    setTimeout(() => setCopied(null), 2000)
  }

  const pendingCount = queue.filter(i => i.status === 'pending').length
  const doneSlots = section.slots.filter(s => uploadedNames.has(s.fileName)).length

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl max-w-sm ${toast.type === 'ok' ? 'bg-emerald-900 text-emerald-100 border border-emerald-700' : 'bg-red-900 text-red-100 border border-red-700'}`}>
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="flex-shrink-0 border-b border-white/10 px-6 py-4 bg-zinc-900/40">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-1">
            ← Tổng quan
          </button>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300 text-sm font-medium">{section.icon} {section.label}</span>
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-zinc-400 text-sm max-w-xl">{section.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {section.usedIn.map(u => (
                <span key={u} className="text-[10px] text-zinc-500 bg-zinc-800 border border-white/8 px-2.5 py-1 rounded-full">
                  📍 {u}
                </span>
              ))}
            </div>
          </div>
          {section.slots.length > 0 && (
            <div className="text-right flex-shrink-0">
              <span className={`text-2xl font-bold ${doneSlots === section.slots.length ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {doneSlots}/{section.slots.length}
              </span>
              <p className="text-zinc-500 text-xs mt-0.5">slot hoàn thành</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 space-y-8">

          {/* === SLOTS PANEL === */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
              Ảnh cần upload — bấm vào từng ô để upload đúng chỗ
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {section.slots.map(slot => {
                const uploaded = files.find(f => f.name === slot.fileName)
                return (
                  <div
                    key={slot.fileName}
                    onClick={() => !uploaded && clickSlot(slot.fileName)}
                    className={`relative rounded-xl border transition-all ${
                      uploaded
                        ? 'border-emerald-500/30 bg-emerald-900/10 cursor-default'
                        : 'border-dashed border-white/20 hover:border-yellow-400/50 hover:bg-yellow-400/5 cursor-pointer'
                    }`}
                  >
                    {/* Image or placeholder */}
                    <div className="aspect-square rounded-t-xl overflow-hidden bg-zinc-900">
                      {uploaded ? (
                        <img src={uploaded.url} alt={slot.label} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-700">
                          <span className="text-3xl">＋</span>
                          <span className="text-[10px]">Bấm để upload</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${uploaded ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                        <p className="text-xs text-white font-medium truncate">{slot.label}</p>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-0.5 truncate">{slot.note}</p>
                      <p className="text-[9px] text-zinc-600 font-mono mt-1 truncate">{slot.fileName}</p>
                    </div>

                    {/* Uploaded overlay actions */}
                    {uploaded && (
                      <div className="absolute top-1.5 right-1.5 flex gap-1">
                        <button
                          onClick={e => { e.stopPropagation(); copyUrl(uploaded) }}
                          className="w-6 h-6 rounded-md bg-black/60 hover:bg-black/80 text-white text-[10px] flex items-center justify-center"
                          title="Copy URL"
                        >
                          {copied === uploaded.key ? '✓' : '⎘'}
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); setDeleteTarget(uploaded) }}
                          className="w-6 h-6 rounded-md bg-black/60 hover:bg-red-900/80 text-white text-[10px] flex items-center justify-center"
                          title="Xóa"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Add more slot (free upload) */}
              {section.freeUpload && (
                <div
                  onClick={() => inputRef.current?.click()}
                  className="aspect-square rounded-xl border border-dashed border-white/15 hover:border-yellow-400/40 hover:bg-yellow-400/5 cursor-pointer flex flex-col items-center justify-center gap-2 text-zinc-600 hover:text-zinc-400 transition-all"
                >
                  <span className="text-3xl">+</span>
                  <span className="text-[10px]">Thêm ảnh</span>
                </div>
              )}
            </div>
          </div>

          {/* === MULTI UPLOAD ZONE === */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
              Upload nhiều ảnh cùng lúc
            </h3>
            <div
              onDrop={handleDrop}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => { if (!queue.length) inputRef.current?.click() }}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                dragOver
                  ? 'border-yellow-400 bg-yellow-400/5'
                  : queue.length
                  ? 'border-white/10 bg-zinc-900/30'
                  : 'border-white/15 hover:border-white/30 hover:bg-white/[0.02] cursor-pointer'
              }`}
            >
              {queue.length === 0 ? (
                <div className="py-4">
                  <p className="text-3xl mb-2">🖼️</p>
                  <p className="text-zinc-300 font-medium">Kéo thả nhiều ảnh vào đây</p>
                  <p className="text-zinc-500 text-sm mt-1">hoặc click để chọn nhiều file cùng lúc</p>
                  <p className="text-zinc-600 text-xs mt-1">JPG · PNG · WebP · GIF</p>
                </div>
              ) : (
                <div className="space-y-2 text-left">
                  {queue.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-zinc-800/60 rounded-xl px-3 py-2">
                      {/* Thumb */}
                      <img src={item.preview} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10" />

                      {/* Filename input */}
                      <div className="flex-1 min-w-0">
                        <input
                          value={item.fileName}
                          onChange={e => updateQueueItem(item.id, { fileName: e.target.value.replace(/[^a-z0-9._-]/gi, '-').toLowerCase() })}
                          disabled={item.status !== 'pending'}
                          className="w-full bg-zinc-900 border border-white/10 focus:border-yellow-400/50 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none disabled:opacity-60"
                          placeholder="ten-file.jpg"
                        />
                        <p className="text-[9px] text-zinc-600 mt-0.5 truncate">{formatBytes(item.file.size)}</p>
                      </div>

                      {/* Status / Remove */}
                      <div className="flex-shrink-0 w-16 text-right">
                        {item.status === 'pending' && (
                          <button onClick={() => removeFromQueue(item.id)} className="text-zinc-600 hover:text-red-400 text-xs transition-colors">
                            ✕ Bỏ
                          </button>
                        )}
                        {item.status === 'uploading' && (
                          <span className="text-yellow-400 text-xs animate-pulse">⏳</span>
                        )}
                        {item.status === 'done' && (
                          <span className="text-emerald-400 text-xs">✅</span>
                        )}
                        {item.status === 'error' && (
                          <span className="text-red-400 text-xs" title={item.errorMsg}>❌</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Action row */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={uploadAll}
                      disabled={uploading || pendingCount === 0}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-zinc-900 font-bold rounded-xl py-2.5 text-sm transition-colors"
                    >
                      {uploading ? '⏳ Đang upload...' : `⚡ Upload tất cả (${pendingCount} ảnh)`}
                    </button>
                    <button
                      onClick={() => inputRef.current?.click()}
                      className="px-4 border border-white/15 hover:border-white/30 text-zinc-400 hover:text-white rounded-xl text-sm transition-colors"
                    >
                      + Thêm
                    </button>
                    <button
                      onClick={() => setQueue([])}
                      className="px-3 border border-white/10 hover:border-red-900 text-zinc-600 hover:text-red-400 rounded-xl text-sm transition-colors"
                      title="Xóa hết queue"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* === ALL UPLOADED IMAGES === */}
          {files.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Tất cả ảnh đã upload <span className="text-zinc-600 normal-case font-normal">({files.length})</span>
                </h3>
                <button onClick={refresh} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">↻ Làm mới</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {files.map(file => (
                  <div key={file.key} className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-white/8 hover:border-yellow-400/30 transition-all">
                    <div className="aspect-square">
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-2">
                      <p className="text-[10px] text-zinc-400 font-mono truncate">{file.name}</p>
                      <p className="text-[9px] text-zinc-600 mt-0.5">{formatBytes(file.size)}</p>
                      <div className="flex gap-1 mt-1.5">
                        <button
                          onClick={() => copyUrl(file)}
                          className="flex-1 text-[9px] py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
                        >
                          {copied === file.key ? '✅' : '⎘ URL'}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(file)}
                          className="px-1.5 py-1 rounded bg-zinc-800 hover:bg-red-900 text-zinc-600 hover:text-red-300 text-[9px] transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loadingFiles && files.length === 0 && queue.length === 0 && (
            <p className="text-center text-zinc-600 text-sm py-6">Chưa có ảnh nào — upload ảnh đầu tiên ở trên</p>
          )}
        </div>
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />

      {/* Delete modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/15 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h4 className="text-white font-semibold">Xóa ảnh?</h4>
            <p className="text-zinc-400 text-sm">
              <span className="text-white font-mono">{deleteTarget.name}</span> sẽ bị xóa khỏi R2 ngay lập tức.
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
