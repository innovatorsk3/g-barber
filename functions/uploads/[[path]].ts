// GET /uploads/* — serve ảnh từ R2 bucket (public, không cần auth)
// Ví dụ: /uploads/team/master-minh.jpg

export async function onRequest(ctx: any) {
  const pathParts = ctx.params.path as string[]
  const key = Array.isArray(pathParts) ? pathParts.join('/') : pathParts

  const object = await ctx.env.BUCKET.get(key)
  if (!object) {
    return new Response('Not Found', { status: 404 })
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  headers.set('ETag', object.httpEtag)

  // Handle conditional requests (browser cache)
  const ifNoneMatch = ctx.request.headers.get('If-None-Match')
  if (ifNoneMatch === object.httpEtag) {
    return new Response(null, { status: 304, headers })
  }

  return new Response(object.body, { headers })
}
