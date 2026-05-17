// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useR2, type R2File } from '../useR2'
import type { AdminPage, ImageSlot, PageSection, MetaField } from '../pages'

interface QueueItem {
  id: string
  file: File
  preview: string
  targetFolder: string
  fileName: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  errorMsg?: string
}

interface MetaModalState {
  slot: ImageSlot
  section: PageSection
  pendingFile: File | null
  pendingPreview: string | null
  isNew?: boolean  // true when adding a brand-new dynamic slot
}

interface Props {
  page: AdminPage
  adminPass: string
  onBack: () => void
}

function formatBytes(b: number) {
  if (b < 1024) return `${b}B`
  if (b < 1048576) return `${(b / 1024).toFixed(0)}KB`
  return `${(b / 1048576).toFixed(1)}MB`
}

// Default fields shown in modal for slots without custom meta
const DEFAULT_META: MetaField[] = [
  { key: 'title',       label: 'Tiêu đề',  placeholder: '' },
  { key: 'description', label: 'Mô tả',    placeholder: '', multiline: true },
]

export default function PageDetail({ page, adminPass, onBack }: Props) {
  const { listFolder, uploadFile, deleteFile, readContent, saveContent, busy } = useR2(adminPass)

  const [filesByFolder, setFilesByFolder] = useState<Record<string, R2File[]>>({})
  const [loadingFiles, setLoadingFiles] = useState(true)
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragOverSection, setDragOverSection] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<R2File | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Meta content: sectionId → { slotKey → { fieldKey → value } }
  const [metaContent, setMetaContent] = useState<Record<string, Record<string, Record<string, string>>>>({})

  // Modal state
  const [metaModal, setMetaModal] = useState<MetaModalState | null>(null)
  const [modalMeta, setModalMeta] = useState<Record<string, string>>({})
  const [modalFileName, setModalFileName] = useState('')
  const [modalSaving, setModalSaving] = useState(false)
  const modalInputRef = useRef<HTMLInputElement>(null)

  const folders = [...new Set(page.sections.flatMap(s => s.slots.map(sl => sl.folder)))]

  const refresh = useCallback(async () => {
    setLoadingFiles(true)
    const results = await Promise.all(folders.map(f => listFolder(f)))
    const map: Record<string, R2File[]> = {}
    folders.forEach((f, i) => { map[f] = results[i] })
    setFilesByFolder(map)
    setLoadingFiles(false)
  }, [page.id])

  useEffect(() => {
    setQueue([])
    setMetaContent({})
    setMetaModal(null)
    refresh()
    // Load saved metadata for every section
    page.sections.forEach(async section => {
      const key = section.contentKey ?? `content/${page.id}/${section.id}.json`
      const data = await readContent(key)
      if (data) setMetaContent(prev => ({ ...prev, [section.id]: data }))
    })
  }, [page.id])

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const getSlotFile = (slot: ImageSlot): R2File | undefined =>
    filesByFolder[slot.folder]?.find(f => f.name === slot.fileName)

  // ── Modal helpers ──────────────────────────────────────────────────────────

  const openMeta = (slot: ImageSlot, section: PageSection) => {
    setModalMeta(metaContent[section.id]?.[slot.key] ?? {})
    setModalFileName(slot.fileName)
    setMetaModal({ slot, section, pendingFile: null, pendingPreview: null })
  }

  const openNewSlot = (section: PageSection) => {
    const folder = section.slots[0]?.folder ?? folders[0] ?? 'gallery'
    setModalMeta({})
    setModalFileName('')
    setMetaModal({
      slot: { key: `__new__${Date.now()}`, fileName: '', folder, label: '', note: '' },
      section,
      pendingFile: null,
      pendingPreview: null,
      isNew: true,
    })
  }

  const handleModalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && metaModal) {
      setMetaModal(prev =>
        prev ? { ...prev, pendingFile: file, pendingPreview: URL.createObjectURL(file) } : null
      )
    }
    e.target.value = ''
  }

  const handleModalSave = async () => {
    if (!metaModal) return
    const isNew = metaModal.isNew

    // For new slots, filename is required
    if (isNew && !modalFileName.trim()) {
      showToast('err', '❌ Vui lòng nhập tên file')
      return
    }
    // For new slots, image is required
    if (isNew && !metaModal.pendingFile) {
      showToast('err', '❌ Vui lòng chọn ảnh')
      return
    }

    setModalSaving(true)
    try {
      const rawName = modalFileName.trim()
      const fileName = isNew
        ? rawName.replace(/[^a-z0-9._-]/gi, '-').toLowerCase()
        : metaModal.slot.fileName

      // Upload image if a new one was picked
      if (metaModal.pendingFile) {
        const { ok, error } = await uploadFile(metaModal.slot.folder, fileName, metaModal.pendingFile)
        if (!ok) { showToast('err', `❌ Upload thất bại: ${error}`); return }
      }

      // For new dynamic slots, use the filename as the metadata key
      const metaKey = isNew ? fileName : metaModal.slot.key
      const contentKey = metaModal.section.contentKey ?? `content/${page.id}/${metaModal.section.id}.json`
      const newContent = {
        ...metaContent[metaModal.section.id],
        [metaKey]: modalMeta,
      }
      const { ok, error } = await saveContent(contentKey, newContent)
      if (ok) {
        setMetaContent(prev => ({ ...prev, [metaModal.section.id]: newContent }))
        if (metaModal.pendingFile) await refresh()
        showToast('ok', isNew ? '✅ Đã thêm thẻ mới — live ngay!' : '💾 Đã lưu — live ngay!')
        setMetaModal(null)
      } else {
        showToast('err', `❌ Lỗi: ${error}`)
      }
    } finally {
      setModalSaving(false)
    }
  }

  // ── Free-upload queue helpers ──────────────────────────────────────────────

  const enqueue = (rawFiles: FileList | File[], folder: string, presetFileName?: string) => {
    const items: QueueItem[] = Array.from(rawFiles)
      .filter(f => f.type.startsWith('image/'))
      .map((f, i) => ({
        id: `${Date.now()}-${i}`,
        file: f,
        preview: URL.createObjectURL(f),
        targetFolder: folder,
        fileName: presetFileName && rawFiles.length === 1
          ? presetFileName
          : f.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase(),
        status: 'pending' as const,
      }))
    setQueue(p => [...p, ...items])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    enqueue(e.target.files, folders[0] ?? 'gallery')
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent, folder: string) => {
    e.preventDefault()
    setDragOverSection(null)
    enqueue(e.dataTransfer.files, folder)
  }

  const updateQueueItem = (id: string, patch: Partial<QueueItem>) =>
    setQueue(p => p.map(it => it.id === id ? { ...it, ...patch } : it))

  const uploadAll = async () => {
    const pending = queue.filter(it => it.status === 'pending')
    if (!pending.length) return
    setUploading(true)
    let doneCount = 0
    for (const item of pending) {
      updateQueueItem(item.id, { status: 'uploading' })
      const sanitizedName = item.fileName.replace(/[^a-z0-9._-]/gi, '-').toLowerCase()
      const { ok, error } = await uploadFile(item.targetFolder, sanitizedName, item.file)
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
  const totalSlots = page.sections.reduce((a, s) => a + s.slots.length, 0)
  const doneSlots = page.sections.reduce((a, s) =>
    a + s.slots.filter(sl => getSlotFile(sl) !== undefined).length, 0)

  return (
    <div className="h-full flex flex-col overflow-hidden bg-zinc-950">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl max-w-sm ${toast.type === 'ok' ? 'bg-emerald-900 text-emerald-100 border border-emerald-700' : 'bg-red-900 text-red-100 border border-red-700'}`}>
          {toast.msg}
        </div>
      )}

      {/* Sub-header */}
      <div className="flex-shrink-0 border-b border-white/10 px-6 py-4 bg-zinc-900/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-xs font-mono">{page.route}</p>
            <p className="text-zinc-500 text-xs mt-0.5">{page.sections.length} section · {totalSlots} ảnh cần có</p>
          </div>
          {totalSlots > 0 && !loadingFiles && (
            <div className="text-right">
              <span className={`text-xl font-bold ${doneSlots === totalSlots ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {doneSlots}/{totalSlots}
              </span>
              <p className="text-zinc-600 text-[10px]">ảnh đã upload</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-5 space-y-7">

          {/* Sections */}
          {page.sections.map(section => {
            const sectionDone = section.slots.filter(sl => getSlotFile(sl) !== undefined).length
            const slotFileNames = new Set(section.slots.map(s => s.fileName))
            const sectionFolder = section.slots[0]?.folder ?? folders[0]
            // Show extra files for ALL sections (not just freeUpload)
            const extraFiles = (filesByFolder[sectionFolder] ?? []).filter(f => !slotFileNames.has(f.name))

            return (
              <div key={section.id}>
                {/* Section header */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-white">{section.label}</h3>
                  {section.slots.length > 0 && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${sectionDone === section.slots.length ? 'text-emerald-400 bg-emerald-400/10' : 'text-zinc-500 bg-zinc-800'}`}>
                      {loadingFiles ? '...' : `${sectionDone}/${section.slots.length}`}
                    </span>
                  )}
                </div>
                {section.description && (
                  <p className="text-zinc-500 text-xs mb-2 leading-relaxed">{section.description}</p>
                )}

                {/* Slot grid */}
                {(section.slots.length > 0 || section.freeUpload) && (
                  <div
                    className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5"
                    onDragOver={e => { e.preventDefault(); setDragOverSection(section.id) }}
                    onDragLeave={() => setDragOverSection(null)}
                    onDrop={e => handleDrop(e, section.slots[0]?.folder ?? folders[0])}
                  >
                    {section.slots.map(slot => {
                      const uploaded = getSlotFile(slot)
                      const hasMeta = !!(metaContent[section.id]?.[slot.key] &&
                        Object.values(metaContent[section.id][slot.key]).some(v => v))
                      // Show static production image when R2 slot is empty
                      const showStatic = !uploaded && !!slot.staticPath
                      return (
                        <div
                          key={slot.key}
                          onClick={() => openMeta(slot, section)}
                          className={`relative rounded-xl border transition-all cursor-pointer group ${
                            uploaded
                              ? 'border-emerald-500/30 bg-emerald-900/10 hover:border-yellow-400/40'
                              : showStatic
                              ? 'border-blue-500/30 bg-blue-900/10 hover:border-yellow-400/40'
                              : 'border-dashed border-white/20 hover:border-yellow-400/50 hover:bg-yellow-400/5'
                          }`}
                        >
                          {/* Thumbnail */}
                          <div className="aspect-square rounded-t-xl overflow-hidden bg-zinc-900 relative">
                            {uploaded ? (
                              <img src={uploaded.url} alt={slot.label} className="w-full h-full object-cover" />
                            ) : showStatic ? (
                              <>
                                <img src={slot.staticPath} alt={slot.label} className="w-full h-full object-cover opacity-60" />
                                <div className="absolute inset-0 flex items-end justify-center pb-2">
                                  <span className="text-[9px] bg-blue-600/90 text-white px-2 py-0.5 rounded-full font-medium">
                                    📌 Đang dùng
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-zinc-700">
                                <span className="text-3xl">＋</span>
                                <span className="text-[10px]">Bấm để thêm</span>
                              </div>
                            )}
                            {/* Hover overlay */}
                            {(uploaded || showStatic) && (
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-[11px] font-medium">
                                  {uploaded ? '✏️ Sửa' : '⬆️ Thay bằng R2'}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Label row */}
                          <div className="p-2">
                            <div className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${uploaded ? 'bg-emerald-400' : showStatic ? 'bg-blue-400' : 'bg-zinc-600'}`} />
                              <p className="text-[11px] text-white font-medium truncate">{slot.label}</p>
                              {hasMeta && <span className="ml-auto text-[8px] text-yellow-400 flex-shrink-0">●</span>}
                            </div>
                            <p className="text-[9px] text-zinc-600 font-mono mt-0.5 truncate">{slot.fileName}</p>
                          </div>

                          {/* Quick actions */}
                          {uploaded && (
                            <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={e => { e.stopPropagation(); copyUrl(uploaded) }}
                                className="w-6 h-6 rounded-md bg-black/70 hover:bg-black text-white text-[10px] flex items-center justify-center"
                                title="Copy URL"
                              >
                                {copied === uploaded.key ? '✓' : '⎘'}
                              </button>
                              <button
                                onClick={e => { e.stopPropagation(); setDeleteTarget(uploaded) }}
                                className="w-6 h-6 rounded-md bg-black/70 hover:bg-red-900 text-white text-[10px] flex items-center justify-center"
                                title="Xóa"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {/* Extra uploaded files (shown for ALL sections) */}
                    {extraFiles.map(file => {
                      const extraMeta = metaContent[section.id]?.[file.name]
                      const hasMeta = !!(extraMeta && Object.values(extraMeta).some(v => v))
                      const extraSlot: ImageSlot = {
                        key: file.name, fileName: file.name,
                        folder: sectionFolder, label: file.name, note: '',
                      }
                      return (
                        <div
                          key={file.key}
                          onClick={() => openMeta(extraSlot, section)}
                          className="relative rounded-xl border border-white/10 hover:border-yellow-400/40 bg-zinc-900 overflow-hidden transition-all group cursor-pointer"
                        >
                          <div className="aspect-square">
                            <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="absolute inset-0 rounded-t-xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-[11px] font-medium">✏️ Sửa</span>
                          </div>
                          <div className="p-2">
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-emerald-400" />
                              <p className="text-[10px] text-zinc-400 font-mono truncate flex-1">{file.name}</p>
                              {hasMeta && <span className="text-[8px] text-yellow-400 flex-shrink-0">●</span>}
                            </div>
                            <p className="text-[9px] text-zinc-600 mt-0.5">{formatBytes(file.size)}</p>
                          </div>
                          <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={e => { e.stopPropagation(); copyUrl(file) }}
                              className="w-6 h-6 rounded-md bg-black/70 hover:bg-black text-white text-[10px] flex items-center justify-center"
                            >
                              {copied === file.key ? '✓' : '⎘'}
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); setDeleteTarget(file) }}
                              className="w-6 h-6 rounded-md bg-black/70 hover:bg-red-900 text-white text-[10px] flex items-center justify-center"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )
                    })}

                    {/* "+" card — shown on ALL sections */}
                    <div
                      onClick={() => openNewSlot(section)}
                      className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all border-white/15 hover:border-yellow-400/40 hover:bg-yellow-400/5 text-zinc-600 hover:text-zinc-400"
                    >
                      <span className="text-3xl">+</span>
                      <span className="text-[10px]">Thêm thẻ</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Upload queue (free upload only) */}
          {queue.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Hàng chờ upload</h3>
              <div className="space-y-2 bg-zinc-900/40 rounded-2xl p-4 border border-white/8">
                {queue.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-zinc-800/60 rounded-xl px-3 py-2">
                    <img src={item.preview} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <input
                        value={item.fileName}
                        onChange={e => setQueue(p => p.map(it => it.id === item.id
                          ? { ...it, fileName: e.target.value }
                          : it))}
                        disabled={item.status !== 'pending'}
                        className="w-full bg-zinc-900 border border-white/10 focus:border-yellow-400/50 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none disabled:opacity-60"
                        placeholder="ten-file.jpg"
                      />
                      <p className="text-[9px] text-zinc-600 mt-0.5">→ {item.targetFolder}/{item.fileName || '?'} · {formatBytes(item.file.size)}</p>
                    </div>
                    <div className="flex-shrink-0 w-14 text-right">
                      {item.status === 'pending' && (
                        <button onClick={() => setQueue(p => p.filter(it => it.id !== item.id))} className="text-zinc-600 hover:text-red-400 text-xs">✕</button>
                      )}
                      {item.status === 'uploading' && <span className="text-yellow-400 text-xs animate-pulse">⏳</span>}
                      {item.status === 'done' && <span className="text-emerald-400 text-xs">✅</span>}
                      {item.status === 'error' && <span className="text-red-400 text-xs" title={item.errorMsg}>❌</span>}
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={uploadAll}
                    disabled={uploading || pendingCount === 0}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-zinc-900 font-bold rounded-xl py-2.5 text-sm transition-colors"
                  >
                    {uploading ? '⏳ Đang upload...' : `⚡ Upload tất cả (${pendingCount} ảnh)`}
                  </button>
                  <button onClick={() => setQueue([])} className="px-3 border border-white/10 hover:border-red-900 text-zinc-600 hover:text-red-400 rounded-xl text-sm transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Hidden inputs */}
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileInput} />
      <input ref={modalInputRef} type="file" accept="image/*" className="hidden" onChange={handleModalFileChange} />

      {/* Delete confirm modal */}
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

      {/* ── Metadata modal ─────────────────────────────────────────────────── */}
      {metaModal && (() => {
        const uploaded = metaModal.isNew ? undefined : getSlotFile(metaModal.slot)
        const previewSrc = metaModal.pendingPreview ?? uploaded?.url ?? metaModal.slot.staticPath ?? null
        const isStaticPreview = !metaModal.pendingPreview && !uploaded?.url && !!metaModal.slot.staticPath
        const fields = metaModal.slot.meta?.length ? metaModal.slot.meta : DEFAULT_META
        const hasPendingImage = !!metaModal.pendingFile
        const hasImage = !!(previewSrc)
        return (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-white/15 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-white font-semibold">
                    {metaModal.isNew ? 'Thêm thẻ mới' : metaModal.slot.label}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    {metaModal.isNew ? metaModal.section.label : `${metaModal.slot.fileName} · ${metaModal.section.label}`}
                  </p>
                </div>
                <button
                  onClick={() => setMetaModal(null)}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="px-5 py-4 space-y-4 max-h-[65vh] overflow-y-auto">

                {/* Image area */}
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">Ảnh</p>
                  <div
                    className="aspect-video bg-zinc-800 rounded-xl overflow-hidden relative group cursor-pointer border border-white/8 hover:border-yellow-400/40 transition-colors"
                    onClick={() => modalInputRef.current?.click()}
                  >
                    {previewSrc ? (
                      <img
                        src={previewSrc}
                        className={`w-full h-full object-cover ${isStaticPreview ? 'opacity-70' : ''}`}
                        alt={metaModal.slot.label}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-600">
                        <span className="text-4xl">🖼️</span>
                        <span className="text-xs">Bấm để chọn ảnh</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium">
                        {hasImage ? '↑ Đổi ảnh' : '+ Chọn ảnh'}
                      </span>
                    </div>
                    {hasPendingImage && (
                      <span className="absolute top-2 left-2 text-[9px] bg-yellow-400 text-zinc-900 px-2 py-0.5 rounded-full font-bold">
                        Chưa upload
                      </span>
                    )}
                    {uploaded && !hasPendingImage && (
                      <span className="absolute top-2 left-2 text-[9px] bg-emerald-500/80 text-white px-2 py-0.5 rounded-full">
                        ✓ R2
                      </span>
                    )}
                    {isStaticPreview && (
                      <span className="absolute top-2 left-2 text-[9px] bg-blue-600/90 text-white px-2 py-0.5 rounded-full">
                        📌 Ảnh hiện tại (static)
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-600 mt-1">Bấm vào ảnh để {hasImage ? 'đổi' : 'chọn'} ảnh mới</p>
                </div>

                {/* Filename input — only for new dynamic slots */}
                {metaModal.isNew && (
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1.5">
                      Tên file <span className="text-red-400">*</span>
                    </label>
                    <input
                      value={modalFileName}
                      onChange={e => setModalFileName(e.target.value)}
                      placeholder="ten-anh.jpg"
                      className="w-full bg-zinc-800 border border-white/10 focus:border-yellow-400/60 rounded-xl px-3 py-2 text-sm text-white placeholder:text-zinc-600 font-mono focus:outline-none transition-colors"
                    />
                    {modalFileName && modalFileName !== modalFileName.replace(/[^a-z0-9._-]/gi, '-').toLowerCase() && (
                      <p className="text-[10px] text-yellow-500/80 mt-1">
                        Tên file sau khi lưu: <span className="font-mono">{modalFileName.replace(/[^a-z0-9._-]/gi, '-').toLowerCase()}</span>
                      </p>
                    )}
                    <p className="text-[10px] text-zinc-600 mt-0.5">Chỉ dùng chữ thường, số, dấu gạch ngang</p>
                  </div>
                )}

                {/* Meta fields */}
                <div className="space-y-3">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Thông tin</p>
                  {fields.map(field => (
                    <div key={field.key}>
                      <label className="text-[11px] text-zinc-400 block mb-1">{field.label}</label>
                      {field.multiline ? (
                        <textarea
                          value={modalMeta[field.key] ?? ''}
                          onChange={e => setModalMeta(prev => ({ ...prev, [field.key]: e.target.value }))}
                          placeholder={field.placeholder ?? metaModal.slot.note}
                          rows={3}
                          className="w-full bg-zinc-800 border border-white/10 focus:border-yellow-400/60 rounded-xl px-3 py-2 text-sm text-white placeholder:text-zinc-600 resize-none focus:outline-none transition-colors"
                        />
                      ) : (
                        <input
                          value={modalMeta[field.key] ?? ''}
                          onChange={e => setModalMeta(prev => ({ ...prev, [field.key]: e.target.value }))}
                          placeholder={field.placeholder ?? metaModal.slot.label}
                          className="w-full bg-zinc-800 border border-white/10 focus:border-yellow-400/60 rounded-xl px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-white/10 flex gap-3">
                <button
                  onClick={handleModalSave}
                  disabled={modalSaving}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-900 font-bold rounded-xl py-2.5 text-sm transition-colors"
                >
                  {modalSaving
                    ? '⏳ Đang lưu...'
                    : metaModal.isNew
                      ? '⚡ Thêm thẻ mới'
                      : hasPendingImage
                        ? '⚡ Upload & Lưu'
                        : '💾 Lưu thông tin'}
                </button>
                <button
                  onClick={() => setMetaModal(null)}
                  className="px-5 border border-white/15 text-zinc-400 hover:text-white rounded-xl text-sm transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
