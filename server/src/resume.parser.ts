import type { Buffer } from 'node:buffer'
import * as mammoth from 'mammoth'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

export type RawResumeSections = {
  basicsText: string
  summary: string
  skills: string
  experience: string
  projects: string
  education: string
  certifications: string
}


export type SocialLink = { label: string; url?: string }
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
  links?: { github?: string; live?: string }
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
    title?: string
    location?: string
    email?: string
    phone?: string
    summary?: string
    social: SocialLink[]
  }
  highlights: string[]
  skills: string[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: EducationItem[]
  certifications: string[]
}

const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
const phoneRegex = /(\+?\d[\d\s-]{7,}\d)/i
const dateRangeRegex =
  /((\d{2}\/\d{4})|(\d{4}))\s*[–-]\s*(present|current|(\d{2}\/\d{4})|(\d{4}))/i

const sectionMap: Record<string, keyof ParsedSections> = {
  PROFILE: 'summary',
  SUMMARY: 'summary',
  ABOUT: 'summary',
  'TECHNICAL SKILLS': 'skills',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  'PROFESSIONAL EXPERIENCE': 'experience',
  'WORK EXPERIENCE': 'experience',
  PROJECTS: 'projects',
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  CERTIFICATES: 'certifications',
}

type ParsedSections = {
  summary: string[]
  skills: string[]
  experience: string[]
  projects: string[]
  education: string[]
  certifications: string[]
}

export async function parseResumeFromBuffer(buffer: Buffer, mimetype: string) {
  const text =
    mimetype === 'application/pdf'
      ? await parsePdf(buffer)
      : await parseDocx(buffer)

  return parseResumeText(text)
}

async function parsePdf(buffer: Buffer) {
  const loadingTask = getDocument({
  data:  new Uint8Array(buffer),
})
  const pdf = await loadingTask.promise
  const pageTexts: string[] = []
  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const strings = content.items.map((item: any) => item.str ?? '')
    pageTexts.push(strings.join(' '))
  }
  return pageTexts.join('\n')
}

async function parseDocx(buffer: Buffer) {
  const result = await mammoth.extractRawText({ buffer })
  return result.value ?? ''
}

function parseResumeText(text: string): RawResumeSections {
  const normalized = injectSectionBreaks(
    text
      .replace(/\r/g, '')
      .replace(/[•·●]/g, '-')
      .replace(/\t/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/\n{2,}/g, '\n')
      .trim(),
  )

  const lines = normalized
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const sections: ParsedSections = {
    summary: [],
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: [],
  }

  let current: keyof ParsedSections | null = null
  const headerLines: string[] = []

  for (const line of lines) {
    const detected = detectSection(line)

    if (detected) {
      current = detected
      const cleaned = line.replace(/^[A-Za-z\s]+/i, '').trim()
      if (cleaned) sections[current].push(cleaned)
      continue
    }

    if (!current) headerLines.push(line)
    else sections[current].push(line)
  }

  return {
    basicsText: headerLines.join(' '),
    summary: sections.summary.join('\n'),
    skills: sections.skills.join('\n'),
    experience: sections.experience.join('\n'),
    projects: sections.projects.join('\n'),
    education: sections.education.join('\n'),
    certifications: sections.certifications.join('\n'),
  }
}


function parseSummary(lines: string[]) {
  if (!lines.length) return undefined
  const sentence = lines.join(' ')
  return sentence
}

function parseHighlights(summaryLines: string[], experienceLines: string[]) {
  const highlights = summaryLines.filter((line) => line.startsWith('-'))
  if (highlights.length) {
    return highlights.map((line) => line.replace(/^-+\s*/, ''))
  }

  const expHighlights = experienceLines
    .filter((line) => line.startsWith('-'))
    .slice(0, 4)
    .map((line) => line.replace(/^-+\s*/, ''))

  return expHighlights
}

function parseSkills(lines: string[]) {
  if (!lines.length) return []
  const joined = lines.join(' ')
  return joined
    .split(/[,|•]/)
    .map((skill) => skill.replace(/^-+\s*/, '').trim())
    .filter(Boolean)
}

