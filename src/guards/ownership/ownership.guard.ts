import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Try to get projectId from params first, fallback to body
    const projectId =
      request.params.id || request.body.projectId || request.body.id;

    if (!user) {
      throw new ForbiddenException('You are not authenticated');
    }

    if (!projectId) {
      throw new ForbiddenException('No project ID provided');
    }

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { owners: true },
    });

    if (!project) {
      throw new ForbiddenException('Project not found');
    }

    const isOwner = project.owners.some((owner) => owner.id === user.id);

    if (!isOwner) {
      throw new ForbiddenException(
        'You are not authorized to modify this project',
      );
    }

    return true;
  }
}
