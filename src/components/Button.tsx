import type { ReactNode } from 'react'

type ButtonProps = {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}

const base =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const variants = {
  primary: 'bg-accent text-white shadow-glow hover:translate-y-[-1px] hover:shadow-soft',
  secondary:
    'border border-border bg-surface text-text hover:border-accent hover:text-accent hover:translate-y-[-1px]',
  ghost: 'text-text hover:text-accent'
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  disabled = false
}: ButtonProps) {
  const className = `${base} ${variants[variant]} ${
    disabled ? 'pointer-events-none opacity-60' : ''
  }`

  if (href) {
    return (
      <a
        className={className}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
