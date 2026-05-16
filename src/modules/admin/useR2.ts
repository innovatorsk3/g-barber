import { useState, useCallback } from 'react'

export interface R2File {
  key: string
  name: string
  size: number
  uploaded: string
  url: string
}

export function useR2(adminPass: string) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const headers = { 'X-Admin-Pass': adminPass }

  const listFolder = useCallback(async (folder: string): Promise<R2File[]> => {
    try {
      const res = await fetch(`/api/list?folder=${encodeURIComponent(folder)}`, { headers })
      if (!res.ok) return []
      const { files } = await res.json()
      return files ?? []
    } catch {
      return []
    }
  }, [adminPass])

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

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers, // no Content-Type — browser sets multipart boundary
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload thất bại')
      return { ok: true, url: data.url }
    } catch (e: any) {
      setError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setBusy(false)
    }
  }, [adminPass])

  const deleteFile = useCallback(async (
    key: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { ...headers, 'Content-Type': 'application/json' },
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
  }, [adminPass])

  const readContent = useCallback(async (key: string): Promise<any | null> => {
    try {
      const res = await fetch(`/api/content?key=${encodeURIComponent(key)}`, { headers })
      if (!res.ok) return null
      const { data } = await res.json()
      return data
    } catch {
      return null
    }
  }, [adminPass])

  const saveContent = useCallback(async (key: string, data: any): Promise<{ ok: boolean; error?: string }> => {
    setBusy(true)
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data }),
      })
      if (!res.ok) throw new Error('Lưu thất bại')
      return { ok: true }
    } catch (e: any) {
      return { ok: false, error: e.message }
    } finally {
      setBusy(false)
    }
  }, [adminPass])

  // Test auth — dùng khi login
  const testAuth = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/list?folder=team', { headers })
      return res.status !== 401
    } catch {
      return false
    }
  }, [adminPass])

  return { listFolder, uploadFile, deleteFile, readContent, saveContent, testAuth, busy, error }
}
