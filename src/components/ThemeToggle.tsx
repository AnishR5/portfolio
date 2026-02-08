type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent"
      aria-label="Toggle dark mode"
    >
      <span className="h-2 w-2 rounded-full bg-accent" />
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
