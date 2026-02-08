import { z } from 'zod'

export const ExperienceSchema = z.array(
  z.object({
    company: z.string(),
    role: z.string(),
    duration: z.string(),
    location: z.string(),
    highlights: z.array(z.string()),
  }),
)

export const SkillsSchema = z.array(z.string())


export const SkillsResponseSchema = z.object({
  technical_skills: z.array(z.string())
})

export const ExperianceResponseSchema = z.object({
  work_experience: ExperienceSchema
})