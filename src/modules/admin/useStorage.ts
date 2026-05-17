import { useState, useCallback } from 'react'

export interface MediaFile {
  key: string
  name: string
  size: number
  uploaded: string
  url: string
}

export function useStorage() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const listFolder = useCallback(async (folder: string): Promise<MediaFile[]> => {
    try {
      const res = await fetch(`/api/list?folder=${encodeURIComponent(folder)}`)
      if (!res.ok) return []
      const { files } = await res.json()
      return files ?? []
    } catch {
      return []
    }
  }, [])

  const uploadFile = useCallback(async (
    folder: string,
    fileName: string,
    file: File,
  ): Promise<{ ok: boolean; url?: string; error?: string }> => {
    setBusy(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('folder', folder)
      form.append('fileName', fileName)

      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload thất bại')
      return { ok: true, url: data.url }
    } catch (e: any) {
      setError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setBusy(false)
    }
  }, [])

  const deleteFile = useCallback(async (
    key: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      if (!res.ok) throw new Error('Xóa thất bại')
      return { ok: true }
    } catch (e: any) {
      setError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setBusy(false)
    }
  }, [])

  const readContent = useCallback(async (key: string): Promise<any | null> => {
    try {
      const res = await fetch(`/api/content?key=${encodeURIComponent(key)}`)
      if (!res.ok) return null
      const { data } = await res.json()
      return data
    } catch {
      return null
    }
  }, [])

  const saveContent = useCallback(async (key: string, data: any): Promise<{ ok: boolean; error?: string }> => {
    setBusy(true)
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data }),
      })
      if (!res.ok) throw new Error('Lưu thất bại')
      return { ok: true }
    } catch (e: any) {
      return { ok: false, error: e.message }
    } finally {
      setBusy(false)
    }
  }, [])

  return { listFolder, uploadFile, deleteFile, readContent, saveContent, busy, error }
}
