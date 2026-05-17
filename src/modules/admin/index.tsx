// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PageDetail from './components/PageDetail'
import MediaLibrary from './components/MediaLibrary'
import { useStorage } from './useStorage'
import { PAGES, type AdminPage } from './pages'

const AUTH_KEY = 'gb_admin_pass'

// ─── Login ────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (p: string) => void }) {
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const { testAuth } = useStorage(pass)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pass.trim()) return
    setLoading(true)
    setErr('')
    const ok = await testAuth()
    setLoading(false)
    if (ok) {
      sessionStorage.setItem(AUTH_KEY, pass)
      onLogin(pass)
    } else {
      setErr('Sai mật khẩu hoặc chưa setup ADMIN_PASS trên Cloudflare Pages')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✂️</div>
          <h1 className="text-3xl font-bold text-white tracking-tight">G Admin</h1>
          <p className="text-zinc-500 text-sm mt-1.5">Quản lý nội dung · Cloudinary</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Mật khẩu admin"
            autoFocus
            className={`w-full bg-zinc-900 border rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none transition-colors text-sm ${err ? 'border-red-500/70' : 'border-white/10 focus:border-yellow-400/50'}`}
          />
          {err && <p className="text-red-400 text-xs text-center leading-relaxed">{err}</p>}
          <button type="submit" disabled={loading || !pass}
            className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-zinc-900 font-bold rounded-2xl py-4 text-sm transition-colors">
            {loading ? 'Đang kiểm tra...' : 'Đăng nhập'}
          </button>
        </form>
        <p className="text-center text-[11px] text-zinc-700 mt-8 leading-relaxed">
          Mật khẩu: <span className="text-zinc-600 font-mono">Cloudflare Pages → Settings → Env vars → ADMIN_PASS</span>
        </p>
      </div>
    </div>
  )
}

