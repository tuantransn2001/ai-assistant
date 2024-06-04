import { Inject, Provider } from '@nestjs/common';
import { GeminiServiceImpl } from '../application/gemini.service';

const PROVIDER_NAME = 'GeminiService';

export const GeminiServiceInject = () => Inject(PROVIDER_NAME);
export const GeminiServiceProvider: Provider = {
  provide: PROVIDER_NAME,
  useClass: GeminiServiceImpl,
};
