import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import type { ResumeData } from '../types/resume'

type ExperienceProps = {
  data: ResumeData
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Impactful Engineering Work"
        subtitle="Building scalable systems and performance-driven experiences."
      />
      <div className="space-y-6">
        {data.experience.map((role) => (
          <div key={role.company} className="card rounded-2xl p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-text">{role.role}</h3>
                <p className="text-sm text-muted">
                  {role.company}
                  {role.location ? ` - ${role.location}` : ''}
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {role.duration}
              </span>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {role.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
