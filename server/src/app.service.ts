import { Injectable } from '@nestjs/common';
import { parseResumeFromBuffer, RawResumeSections } from './resume.parser';
import { AiService } from './ai/ai.service';
import { parseResumeHybrid } from './ai/hybrid.parser';

@Injectable()
export class AppService {
  constructor(private readonly ai: AiService) {}

  async parseResume(buffer: Buffer, mimetype: string) {
    // 1️⃣ Extract + split sections (rules)
    const rawSections: RawResumeSections =
      await parseResumeFromBuffer(buffer, mimetype)

    // 2️⃣ Normalize with AI (hybrid)
    const resume = await parseResumeHybrid(rawSections, this.ai)

    return resume
  }
}