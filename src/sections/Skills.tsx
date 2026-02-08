import Badge from '../components/Badge'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import type { ResumeData } from '../types/resume'
import { buildSkillCategories } from '../utils/resume'

type SkillsProps = {
  data: ResumeData
}

export default function Skills({ data }: SkillsProps) {
  const skillCategories = buildSkillCategories(data.skills)

  return (
    <Section id="skills" className="bg-surface/40">
      <SectionHeading
        eyebrow="Skills"
        title="Technical Toolkit"
        subtitle="Balanced across frontend, backend, data, and delivery."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <div key={category.name} className="card rounded-2xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              {category.name}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <Badge key={skill} label={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
