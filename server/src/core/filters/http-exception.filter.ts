import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface IError {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let errorMessage: string | string[];
    let errorType: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse() as IError;

      errorMessage = errorResponse.message || exception.message;
      errorType = errorResponse.error || 'Error';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal server error';
      errorType = 'InternalServerError';

      this.logger.error(exception);
    }

    const errorResponse = {
      success: false,
      statusCode: status,
      message: errorMessage,
      error: errorType,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,

      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };

    this.logger.error(`${request.method} ${request.url}`, errorResponse);

    response.status(status).json(errorResponse);
  }
}
