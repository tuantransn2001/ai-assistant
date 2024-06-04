import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '@common/decorators/swagger-documentation.decorator';
import { GeminiService } from '@modules/gemini/application/gemini.service';
import { GeminiAiResponse } from '@modules/gemini/dtos/gemini-ai.response';
import { GenerateTextDto } from '@modules/gemini/dtos/generate-text.dto';
import { GeminiServiceInject } from '@modules/gemini/persistence/gemini.service';
import { fileValidatorPipe } from 'src/modules/gemini/validation/file-validator.pipe';

@ApiTags('google gemini')
@Controller('gemini')
export class GeminiController {
  constructor(
    @GeminiServiceInject()
    private readonly geminiService: GeminiService,
  ) {}

  @SwaggerDocumentation({
    operation: {
      options: {
        summary: 'Generate text from prompt',
      },
    },
  })
  @Post('text')
  generateText(@Body() dto: GenerateTextDto): Promise<GeminiAiResponse> {
    return this.geminiService.generateText(dto.prompt);
  }

  @SwaggerDocumentation({
    operation: {
      options: {
        summary: 'Generate text from prompt',
      },
    },
    consumes: ['multipart/form-data'],
    body: {
      schema: {
        type: 'object',
        properties: {
          prompt: {
            type: 'string',
            description: 'Prompt',
          },
          file: {
            type: 'string',
            format: 'binary',
            description: 'Binary file',
          },
        },
      },
    },
  })
  @Post('text-and-image')
  @UseInterceptors(FileInterceptor('file'))
  generateTextFromMultiModal(
    @Body() dto: GenerateTextDto,
    @UploadedFile(fileValidatorPipe)
    file: Express.Multer.File,
  ): Promise<GeminiAiResponse> {
    return this.geminiService.generateTextFromMultiModal(dto.prompt, file);
  }
}
