import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './auth.enums';
import { ROLES_KEY } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {return true;}

    const request = context.switchToHttp().getRequest<{headers: Record<string, string>}>();
    const token = request.headers['authorization']
    const role = request.headers['x-user-role'] as Role;

    if(token!== 'Bearer abc') {
      return false;
    }

    return requiredRoles.includes(role);
  }
}