// ─── Page summary card ─────────────────────────────────────
function PageCard({
  page,
  totalSlots,
  doneSlots,
  loading,
  onClick,
}: {
  page: AdminPage
  totalSlots: number
  doneSlots: number
  loading: boolean
  onClick: () => void
}) {
  const pct = totalSlots ? Math.round((doneSlots / totalSlots) * 100) : 100
  const allDone = doneSlots === totalSlots
  const noneDone = doneSlots === 0

  return (
    <button
      onClick={onClick}
      className="group text-left bg-zinc-900/60 hover:bg-zinc-800/60 border border-white/8 hover:border-white/20 rounded-2xl p-5 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{page.icon}</span>
          <div>
            <p className="text-[10px] text-zinc-500 font-mono">{page.route}</p>
          </div>
        </div>
        {totalSlots > 0 && (
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${allDone ? 'text-emerald-400 bg-emerald-400/10' : noneDone ? 'text-red-400 bg-red-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
            {loading ? '...' : `${doneSlots}/${totalSlots}`}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-base mb-1">{page.label}</h3>

      {/* Sections list */}
      <div className="flex flex-wrap gap-1 mb-4">
        {page.sections.map(s => (
          <span key={s.id} className="text-[9px] text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded">
            {s.label}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      {totalSlots > 0 && (
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-emerald-400' : 'bg-yellow-400'}`}
            style={{ width: loading ? '0%' : `${pct}%` }}
          />
        </div>
      )}

      {/* CTA row */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
          {loading ? 'Đang tải...' : allDone ? 'Đầy đủ ảnh' : `Còn ${totalSlots - doneSlots} ảnh cần upload`}
        </span>
        <span className="text-yellow-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Chỉnh sửa →
        </span>
      </div>
    </button>
  )
}

// ─── Dashboard overview ────────────────────────────────────
type View = { type: 'overview' } | { type: 'page'; id: string } | { type: 'library' }

function Dashboard({ adminPass, onLogout }: { adminPass: string; onLogout: () => void }) {
  const [view, setView] = useState<View>({ type: 'overview' })
  // keep backward-compat alias
  const activePageId = view.type === 'page' ? view.id : null
  const setActivePageId = (id: string | null) =>
    setView(id ? { type: 'page', id } : { type: 'overview' })
  const [counts, setCounts] = useState<Record<string, { done: number; total: number }>>({})
  const [loadingCounts, setLoadingCounts] = useState(true)
  const { listFolder } = useStorage(adminPass)

  useEffect(() => {
    const load = async () => {
      setLoadingCounts(true)
      // Collect unique folders across all pages
      const allFolders = [...new Set(
        PAGES.flatMap(p => p.sections.flatMap(s => s.slots.map(sl => sl.folder)))
      )]
      // Load each folder once
      const folderFiles: Record<string, Set<string>> = {}
      await Promise.all(allFolders.map(async f => {
        const files = await listFolder(f)
        folderFiles[f] = new Set(files.map(fi => fi.name))
      }))
      // Count done slots per page
      const map: Record<string, { done: number; total: number }> = {}
      for (const page of PAGES) {
        let total = 0
        let done = 0
        for (const section of page.sections) {
          total += section.slots.length
          for (const slot of section.slots) {
            if (folderFiles[slot.folder]?.has(slot.fileName)) done++
          }
        }
        map[page.id] = { done, total }
      }
      setCounts(map)
      setLoadingCounts(false)
    }
    load()
  }, [])

  const activePage = PAGES.find(p => p.id === activePageId)

  return (
    <div className="h-screen bg-zinc-950 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex-shrink-0 h-14 bg-zinc-900 border-b border-white/10 flex items-center justify-between px-5 sm:px-7">
        <div className="flex items-center gap-3">
          {view.type !== 'overview' ? (
            <button onClick={() => setView({ type: 'overview' })} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <span className="text-sm">←</span>
              <span className="text-white font-semibold">
                {view.type === 'library' ? '🗂️ Thư viện ảnh' : `${PAGES.find(p => p.id === activePageId)?.icon} ${PAGES.find(p => p.id === activePageId)?.label}`}
              </span>
            </button>
          ) : (
            <>
              <span className="text-white font-semibold">✂️ G Admin</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full font-medium hidden sm:inline">
                ☁️ Cloudinary
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {view.type === 'overview' && (
            <button
              onClick={() => setView({ type: 'library' })}
              className="text-xs text-zinc-400 hover:text-yellow-400 transition-colors px-3 py-1.5 border border-white/8 hover:border-yellow-400/30 rounded-lg hidden sm:flex items-center gap-1.5"
            >
              🗂️ Thư viện ảnh
            </button>
          )}
          <a href="/" target="_blank" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors hidden sm:inline">
            🌐 Website →
          </a>
          <button onClick={() => { if (confirm('Đăng xuất?')) onLogout() }}
            className="text-xs text-zinc-600 hover:text-red-400 transition-colors px-3 py-1.5 border border-white/8 hover:border-red-900/50 rounded-lg">
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {view.type === 'library' ? (
          <MediaLibrary adminPass={adminPass} onBack={() => setView({ type: 'overview' })} />
        ) : view.type === 'page' ? (
          <PageDetail
            page={PAGES.find(p => p.id === view.id)!}
            adminPass={adminPass}
            onBack={() => setView({ type: 'overview' })}
          />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-5 sm:px-7 py-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Quản lý nội dung</h2>
                <p className="text-zinc-500 text-sm mt-1">Chọn trang cần bổ sung ảnh. Upload xong → live trên website ngay.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PAGES.map(page => (
                  <PageCard
                    key={page.id}
                    page={page}
                    totalSlots={counts[page.id]?.total ?? page.sections.reduce((a, s) => a + s.slots.length, 0)}
                    doneSlots={counts[page.id]?.done ?? 0}
                    loading={loadingCounts}
                    onClick={() => setView({ type: 'page', id: page.id })}
                  />
                ))}
              </div>

              {/* Thư viện shortcut */}
              <button
                onClick={() => setView({ type: 'library' })}
                className="mt-4 w-full p-4 bg-zinc-900/50 hover:bg-zinc-800/60 border border-white/8 hover:border-white/15 rounded-2xl text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">🗂️ Thư viện ảnh</p>
                    <p className="text-zinc-500 text-xs mt-0.5">Xem và xóa tất cả ảnh đã upload — tách biệt hoàn toàn với website</p>
                  </div>
                  <span className="text-yellow-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Mở →</span>
                </div>
              </button>

              <div className="mt-4 p-4 bg-zinc-900/50 border border-white/8 rounded-2xl text-xs text-zinc-500 space-y-1">
                <p>☁️ <strong className="text-zinc-400">Lưu trữ:</strong> Cloudinary CDN — tốc độ cao, tự tối ưu ảnh</p>
                <p>⚡ Upload xong → live ngay, không cần rebuild site</p>
                <p>🗑️ Xóa ảnh trong admin → xóa khỏi Cloudinary ngay lập tức</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Root ──────────────────────────────────────────────────
export default function AdminPage() {
  const [adminPass, setAdminPass] = useState<string | null>(
    () => sessionStorage.getItem(AUTH_KEY)
  )

  if (!adminPass) {
    return <LoginScreen onLogin={setAdminPass} />
  }

  return (
    <Dashboard
      adminPass={adminPass}
      onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAdminPass(null) }}
    />
  )
}
