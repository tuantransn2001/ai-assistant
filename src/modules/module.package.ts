import { Module } from '@nestjs/common';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [GeminiModule],
})
export class PackageModule {}
