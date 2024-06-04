import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GenerativeModel } from '@google/generative-ai';
import { createContent } from '../helpers/content.helper';
import {
  GenerativeModelInject,
  GenerativeProVisionModelInject,
} from '../persistence/generative.model';
import { GeminiAiResponse } from '../dtos/gemini-ai.response';

export interface GeminiService {
  generateText(prompt: string): Promise<GeminiAiResponse>;
  generateTextFromMultiModal(
    prompt: string,
    file: Express.Multer.File,
  ): Promise<GeminiAiResponse>;
}

@Injectable()
export class GeminiServiceImpl implements GeminiService {
  constructor(
    @GenerativeModelInject()
    private readonly proModel: GenerativeModel,
    @GenerativeProVisionModelInject()
    private readonly proVisionModel: GenerativeModel,
  ) {}

  public async generateText(prompt: string) {
    const contents = createContent(prompt);

    const { totalTokens } = await this.proModel.countTokens({ contents });
    const result = await this.proModel.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    return { totalTokens, text };
  }

  public async generateTextFromMultiModal(
    prompt: string,
    file: Express.Multer.File,
  ): Promise<GeminiAiResponse> {
    try {
      const contents = createContent(prompt, file);

      const { totalTokens } = await this.proVisionModel.countTokens({
        contents,
      });
      const result = await this.proVisionModel.generateContent({ contents });
      const response = await result.response;
      const text = response.text();

      return { totalTokens, text };
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message, err.stack);
      }
      throw err;
    }
  }
}