function parseExperience(lines: string[]): ExperienceItem[] {
  const items: ExperienceItem[] = []
  let current: ExperienceItem | null = null
  let lastLine: string | null = null

  for (const line of lines) {
    if (dateRangeRegex.test(line)) {
      if (current && (current.role || current.company || current.highlights.length)) {
        items.push(current)
      }
      const [duration, location] = line.split('|').map((part) => part.trim())
      current = {
        company: '',
        role: lastLine ?? '',
        duration: duration.trim(),
        location: location || undefined,
        highlights: [],
      }
      continue
    }

    if (!current) {
      current = { company: '', role: '', duration: '', highlights: [] }
    }

    if (line.startsWith('-')) {
      current.highlights.push(line.replace(/^-+\s*/, ''))
    } else if (!current.role) {
      current.role = line
    } else if (!current.company) {
      current.company = line
    } else {
      current.highlights.push(line)
    }

    lastLine = line
  }

  if (current && (current.role || current.company || current.highlights.length)) {
    items.push(current)
  }

  return items
}

function parseProjects(lines: string[]): ProjectItem[] {
  const items: ProjectItem[] = []
  let current: ProjectItem | null = null

  for (const line of lines) {
    const dateMatch = line.match(dateRangeRegex)
    if (dateMatch) {
      if (current) items.push(current)
      const [namePart, duration] = splitByDate(line)
      current = {
        name: namePart || 'Project',
        duration,
        description: '',
        techStack: [],
        highlights: [],
        links: {},
      }
      continue
    }

    if (!current) {
      current = {
        name: line,
        description: '',
        techStack: [],
        highlights: [],
      }
      continue
    }

    if (line.startsWith('-')) {
      current.highlights.push(line.replace(/^-+\s*/, ''))
    } else if (!current.description) {
      current.description = line
    } else {
      current.highlights.push(line)
    }
  }

  if (current) items.push(current)
  return items
}

function parseEducation(lines: string[]): EducationItem[] {
  const items: EducationItem[] = []
  let current: EducationItem | null = null

  for (const line of lines) {
    if (dateRangeRegex.test(line)) {
      if (current) items.push(current)
      const [duration, location] = line.split('|').map((part) => part.trim())
      current = {
        degree: '',
        institution: '',
        duration,
        location: location || undefined,
        details: [],
      }
      continue
    }

    if (!current) {
      current = {
        degree: '',
        institution: '',
        duration: '',
        details: [],
      }
    }

    if (!current.degree) {
      current.degree = line
    } else if (!current.institution) {
      current.institution = line
    } else {
      current.details?.push(line.replace(/^-+\s*/, ''))
    }
  }

  if (current) items.push(current)
  return items
}

function splitByDate(line: string): [string, string | undefined] {
  const match = line.match(dateRangeRegex)
  if (!match || match.index === undefined) return [line, undefined]
  const name = line.slice(0, match.index).trim()
  return [name, match[0]]
}

function findUrl(text: string, domain: string) {
  const regex = new RegExp(`https?://[^\\s]*${domain}[^\\s]*`, 'i')
  return text.match(regex)?.[0]
}

function findLocation(lines: string[]) {
  const locationLine = lines.find((line) => /,/.test(line) && !emailRegex.test(line))
  return locationLine
}


function detectSection(line: string): keyof ParsedSections | null {
  const u = line.toUpperCase()
  if (u.includes('EXPERIENCE')) return 'experience'
  if (u.includes('PROJECT')) return 'projects'
  if (u.includes('SKILL')) return 'skills'
  if (u.includes('EDUCATION')) return 'education'
  if (u.includes('CERTIFICATION')) return 'certifications'
  if (u.includes('SUMMARY') || u.includes('PROFILE')) return 'summary'
  return null
}

function injectSectionBreaks(text: string) {
  const keys = [
    'SUMMARY',
    'EXPERIENCE',
    'PROJECTS',
    'SKILLS',
    'EDUCATION',
    'CERTIFICATIONS',
  ]

  let out = text
  for (const k of keys) {
    out = out.replace(new RegExp(`\\s(${k})\\s`, 'gi'), `\n$1\n`)
  }
  return out
}
