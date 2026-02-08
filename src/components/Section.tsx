import type { ReactNode } from 'react'
import Container from './Container'

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
}

export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-16 opacity-0 animate-fade-up md:py-20 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}
