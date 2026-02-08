import type { ResumeData } from '../types/resume'

const categoryMap: { name: string; keywords: string[] }[] = [
  { name: 'Frontend', keywords: ['React', 'Next', 'Redux', 'AG Grid', 'Tailwind', 'HTML', 'CSS'] },
  { name: 'Backend', keywords: ['Node', 'Nest', 'Java', 'GraphQL', 'REST', 'API', '.NET Framework', 'C++', 'C#', 'Typescript'] },
  { name: 'Databases & Search', keywords: ['MySQL', 'PostgreSQL', 'OpenSearch', 'Mongo', 'Redis', 'SQL'] },
  { name: 'Tools & Process', keywords: ['Git', 'Jira', 'SDLC', 'Agile', 'CI', 'Scrum', 'Bash'] }
]

export function buildSkillCategories(skills: string[]) {
  const categories = categoryMap.map((category) => ({
    name: category.name,
    items: skills.filter((skill) =>
      category.keywords.some((keyword) => skill.toLowerCase().includes(keyword.toLowerCase()))
    )
  }))
  const categorized = new Set(categories.flatMap((category) => category.items))
  const otherSkills = skills.filter((skill) => !categorized.has(skill))
  if (otherSkills.length) {
    categories.push({ name: 'Other', items: otherSkills })
  }
  return categories.filter((category) => category.items.length)
}

export function normalizeResume(data: Partial<ResumeData>): ResumeData {
  return {
    basics: {
      name: data.basics?.name ?? 'Your Name',
      title: data.basics?.title ?? 'Your Role',
      location: data.basics?.location ?? '',
      email: data.basics?.email ?? '',
      phone: data.basics?.phone,
      summary: data.basics?.summary ?? '',
      resumeUrl: data.basics?.resumeUrl,
      social: data.basics?.social ?? [
        { label: 'LinkedIn', url: undefined },
        { label: 'GitHub', url: undefined }
      ]
    },
    highlights: data.highlights ?? [],
    skills: data.skills ?? [],
    experience: data.experience ?? [],
    projects: data.projects ?? [],
    education: data.education ?? [],
    certifications: data.certifications ?? []
  }
}

export function listToText(values: string[]) {
  return values.join('\n')
}

export function textToList(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}
