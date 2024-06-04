import { Module } from '@nestjs/common';
import { GeminiController } from './presenters/http/gemini.controller';
import { GeminiServiceProvider } from './persistence/gemini.service';
import {
  GeminiProModelProvider,
  GeminiProVisionModelProvider,
} from './persistence/generative.model';

@Module({
  controllers: [GeminiController],
  providers: [
    GeminiServiceProvider,
    GeminiProModelProvider,
    GeminiProVisionModelProvider,
  ],
})
export class GeminiModule {}
