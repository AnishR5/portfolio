import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import type { ResumeData } from '../types/resume'

type EducationProps = {
  data: ResumeData
}

export default function Education({ data }: EducationProps) {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Education"
        title="Academic Foundation"
        subtitle="Formal training across software and engineering fundamentals."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {data.education.map((item) => (
          <div key={item.degree} className="card rounded-2xl p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-text">{item.degree}</h3>
                <p className="text-sm text-muted">
                  {item.institution}
                  {item.location ? ` - ${item.location}` : ''}
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {item.duration}
              </span>
            </div>
            {item.details?.length ? (
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {item.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  )
}
