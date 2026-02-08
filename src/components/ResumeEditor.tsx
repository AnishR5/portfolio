import type { ReactNode } from 'react'
import type { ResumeData, ExperienceItem, ProjectItem, EducationItem } from '../types/resume'
import { listToText, textToList } from '../utils/resume'

type ResumeEditorProps = {
  data: ResumeData
  onChange: (data: ResumeData) => void
  onClose: () => void
}

export default function ResumeEditor({ data, onChange, onClose }: ResumeEditorProps) {
  const updateBasics = (field: keyof ResumeData['basics'], value: string) => {
    onChange({
      ...data,
      basics: {
        ...data.basics,
        [field]: value
      }
    })
  }

  const updateList = (key: keyof Pick<ResumeData, 'highlights' | 'skills' | 'certifications'>, value: string) => {
    onChange({ ...data, [key]: textToList(value) })
  }

  const updateExperience = (index: number, value: Partial<ExperienceItem>) => {
    const updated = data.experience.map((item, idx) =>
      idx === index ? { ...item, ...value } : item
    )
    onChange({ ...data, experience: updated })
  }

  const updateProjects = (index: number, value: Partial<ProjectItem>) => {
    const updated = data.projects.map((item, idx) => (idx === index ? { ...item, ...value } : item))
    onChange({ ...data, projects: updated })
  }

  const updateEducation = (index: number, value: Partial<EducationItem>) => {
    const updated = data.education.map((item, idx) =>
      idx === index ? { ...item, ...value } : item
    )
    onChange({ ...data, education: updated })
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="card rounded-3xl p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Resume Editor
            </p>
            <h2 className="font-display text-2xl font-semibold text-text">Review & refine</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent"
          >
            Close Editor
          </button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Input label="Full name" value={data.basics.name} onChange={(v) => updateBasics('name', v)} />
            <Input label="Title" value={data.basics.title} onChange={(v) => updateBasics('title', v)} />
            <Input label="Location" value={data.basics.location} onChange={(v) => updateBasics('location', v)} />
            <Input label="Email" value={data.basics.email} onChange={(v) => updateBasics('email', v)} />
            <Input label="Phone" value={data.basics.phone ?? ''} onChange={(v) => updateBasics('phone', v)} />
          </div>
          <div className="space-y-4">
            <Textarea
              label="Professional summary"
              value={data.basics.summary}
              onChange={(v) => updateBasics('summary', v)}
            />
            <Textarea
              label="Highlights (one per line)"
              value={listToText(data.highlights)}
              onChange={(v) => updateList('highlights', v)}
            />
            <Textarea
              label="Skills (comma or line separated)"
              value={data.skills.join(', ')}
              onChange={(v) =>
                onChange({
                  ...data,
                  skills: v
                    .split(/[,\n]/)
                    .map((skill) => skill.trim())
                    .filter(Boolean)
                })
              }
            />
          </div>
        </div>

        <Section title="Experience">
          {data.experience.map((item, index) => (
            <div key={`${item.company}-${index}`} className="rounded-2xl border border-border p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Input label="Role" value={item.role} onChange={(v) => updateExperience(index, { role: v })} />
                <Input
                  label="Company"
                  value={item.company}
                  onChange={(v) => updateExperience(index, { company: v })}
                />
                <Input
                  label="Location"
                  value={item.location ?? ''}
                  onChange={(v) => updateExperience(index, { location: v })}
                />
                <Input
                  label="Duration"
                  value={item.duration}
                  onChange={(v) => updateExperience(index, { duration: v })}
                />
              </div>
              <Textarea
                label="Highlights (one per line)"
                value={listToText(item.highlights)}
                onChange={(v) => updateExperience(index, { highlights: textToList(v) })}
              />
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    experience: data.experience.filter((_, idx) => idx !== index)
                  })
                }
                className="mt-3 text-xs font-semibold text-red-400 hover:text-red-300"
              >
                Remove role
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                experience: [
                  ...data.experience,
                  { company: '', role: '', duration: '', highlights: [] }
                ]
              })
            }
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent"
          >
            Add experience
          </button>
        </Section>

        <Section title="Projects">
          {data.projects.map((item, index) => (
            <div key={`${item.name}-${index}`} className="rounded-2xl border border-border p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Input label="Project name" value={item.name} onChange={(v) => updateProjects(index, { name: v })} />
                <Input
                  label="Duration"
                  value={item.duration ?? ''}
                  onChange={(v) => updateProjects(index, { duration: v })}
                />
              </div>
              <Textarea
                label="Description"
                value={item.description}
                onChange={(v) => updateProjects(index, { description: v })}
              />
              <Input
                label="Tech stack (comma separated)"
                value={item.techStack.join(', ')}
                onChange={(v) =>
                  updateProjects(index, {
                    techStack: v
                      .split(',')
                      .map((tech) => tech.trim())
                      .filter(Boolean)
                  })
                }
              />
              <Textarea
                label="Highlights (one per line)"
                value={listToText(item.highlights)}
                onChange={(v) => updateProjects(index, { highlights: textToList(v) })}
              />
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    projects: data.projects.filter((_, idx) => idx !== index)
                  })
                }
                className="mt-3 text-xs font-semibold text-red-400 hover:text-red-300"
              >
                Remove project
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                projects: [
                  ...data.projects,
                  { name: '', description: '', techStack: [], highlights: [] }
                ]
              })
            }
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent"
          >
            Add project
          </button>
        </Section>

        <Section title="Education">
          {data.education.map((item, index) => (
            <div key={`${item.degree}-${index}`} className="rounded-2xl border border-border p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Degree"
                  value={item.degree}
                  onChange={(v) => updateEducation(index, { degree: v })}
                />
                <Input
                  label="Institution"
                  value={item.institution}
                  onChange={(v) => updateEducation(index, { institution: v })}
                />
                <Input
                  label="Duration"
                  value={item.duration}
                  onChange={(v) => updateEducation(index, { duration: v })}
                />
                <Input
                  label="Location"
                  value={item.location ?? ''}
                  onChange={(v) => updateEducation(index, { location: v })}
                />
              </div>
              <Textarea
                label="Details (one per line)"
                value={listToText(item.details ?? [])}
                onChange={(v) => updateEducation(index, { details: textToList(v) })}
              />
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    education: data.education.filter((_, idx) => idx !== index)
                  })
                }
                className="mt-3 text-xs font-semibold text-red-400 hover:text-red-300"
              >
                Remove education
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                education: [
                  ...data.education,
                  { degree: '', institution: '', duration: '', details: [] }
                ]
              })
            }
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent"
          >
            Add education
          </button>
        </Section>

        <Section title="Certifications">
          <Textarea
            label="Certifications (one per line)"
            value={listToText(data.certifications)}
            onChange={(v) => updateList('certifications', v)}
          />
        </Section>
      </div>
    </section>
  )
}

type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

function Input({ label, value, onChange }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
      {label}
      <input
        className="rounded-xl border border-border bg-transparent px-4 py-2 text-sm font-normal text-text outline-none focus:border-accent"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function Textarea({ label, value, onChange }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
      {label}
      <textarea
        className="min-h-[120px] rounded-xl border border-border bg-transparent px-4 py-2 text-sm font-normal text-text outline-none focus:border-accent"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

type SectionProps = {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </div>
  )
}
