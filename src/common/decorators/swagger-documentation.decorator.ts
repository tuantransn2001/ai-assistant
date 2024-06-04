import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiConsumes,
} from '@nestjs/swagger';

interface SwaggerDocumentationOptions {
  operation: {
    options: ApiOperationOptions;
  };
  body?: ApiBodyOptions;
  response?: ApiResponseOptions;
  query?: ApiQueryOptions;
  params?: ApiParamOptions;
  consumes?: string[];
  requiredAuth?: boolean;
}

export function SwaggerDocumentation(options: SwaggerDocumentationOptions) {
  const decorators = [ApiOperation(options.operation.options)];

  if (options.body) decorators.push(ApiBody(options.body));
  if (options.response) decorators.push(ApiResponse(options.response));
  if (options.query) decorators.push(ApiQuery(options.query));
  if (options.params) decorators.push(ApiParam(options.params));
  if (options.consumes) decorators.push(ApiConsumes(...options.consumes));

  return applyDecorators(...decorators);
}
