// Auth middleware — chạy trước tất cả /api/* routes
// Kiểm tra header X-Admin-Pass với env var ADMIN_PASS

export async function onRequest(ctx: any) {
  const pass = ctx.request.headers.get('X-Admin-Pass')
  if (!pass || pass !== ctx.env.ADMIN_PASS) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return ctx.next()
}
