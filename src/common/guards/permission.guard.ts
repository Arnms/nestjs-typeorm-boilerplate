import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowTables = this.reflector.get<string[]>(
      'tables',
      context.getHandler(),
    );

    if (!allowTables) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as User;

    if (!user) {
      return false;
    } else if (!user?.permission) {
      return false;
    }

    return true;
  }
}
