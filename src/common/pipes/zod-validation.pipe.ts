import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessage = err.issues?.map((err) => err.message).join(' || ');
        throw new BadRequestException(errorMessage);
      }
      throw err;
    }
  }
}
