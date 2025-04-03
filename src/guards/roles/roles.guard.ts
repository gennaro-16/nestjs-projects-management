import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from 'src/types/request-with-user.type';
import { Role } from 'src/types/roles.enum'; // ✅ Import from roles.enum.ts

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler()); // ✅ Fixed type
    if (!requiredRoles || requiredRoles.length === 0) return true; // ✅ No roles required

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found in request. Ensure authentication is implemented.');
    }

    if (!user.role) {
      throw new ForbiddenException('User role not set. Ensure role is assigned correctly.');
    }

    if (!requiredRoles.includes(user.role as Role)) { // ✅ Ensures type consistency
      throw new ForbiddenException(`Access denied. Required roles: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}
