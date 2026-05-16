import { useState, useCallback } from 'react'

export interface GHConfig {
  token: string
  owner: string
  repo: string
  branch: string
}

export interface GHFile {
  name: string
  path: string
  sha: string
  size: number
  download_url: string
}

export function rawUrl(config: GHConfig, path: string) {
  return `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${path}`
}

export function useGitHub(config: GHConfig | null) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const makeHeaders = () => ({
    Authorization: `token ${config!.token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  })

  const endpoint = (path: string) =>
    `https://api.github.com/repos/${config?.owner}/${config?.repo}/contents/${path}`

  const listFolder = useCallback(async (folder: string): Promise<GHFile[]> => {
    if (!config) return []
    try {
      const res = await fetch(`${endpoint(folder)}?ref=${config.branch}`, { headers: makeHeaders() })
      if (!res.ok) return []
      const data: any[] = await res.json()
      return data.filter(f => f.type === 'file' && !f.name.startsWith('.'))
    } catch {
      return []
    }
  }, [config])

  const uploadFile = useCallback(async (
    folder: string,
    fileName: string,
    base64: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    if (!config) return { ok: false, error: 'Chưa cấu hình GitHub' }
    setBusy(true)
    setError(null)
    try {
      let sha: string | undefined
      const checkRes = await fetch(`${endpoint(`${folder}/${fileName}`)}?ref=${config.branch}`, { headers: makeHeaders() })
      if (checkRes.ok) sha = (await checkRes.json()).sha

      const body: Record<string, unknown> = {
        message: `admin: upload ${fileName} → ${folder}`,
        content: base64,
        branch: config.branch,
      }
      if (sha) body.sha = sha

      const res = await fetch(endpoint(`${folder}/${fileName}`), {
        method: 'PUT',
        headers: makeHeaders(),
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const e = await res.json()
        throw new Error(e.message || 'Upload thất bại')
      }
      return { ok: true }
    } catch (e: any) {
      setError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setBusy(false)
    }
  }, [config])

  const deleteFile = useCallback(async (
    filePath: string,
    sha: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    if (!config) return { ok: false, error: 'Chưa cấu hình GitHub' }
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(endpoint(filePath), {
        method: 'DELETE',
        headers: makeHeaders(),
        body: JSON.stringify({
          message: `admin: delete ${filePath}`,
          sha,
          branch: config.branch,
        }),
      })
      if (!res.ok) throw new Error('Xóa thất bại')
      return { ok: true }
    } catch (e: any) {
      setError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setBusy(false)
    }
  }, [config])

  return { listFolder, uploadFile, deleteFile, busy, error }
}
