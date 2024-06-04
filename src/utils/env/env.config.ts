import * as dotenv from 'dotenv';
dotenv.config();

export interface I_ENV {
  PORT: number;
  PREFIX: string;
  SWAGGER_PATH: string;
  GEMINI: {
    KEY: string;
    PRO_MODEL: string;
    PRO_VISION_MODEL: string;
  };
}

export const Env: I_ENV = {
  PORT: Number(process.env.PORT) || 8000,
  SWAGGER_PATH: process.env.SWAGGER_PATH || 'docs',
  PREFIX: process.env.PREFIX || 'api',
  GEMINI: {
    KEY: process.env.GEMINI_API_KEY || '',
    PRO_MODEL: process.env.GEMINI_PRO_MODEL || 'gemini-pro',
    PRO_VISION_MODEL:
      process.env.GEMINI_PRO_VISION_MODEL || 'gemini-pro-vision',
  },
};
