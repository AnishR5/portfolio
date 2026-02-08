export type SocialLinks = {
  label: string
  url?: string
}

export type ExperienceItem = {
  company: string
  role: string
  location?: string
  duration: string
  highlights: string[]
}

export type ProjectItem = {
  name: string
  duration?: string
  description: string
  techStack: string[]
  highlights: string[]
  links?: {
    github?: string
    live?: string
  }
}

export type EducationItem = {
  degree: string
  institution: string
  duration: string
  location?: string
  details?: string[]
}

export type ResumeData = {
  basics: {
    name: string
    title: string
    location: string
    email: string
    phone?: string
    summary: string
    resumeUrl?: string
    social: SocialLinks[]
  }
  highlights: string[]
  skills: string[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: EducationItem[]
  certifications: string[]
}
