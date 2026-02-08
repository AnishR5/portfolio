import { AiService } from './ai.service'
import { ExperianceResponseSchema, ExperienceSchema, SkillsResponseSchema, SkillsSchema } from './schemas'
import { experiencePrompt, skillsPrompt } from './prompts'
import { RawResumeSections } from '../resume.parser'

export async function parseResumeHybrid(
  raw: RawResumeSections,
  ai: AiService,
) {
  const experienceResponse  =ExperianceResponseSchema.parse(
    await ai.extractJSON(experiencePrompt(raw.experience))
  )

  const skillsResponse = SkillsResponseSchema.parse(
  await ai.extractJSON(skillsPrompt(raw.skills))
)
  return {
    basics: parseBasics(raw.basicsText),
    summary: raw.summary,
    experience :experienceResponse.work_experience ,
    skills: skillsResponse.technical_skills,
  }
}

function parseBasics(text: string) {
  return {
    name: text.match(/^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+/)?.[0] ?? 'Unknown',
    email: text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0],
    phone: text.match(/(\+?\d[\d\s-]{7,}\d)/)?.[0],
  }
}
