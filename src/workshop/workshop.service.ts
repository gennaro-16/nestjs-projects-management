import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have Prisma service ready
import { Workshop, WorkshopType } from '@prisma/client';
import { CreateWorkshopDto } from './dto/CreateWorkshopDto'; // Custom DTOs
import { UpdateWorkshopDto} from "./dto/UpdateWorkshopDto"
@Injectable()
export class WorkshopService {
  constructor(private prisma: PrismaService) {}

  // Create a new workshop
  async create(data: CreateWorkshopDto): Promise<Workshop> {
    return this.prisma.workshop.create({
      data,
    });
  }

  // Fetch all workshops
  async findAll(): Promise<Workshop[]> {
    return this.prisma.workshop.findMany();
  }

  // Fetch a single workshop by ID
  async findOne(id: string): Promise<Workshop | null> {
    return this.prisma.workshop.findUnique({
      where: { id },
    });
  }

  // Update a workshop by ID
  async update(id: string, data: UpdateWorkshopDto): Promise<Workshop> {
    return this.prisma.workshop.update({
      where: { id },
      data,
    });
  }

  // Delete a workshop by ID
  async remove(id: string): Promise<Workshop> {
    return this.prisma.workshop.delete({
      where: { id },
    });
  }

   // Get past workshops
   async findPast(): Promise<Workshop[]> {
    const currentDate = new Date();
    return this.prisma.workshop.findMany({
      where: {
        date: {
          lt: currentDate, // Less than current date
        },
      },
    });
  }

  // Get upcoming workshops
  async findUpcoming(): Promise<Workshop[]> {
    const currentDate = new Date();
    return this.prisma.workshop.findMany({
      where: {
        date: {
          gt: currentDate, // Greater than current date
        },
      },
    });
  }
}
