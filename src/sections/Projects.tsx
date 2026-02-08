import Badge from '../components/Badge'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import type { ResumeData } from '../types/resume'

type ProjectsProps = {
  data: ResumeData
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <Section id="projects" className="bg-surface/40">
      <SectionHeading
        eyebrow="Projects"
        title="Selected Builds"
        subtitle="Deep backend systems with observability and scale in mind."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {data.projects.map((project) => (
          <article
            key={project.name}
            className="card flex h-full flex-col rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-text">{project.name}</h3>
                {project.duration ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {project.duration}
                  </p>
                ) : null}
              </div>
              <div className="flex gap-3 text-xs text-muted">
                {project.links?.github ? (
                  <a
                    href={project.links.github}
                    className="hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                ) : null}
                {project.links?.live ? (
                  <a
                    href={project.links.live}
                    className="hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live
                  </a>
                ) : null}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} label={tech} />
              ))}
            </div>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
