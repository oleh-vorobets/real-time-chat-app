import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const logMessage =
      `METHOD - ${request.method} | URL - ${request.url} | ` +
      `QUERY - ${JSON.stringify(request.query)} | PARAMS - ${JSON.stringify(request.params)} | BODY - ${JSON.stringify(request.body)} `;
    console.log(logMessage);
    return next.handle();
  }
}
