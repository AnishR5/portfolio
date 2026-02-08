type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-text md:text-4xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-base text-muted">{subtitle}</p> : null}
    </div>
  )
}
