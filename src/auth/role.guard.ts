import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from 'src/common/role.decorator';

export enum ACCESS {
  'CREATE' = 'CREATE',
  'UPDATE' = 'UPDATE',
  'DELETE' = 'DELETE',
  'QUERY' = 'QUERY',
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (!req.headers.services) {
      return true;
    }
    if (!req.headers.services.includes(requiredRoles)) {
      return false;
    }

    return true;
  }
}
