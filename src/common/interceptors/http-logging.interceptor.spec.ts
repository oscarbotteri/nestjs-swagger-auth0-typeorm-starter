import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { HttpLoggingInterceptor } from './http-logging.interceptor';

describe('HttpLoggingInterceptor', () => {
  let interceptor: HttpLoggingInterceptor;
  const debugLoggerSpy = jest.spyOn(Logger, 'debug');
  const errorLoggerSpy = jest.spyOn(Logger, 'error');
  const httpArgumentsHost = {
    getRequest: jest.fn().mockReturnValue({ method: 'GET', url: '/health' }),
    getResponse: jest.fn().mockReturnValue({ statusCode: HttpStatus.OK }),
    getNext: jest.fn(),
  };
  const executionContext: ExecutionContext = {
    switchToHttp: jest.fn().mockReturnValue(httpArgumentsHost),
    getClass: jest.fn().mockReturnValue({ name: 'controllerClassName' }),
    getHandler: jest.fn(),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
  };

  beforeEach(() => {
    interceptor = new HttpLoggingInterceptor();
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => 1)
      .mockImplementation(() => 4);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('intercept method', () => {
    it('should log requests with the response time', (done) => {
      const nextCallHandler: CallHandler = {
        handle: jest.fn(() => of(jest.fn())),
      };
      const responseInterceptor: Observable<CallHandler> =
        interceptor.intercept(executionContext, nextCallHandler);

      debugLoggerSpy.mockImplementation(() => {});
      responseInterceptor.subscribe({
        complete: () => {
          const { method, url } = httpArgumentsHost.getRequest();
          const { statusCode } = httpArgumentsHost.getResponse();
          expect(debugLoggerSpy).toHaveBeenCalledWith(
            {
              message: `[${statusCode}] ${method} ${url} 3ms`,
            },
            executionContext.getClass().name,
          );
          expect(debugLoggerSpy).toHaveBeenCalledTimes(1);
          done();
        },
      });
    });

    it('should log responses with the error', (done) => {
      const nextCallHandler: CallHandler = {
        handle: jest.fn(() =>
          throwError(() => new BadRequestException('try and retry')),
        ),
      };
      const responseInterceptor: Observable<CallHandler> =
        interceptor.intercept(executionContext, nextCallHandler);

      errorLoggerSpy.mockImplementation(() => {});
      responseInterceptor.subscribe({
        error: (error) => {
          const { method, url } = httpArgumentsHost.getRequest();
          expect(errorLoggerSpy).toHaveBeenCalledWith(
            {
              message: `[${error.status}] ${method} ${url} 3ms`,
              body: undefined,
              error,
            },
            error,
            executionContext.getClass().name,
          );
          expect(errorLoggerSpy).toHaveBeenCalledTimes(1);
          done();
        },
      });
    });
  });
});
