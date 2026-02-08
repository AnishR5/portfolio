type BadgeProps = {
  label: string
}

export default function Badge({ label }: BadgeProps) {
  return (
    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
      {label}
    </span>
  )
}
