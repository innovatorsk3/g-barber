// GET /api/content?key=content/featured.json → { data: object | null }
// PUT /api/content body: { key: string, data: object } → { ok: true }

export async function onRequestGet(ctx: any) {
  const key = new URL(ctx.request.url).searchParams.get('key')
  if (!key) return Response.json({ error: 'Thiếu key' }, { status: 400 })

  try {
    const obj = await ctx.env.BUCKET.get(key)
    if (!obj) return Response.json({ data: null })
    const text = await obj.text()
    return Response.json({ data: JSON.parse(text) })
  } catch {
    return Response.json({ data: null })
  }
}

export async function onRequestPut(ctx: any) {
  try {
    const { key, data } = await ctx.request.json()
    if (!key || data === undefined) {
      return Response.json({ error: 'Thiếu key hoặc data' }, { status: 400 })
    }
    await ctx.env.BUCKET.put(key, JSON.stringify(data), {
      httpMetadata: { contentType: 'application/json' },
    })
    return Response.json({ ok: true })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
