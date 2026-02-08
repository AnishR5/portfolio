import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

type UploadGateProps = {
  onParsed: (data: any) => void
  onUseSample: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function UploadGate({
  onParsed,
  onUseSample,
  theme,
  onToggleTheme
}: UploadGateProps) {
  const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      setError('Please upload a PDF or DOCX file.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${apiBase}/parse`, {
        method: 'POST',
        body: formData
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload?.message ?? 'Upload failed.')
      }
      onParsed(payload.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Portfolio Builder
          </p>
          <h1 className="font-display text-2xl font-semibold text-text">Instant Resume Portfolio</h1>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 pb-20">
        <div className="card rounded-3xl p-8 md:p-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Upload Resume
            </p>
            <h2 className="font-display text-3xl font-semibold text-text md:text-4xl">
              Turn your resume into a modern portfolio in minutes.
            </h2>
            <p className="text-sm text-muted">
              Upload a PDF or DOCX file. We'll parse your resume, auto-fill the portfolio,
              and let you edit everything before publishing.
            </p>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-10 text-center text-sm text-muted">
              <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
              <span className="text-base font-semibold text-text">
                {file ? file.name : 'Drop your resume or click to browse'}
              </span>
              <span className="mt-2 text-xs">Supported: PDF, DOCX - Max 6MB</span>
            </label>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:translate-y-[-1px] disabled:opacity-60"
              >
                {loading ? 'Parsing Resume...' : 'Generate Portfolio'}
              </button>
              <button
                type="button"
                onClick={onUseSample}
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent"
              >
                Use Sample Data
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
