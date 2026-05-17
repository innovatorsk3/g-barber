// @ts-nocheck
// Cloudflare Worker — R2 storage backend
//
// Bindings (Cloudflare Workers → Settings → Bindings):
//   R2 Bucket: BUCKET → g-barber-media
//
// Secrets (wrangler secret put ADMIN_PASS):
//   ADMIN_PASS = your-admin-password

// ─── Auth ────────────────────────────────────────────────────────────────────

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

function checkAuth(request, env) {
  const pass = request.headers.get('X-Admin-Pass')
  return !!pass && pass === env.ADMIN_PASS
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

  const key = `${folder}/${fileName}`

  await env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
    customMetadata: { uploaded: new Date().toISOString() },
  })

  return Response.json({ ok: true, url: `/cdn/${key}` })
}

// ─── GET /api/list?folder=xxx ─────────────────────────────────────────────────

async function handleList(request, env) {
  const url = new URL(request.url)
  const folder = url.searchParams.get('folder') ?? ''

  const listed = await env.BUCKET.list({ prefix: folder ? `${folder}/` : undefined })

  const files = listed.objects.map(obj => ({
    key: obj.key,
    name: obj.key.split('/').pop(),
    size: obj.size,
    uploaded: obj.uploaded?.toISOString?.() ?? '',
    url: `/cdn/${obj.key}`,
  }))

  return Response.json({ files })
}

// ─── GET /api/list-all ────────────────────────────────────────────────────────

async function handleListAll(env) {
  const all = []
  let cursor

  do {
    const listed = await env.BUCKET.list(cursor ? { cursor } : {})
    all.push(...listed.objects)
    cursor = listed.truncated ? listed.cursor : undefined
  } while (cursor)

  const files = all.map(obj => ({
    key: obj.key,
    name: obj.key.split('/').pop(),
    folder: obj.key.includes('/') ? obj.key.split('/').slice(0, -1).join('/') : '',
    size: obj.size,
    uploaded: obj.uploaded?.toISOString?.() ?? '',
    url: `/cdn/${obj.key}`,
  }))

  return Response.json({ files })
}

// ─── DELETE /api/delete ───────────────────────────────────────────────────────

async function handleDelete(request, env) {
  const { key } = await request.json()
  if (!key) return Response.json({ error: 'key required' }, { status: 400 })

  await env.BUCKET.delete(key)
  return Response.json({ ok: true })
}

// ─── /api/content ─────────────────────────────────────────────────────────────

async function handleContent(request, env) {
  if (request.method === 'GET') {
    const url = new URL(request.url)
    const key = url.searchParams.get('key')
    if (!key) return Response.json({ data: null })

    const obj = await env.BUCKET.get(key)
    if (!obj) return Response.json({ data: null })

    try {
      const data = await obj.json()
      return Response.json({ data })
    } catch {
      return Response.json({ data: null })
    }
  }

  if (request.method === 'PUT') {
    const { key, data } = await request.json()
    if (!key) return Response.json({ error: 'key required' }, { status: 400 })

    await env.BUCKET.put(key, JSON.stringify(data), {
      httpMetadata: { contentType: 'application/json' },
    })
    return Response.json({ ok: true })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

// ─── GET /cdn/* — Serve R2 objects publicly ───────────────────────────────────

async function handleCdn(request, env) {
  const url = new URL(request.url)
  const key = url.pathname.slice('/cdn/'.length)
  if (!key) return new Response('Not Found', { status: 404 })

  const obj = await env.BUCKET.get(key)
  if (!obj) return new Response('Not Found', { status: 404 })

  const headers = new Headers()
  obj.writeHttpMetadata(headers)
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  headers.set('etag', obj.httpEtag)

  return new Response(obj.body, { headers })
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Public: serve R2 objects via /cdn/*
    if (url.pathname.startsWith('/cdn/')) {
      try { return await handleCdn(request, env) }
      catch (e) { return new Response('Error', { status: 500 }) }
    }

    // Public: GET /api/content (production website reads content JSON)
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
