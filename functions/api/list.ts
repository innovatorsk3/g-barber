// GET /api/list?folder=team
// Trả về danh sách file trong folder từ R2

export async function onRequestGet(ctx: any) {
  const folder = new URL(ctx.request.url).searchParams.get('folder')
  if (!folder) {
    return Response.json({ error: 'Thiếu tham số folder' }, { status: 400 })
  }

  const listed = await ctx.env.BUCKET.list({ prefix: `${folder}/` })

  const files = listed.objects
    .filter((obj: any) => !obj.key.endsWith('/') && !obj.key.split('/').pop()?.startsWith('.'))
    .map((obj: any) => ({
      key: obj.key,
      name: obj.key.split('/').pop(),
      size: obj.size,
      uploaded: obj.uploaded,
      url: `/uploads/${obj.key}`,
    }))

  return Response.json({ files })
}
