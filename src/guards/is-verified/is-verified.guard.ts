import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // The user should be attached by an authentication guard

    let email: string | undefined;

    if (user) {
      // If the user is logged in, use the email from the user object
      email = user.email;
    } else {
      // Otherwise, extract email from request body
      email = request.body.email;
    }

    if (!email) {
      throw new ForbiddenException('Email must be provided');
    }

    // Fetch user from database to check if they are verified
    const dbUser = await this.prisma.user.findUnique({
      where: { email: email },
      select: { verified: true },
    });

    if (!dbUser?.verified) {
      throw new ForbiddenException('Your email is not verified. Please verify your email first.');
    }

    return true; // Allow access if verified
  }
}
