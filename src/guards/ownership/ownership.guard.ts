import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Extract logged-in user from request
    const projectId = request.params.id; // Extract project ID from request params

    if (!user) {
      throw new ForbiddenException('You are not authenticated');
    }

    // Fetch the project from the database
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { owners: true }, // Fetch owners of the project
    });

    if (!project) {
      throw new ForbiddenException('Project not found');
    }

    // Check if the user is an owner of the project
    const isOwner = project.owners.some(owner => owner.id === user.id);

    if (!isOwner) {
      throw new ForbiddenException('You are not authorized to modify this project');
    }

    return true; // Grant access if the user is the owner
  }
}
