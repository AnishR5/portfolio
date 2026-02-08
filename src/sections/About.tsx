import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import type { ResumeData } from '../types/resume'

type AboutProps = {
  data: ResumeData
}

export default function About({ data }: AboutProps) {
  const { basics, certifications } = data

  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="Professional Summary"
        subtitle="Backend-first engineering with full-stack execution."
      />
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 text-base text-muted">
          <p>{basics.summary}</p>
        </div>
        {certifications.length ? (
          <div className="card rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Certifications
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {certifications.map((cert) => (
                <li key={cert} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  )
}
