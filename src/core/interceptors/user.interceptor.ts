import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    callHandler: CallHandler,
  ): Observable<any> {
    try {
      const req = context.switchToHttp().getRequest();

      req.body.userId = req.user.sub;

      return callHandler.handle();
    } catch (err) {
      throw err;
    }
  }

}