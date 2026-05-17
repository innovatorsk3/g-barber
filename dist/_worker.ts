// @ts-nocheck
// Cloudflare Pages Advanced Mode Worker — Cloudinary storage backend
//
// Environment variables (Cloudflare Pages → Settings → Environment variables):
//   CLOUDINARY_CLOUD_NAME  = dfztwiflv
//   CLOUDINARY_API_KEY     = 296644442731214
//   CLOUDINARY_API_SECRET  = cbNI6sfcqAnUEBMIB6gd3YYJpbs
//   ADMIN_PASS             = your-admin-password

// ─── Auth ────────────────────────────────────────────────────────────────────

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

function checkAuth(request, env) {
  const pass = request.headers.get('X-Admin-Pass')
  return !!pass && pass === env.ADMIN_PASS
}

// ─── Cloudinary helpers ───────────────────────────────────────────────────────

async function sha1hex(message) {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(message))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function cloudinarySign(params, apiSecret) {
  const excluded = new Set(['api_key', 'resource_type', 'type', 'file'])
  const str = Object.keys(params)
    .filter(k => !excluded.has(k) && params[k] !== undefined && params[k] !== '')
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&') + apiSecret
  return sha1hex(str)
}

function cloudinaryBasicAuth(env) {
  return 'Basic ' + btoa(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`)
}

function apiBase(env) {
  return `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}`
}

function cdnBase(env) {
  return `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}`
}

// ─── POST /api/upload ─────────────────────────────────────────────────────────

async function handleUpload(request, env) {
  const form = await request.formData()
  const file = form.get('file')
  const folder = form.get('folder')
  const fileName = form.get('fileName')

  if (!file || !folder || !fileName) {
    return Response.json({ error: 'Thiếu file, folder hoặc fileName' }, { status: 400 })
  }
  if (!file.type.startsWith('image/')) {
    return Response.json({ error: 'Chỉ chấp nhận file ảnh' }, { status: 400 })
  }

  // public_id = folder/baseName (strip extension — Cloudinary tracks format separately)
  const baseName = fileName.replace(/\.[^.]+$/, '')
  const publicId = `${folder}/${baseName}`
  const timestamp = Math.floor(Date.now() / 1000).toString()

  const params = { overwrite: 'true', invalidate: 'true', public_id: publicId, timestamp }
  const signature = await cloudinarySign(params, env.CLOUDINARY_API_SECRET)

  const upload = new FormData()
  upload.append('file', file)
  upload.append('public_id', publicId)
  upload.append('overwrite', 'true')
  upload.append('invalidate', 'true')
  upload.append('api_key', env.CLOUDINARY_API_KEY)
  upload.append('timestamp', timestamp)
  upload.append('signature', signature)

  const res = await fetch(`${apiBase(env)}/image/upload`, { method: 'POST', body: upload })
  const data = await res.json()
  if (!res.ok) {
    return Response.json({ error: data.error?.message ?? 'Upload thất bại' }, { status: 500 })
  }

  return Response.json({ ok: true, url: data.secure_url })
}

// ─── GET /api/list?folder=xxx ─────────────────────────────────────────────────

async function handleList(request, env) {
  const url = new URL(request.url)
  const folder = url.searchParams.get('folder') ?? ''

  const apiUrl = new URL(`${apiBase(env)}/resources/image`)
  if (folder) apiUrl.searchParams.set('prefix', `${folder}/`)
  apiUrl.searchParams.set('max_results', '500')
  apiUrl.searchParams.set('type', 'upload')

  const res = await fetch(apiUrl.toString(), {
    headers: { Authorization: cloudinaryBasicAuth(env) },
  })
  const data = await res.json()

  const files = (data.resources ?? []).map(r => ({
    key: r.public_id,
    name: r.public_id.split('/').pop() + '.' + r.format,
    size: r.bytes,
    uploaded: r.created_at,
    url: r.secure_url,
  }))

  return Response.json({ files })
}

// ─── GET /api/list-all ────────────────────────────────────────────────────────

async function handleListAll(env) {
  const all = []
  let nextCursor

  do {
    const apiUrl = new URL(`${apiBase(env)}/resources/image`)
    apiUrl.searchParams.set('max_results', '500')
    apiUrl.searchParams.set('type', 'upload')
    if (nextCursor) apiUrl.searchParams.set('next_cursor', nextCursor)

    const res = await fetch(apiUrl.toString(), {
      headers: { Authorization: cloudinaryBasicAuth(env) },
    })
    const data = await res.json()
    all.push(...(data.resources ?? []))
    nextCursor = data.next_cursor
  } while (nextCursor)

  const files = all.map(r => ({
    key: r.public_id,
    name: r.public_id.split('/').pop() + '.' + r.format,
    folder: r.public_id.includes('/') ? r.public_id.split('/').slice(0, -1).join('/') : '',
    size: r.bytes,
    uploaded: r.created_at,
    url: r.secure_url,
  }))

  return Response.json({ files })
}

// ─── DELETE /api/delete ───────────────────────────────────────────────────────

async function handleDelete(request, env) {
  const { key } = await request.json() // key = Cloudinary public_id e.g. "gallery/cat-combo"
  if (!key) return Response.json({ error: 'key required' }, { status: 400 })

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const params = { public_id: key, timestamp }
  const signature = await cloudinarySign(params, env.CLOUDINARY_API_SECRET)

  const form = new FormData()
  form.append('public_id', key)
  form.append('api_key', env.CLOUDINARY_API_KEY)
  form.append('timestamp', timestamp)
  form.append('signature', signature)

  const res = await fetch(`${apiBase(env)}/image/destroy`, { method: 'POST', body: form })
  const data = await res.json()

  // "not found" is still a success (idempotent delete)
  if (data.result === 'ok' || data.result === 'not found') {
    return Response.json({ ok: true })
  }
  return Response.json({ error: data.result ?? 'Delete failed' }, { status: 500 })
}

// ─── GET /api/content  (PUBLIC — no auth, for production website)
// ─── PUT /api/content  (requires admin auth — handled by caller)

async function handleContent(request, env) {
  if (request.method === 'GET') {
    const url = new URL(request.url)
    const key = url.searchParams.get('key') // e.g. "content/featured.json"
    if (!key) return Response.json({ data: null })

    // Read raw JSON from Cloudinary CDN (publicly accessible)
    const cdnUrl = `${cdnBase(env)}/raw/upload/${key}?_=${Date.now()}`
    try {
      const res = await fetch(cdnUrl)
      if (!res.ok) return Response.json({ data: null })
      const data = await res.json()
      return Response.json({ data })
    } catch {
      return Response.json({ data: null })
    }
  }

  if (request.method === 'PUT') {
    const { key, data } = await request.json()
    if (!key) return Response.json({ error: 'key required' }, { status: 400 })

    const timestamp = Math.floor(Date.now() / 1000).toString()
    // Store JSON as Cloudinary raw resource; keep .json extension in public_id
    const params = { invalidate: 'true', overwrite: 'true', public_id: key, timestamp }
    const signature = await cloudinarySign(params, env.CLOUDINARY_API_SECRET)

    const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const form = new FormData()
    form.append('file', jsonBlob, 'data.json')
    form.append('public_id', key)
    form.append('overwrite', 'true')
    form.append('invalidate', 'true')
    form.append('api_key', env.CLOUDINARY_API_KEY)
    form.append('timestamp', timestamp)
    form.append('signature', signature)

    const res = await fetch(`${apiBase(env)}/raw/upload`, { method: 'POST', body: form })
    const result = await res.json()
    if (!res.ok) {
      return Response.json({ error: result.error?.message ?? 'Save failed' }, { status: 500 })
    }
    return Response.json({ ok: true })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Content GET is public — production website uses this
    if (url.pathname === '/api/content' && request.method === 'GET') {
      try { return await handleContent(request, env) }
      catch (e) { return Response.json({ error: e.message }, { status: 500 }) }
    }

    // All other /api/* require admin auth
    if (url.pathname.startsWith('/api/')) {
      if (!checkAuth(request, env)) return unauthorized()
      try {
        if (url.pathname === '/api/upload'   && request.method === 'POST')   return await handleUpload(request, env)
        if (url.pathname === '/api/list'     && request.method === 'GET')    return await handleList(request, env)
        if (url.pathname === '/api/list-all' && request.method === 'GET')    return await handleListAll(env)
        if (url.pathname === '/api/delete'   && request.method === 'DELETE') return await handleDelete(request, env)
        if (url.pathname === '/api/content'  && request.method === 'PUT')    return await handleContent(request, env)
        return Response.json({ error: 'Not found' }, { status: 404 })
      } catch (e) {
        return Response.json({ error: e.message }, { status: 500 })
      }
    }

    // Static assets + SPA routing
    return env.ASSETS.fetch(request)
  },
}
