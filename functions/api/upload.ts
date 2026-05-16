// POST /api/upload
// Body: FormData { file: File, folder: string, fileName: string }
// Uploads image to R2 bucket, returns { ok, key, url }

export async function onRequestPost(ctx: any) {
  try {
    const formData = await ctx.request.formData()
    const file: File = formData.get('file')
    const folder: string = formData.get('folder')
    const fileName: string = formData.get('fileName')

    if (!file || !folder || !fileName) {
      return Response.json({ error: 'Thiếu file, folder hoặc fileName' }, { status: 400 })
    }

    // Sanitize: chỉ cho phép image types
    if (!file.type.startsWith('image/')) {
      return Response.json({ error: 'Chỉ chấp nhận file ảnh' }, { status: 400 })
    }

    const key = `${folder}/${fileName}`
    await ctx.env.BUCKET.put(key, file.stream(), {
      httpMetadata: { contentType: file.type },
    })

    return Response.json({
      ok: true,
      key,
      url: `/uploads/${key}`,
    })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
