import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'GlobalExceptionFilter',
      );
    } else {
      this.logger.warn(
        `${request.method} ${request.url} - Status ${status} - ${message}`,
      );
    }

    response.status(status).json(errorResponse);
  }
}