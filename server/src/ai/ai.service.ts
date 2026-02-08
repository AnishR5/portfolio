import OpenAI from 'openai'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AiService {
  private client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })  

  async extractJSON<T>(prompt: string): Promise<T> {
    const res = await this.client.chat.completions.create({
      model: 'gpt-4.1-mini',
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [{ role: 'user', content: prompt }],
    })

    return JSON.parse(res.choices[0].message.content!)
  }
}
