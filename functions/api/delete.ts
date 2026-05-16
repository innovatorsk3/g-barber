// DELETE /api/delete
// Body: { key: string }  — ví dụ: "team/master-minh.jpg"

export async function onRequestDelete(ctx: any) {
  try {
    const { key } = await ctx.request.json() as { key: string }
    if (!key) {
      return Response.json({ error: 'Thiếu key' }, { status: 400 })
    }
    await ctx.env.BUCKET.delete(key)
    return Response.json({ ok: true })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
