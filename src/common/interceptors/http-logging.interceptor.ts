import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express-serve-static-core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CallHandler> {
    const start = Date.now();
    const { method, url, body }: Request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap({
        complete: () => {
          const { statusCode }: Response = context.switchToHttp().getResponse();
          const time = Date.now() - start;

          Logger.debug(
            {
              message: `[${statusCode}] ${method} ${url} ${time}ms`,
              ...(method !== 'GET' ? body : {}),
            },
            `${context.getClass().name}`,
          );
        },
        error: (error) => {
          const time = Date.now() - start;
          const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;

          Logger.error(
            {
              message: `[${statusCode}] ${method} ${url} ${time}ms`,
              body,
              error,
            },
            error,
            `${context.getClass().name}`,
          );
        },
      }),
    );
  }
}
