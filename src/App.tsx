import { useMemo, useState } from 'react'
import About from './sections/About'
import Contact from './sections/Contact'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import ThemeToggle from './components/ThemeToggle'
import UploadGate from './components/UploadGate'
import ResumeEditor from './components/ResumeEditor'
import useTheme from './hooks/useTheme'
import { defaultResume } from './data/resume'
import type { ResumeData } from './types/resume'
import { normalizeResume } from './utils/resume'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' }
]

export default function App() {
  const { theme, toggle } = useTheme()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [showEditor, setShowEditor] = useState(true)

  const data = useMemo(() => resumeData ?? defaultResume, [resumeData])

  return (
    <div className="min-h-screen bg-bg text-text page-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 mesh-layer" />
      {!resumeData ? (
        <UploadGate
          onParsed={(parsed) => setResumeData(normalizeResume(parsed))}
          onUseSample={() => setResumeData(defaultResume)}
          theme={theme}
          onToggleTheme={toggle}
        />
      ) : (
        <>
          <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur">
            <div className="mx-auto w-full max-w-6xl px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                    {data.basics.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{data.basics.name}</p>
                    <p className="text-xs text-muted">{data.basics.title}</p>
                  </div>
                </div>
                <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
                  {navItems.map((item) => (
                    <a key={item.href} href={item.href} className="hover:text-accent">
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEditor((prev) => !prev)}
                    className="hidden rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent md:inline-flex"
                  >
                    {showEditor ? 'Hide Editor' : 'Edit Resume'}
                  </button>
                  <ThemeToggle theme={theme} onToggle={toggle} />
                </div>
              </div>
              <nav className="mt-3 flex gap-3 overflow-x-auto text-xs text-muted md:hidden">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 hover:border-accent hover:text-accent"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <main>
            {showEditor ? (
              <ResumeEditor
                data={data}
                onChange={(updated) => setResumeData(updated)}
                onClose={() => setShowEditor(false)}
              />
            ) : null}
            <Hero data={data} />
            <About data={data} />
            <Skills data={data} />
            <Experience data={data} />
            <Projects data={data} />
            <Education data={data} />
            <Contact data={data} />
          </main>

          <footer className="border-t border-border py-8">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-xs text-muted">
              <p>
                (c) {new Date().getFullYear()} {data.basics.name}. All rights reserved.
              </p>
              <p>Built with React, TypeScript, and Tailwind CSS.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
