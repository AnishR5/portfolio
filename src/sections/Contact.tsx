import Button from '../components/Button'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import type { ResumeData } from '../types/resume'

type ContactProps = {
  data: ResumeData
}

export default function Contact({ data }: ContactProps) {
  const { basics } = data

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Lets Build Something Reliable"
        subtitle="Open to backend-focused roles and impactful engineering challenges."
      />
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <div className="card space-y-6 rounded-2xl p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Email</p>
            <a className="text-base font-medium text-accent" href={`mailto:${basics.email}`}>
              {basics.email}
            </a>
          </div>
          {basics.phone ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Phone</p>
              <p className="text-base text-text">{basics.phone}</p>
            </div>
          ) : null}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Social</p>
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              {basics.social.map((item) =>
                item.url ? (
                  <a
                    key={item.label}
                    href={item.url}
                    className="rounded-full border border-border px-4 py-1.5 text-muted hover:border-accent hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    key={item.label}
                    className="rounded-full border border-border px-4 py-1.5 text-muted opacity-60"
                    aria-disabled
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
        <form
          className="card rounded-2xl p-6"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <div className="grid gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Name
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm text-text outline-none focus:border-accent"
                name="name"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm text-text outline-none focus:border-accent"
                name="email"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Message
              </label>
              <textarea
                className="mt-2 h-28 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm text-text outline-none focus:border-accent"
                name="message"
                placeholder="Tell me about the role or project"
                required
              />
            </div>
            <Button variant="primary">Send Message</Button>
          </div>
        </form>
      </div>
    </Section>
  )
}
