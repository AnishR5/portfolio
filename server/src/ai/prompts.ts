export const experiencePrompt = (text: string) => `
Normalize the WORK EXPERIENCE into JSON.

Schema:
[
  {
    "company": "",
    "role": "",
    "duration": "",
    "location": "",
    "highlights": []
  }
]

Rules:
- No guessing
- Empty string if unknown
- Return ONLY JSON

Text:
"""${text}"""
`

export const skillsPrompt = (text: string) => `
Extract technical skills as a JSON array.

Rules:
- No duplicates
- Normalize names

Text:
"""${text}"""
`
