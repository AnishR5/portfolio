import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { parseResumeFromBuffer } from './resume.parser';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('parse')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 6 * 1024 * 1024 },
    }),
  )
  async parseResume(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Missing file upload');
    }

    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowed.includes(file.mimetype)) {
      throw new BadRequestException('Only PDF or DOCX files are supported.');
    }

    const data = await this.appService.parseResume(
      file.buffer,
      file.mimetype,
    )

    return { data };
  }
}
