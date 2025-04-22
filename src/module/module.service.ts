import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@prisma/client';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto} from './dto/update-module.dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  // Create a new module
  async create(data: CreateModuleDto): Promise<Module> {
    return this.prisma.module.create({
      data,
    });
  }

  // Retrieve all modules
  async findAll(): Promise<Module[]> {
    return this.prisma.module.findMany();
  }

  // Retrieve a single module by ID
  async findOne(id: string): Promise<Module | null> {
    return this.prisma.module.findUnique({
      where: { id },
    });
  }

  // Update a module by ID
  async update(id: string, data: UpdateModuleDto): Promise<Module> {
    return this.prisma.module.update({
      where: { id },
      data,
    });
  }

  // Delete a module by ID
  async remove(id: string): Promise<Module> {
    return this.prisma.module.delete({
      where: { id },
    });
  }
}
