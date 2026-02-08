import Button from '../components/Button'
import type { ResumeData } from '../types/resume'

type HeroProps = {
  data: ResumeData
}

export default function Hero({ data }: HeroProps) {
  const { basics, highlights } = data
  const hasResume = Boolean(basics.resumeUrl)

  return (
    <section className="relative overflow-hidden pb-16 pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_60%)]" />
      <div className="absolute right-[-120px] top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(14,116,144,0.35),_transparent_70%)] blur-3xl" />
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Portfolio</p>
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-semibold text-text md:text-5xl">
                {basics.name}
              </h1>
              <p className="text-lg font-medium text-accent">{basics.title}</p>
              <p className="text-sm text-muted">{basics.location}</p>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-muted">{basics.summary}</p>
            <div className="flex flex-wrap gap-3">
              {hasResume ? (
                <Button href={basics.resumeUrl} variant="secondary">
                  Download Resume
                </Button>
              ) : (
                <Button variant="secondary" disabled>
                  Download Resume
                </Button>
              )}
              <Button href="#contact">Contact</Button>
            </div>
          </div>
          {highlights.length ? (
            <div className="card soft-ring floaty rounded-3xl bg-surface/80 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                Career Highlights
              </p>
              <ul className="mt-4 space-y-4 text-sm text-text">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span className="text-muted">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
