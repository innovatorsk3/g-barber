// GET /api/list-all → { files: R2FileInfo[] }
// Lists every object in the bucket (excluding content/ JSON metadata)

export async function onRequestGet(ctx: any) {
  try {
    const allObjects: any[] = []
    let cursor: string | undefined

    do {
      const listed: any = await ctx.env.BUCKET.list({ limit: 1000, cursor })
      allObjects.push(...listed.objects)
      cursor = listed.truncated ? listed.cursor : undefined
    } while (cursor)

    const files = allObjects
      .filter((obj: any) => !obj.key.endsWith('/'))
      .filter((obj: any) => !obj.key.split('/').pop()?.startsWith('.'))
      .filter((obj: any) => !obj.key.startsWith('content/'))
      .map((obj: any) => ({
        key: obj.key,
        name: obj.key.split('/').pop() ?? obj.key,
        folder: obj.key.includes('/') ? obj.key.split('/').slice(0, -1).join('/') : '',
        size: obj.size,
        uploaded: obj.uploaded,
        url: `/uploads/${obj.key}`,
      }))

    return Response.json({ files })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
