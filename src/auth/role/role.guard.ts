import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/enums/user.role.enum';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector) {

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const roles = this.reflector.get<UserRole[]>('roles', context.getHandler())
      if (!roles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const user = req.user
      console.log(user);
      return roles.some((role) => role.toString() == user.role);
    } catch (error) {
      throw error;
    }
  }
}
