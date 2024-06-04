import { Inject, Provider } from '@nestjs/common';
import {
  GEMINI_PRO_MODEL,
  GEMINI_PRO_VISION_MODEL,
} from '../constants/gemini.constant';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Env } from 'src/utils/env/env.config';
import { GENERATION_CONFIG, SAFETY_SETTINGS } from '../configs/gemini.config';

export const GenerativeModelInject = () => Inject(GEMINI_PRO_MODEL);
export const GeminiProModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_MODEL,
  useFactory: () => {
    const genAI = new GoogleGenerativeAI(Env.GEMINI.KEY);
    return genAI.getGenerativeModel({
      model: Env.GEMINI.PRO_MODEL,
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
};

export const GenerativeProVisionModelInject = () =>
  Inject(GEMINI_PRO_VISION_MODEL);
export const GeminiProVisionModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_VISION_MODEL,
  useFactory: () => {
    const genAI = new GoogleGenerativeAI(Env.GEMINI.KEY);
    return genAI.getGenerativeModel({
      model: Env.GEMINI.PRO_VISION_MODEL,
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
};
