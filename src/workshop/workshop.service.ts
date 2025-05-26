import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have Prisma service ready
import { Workshop, WorkshopType } from '@prisma/client';
import { CreateWorkshopDto } from './dto/CreateWorkshopDto'; // Custom DTOs
import { UpdateWorkshopDto} from "./dto/UpdateWorkshopDto"
@Injectable()
export class WorkshopService {
  constructor(private prisma: PrismaService) {}

  // Create a new workshop
  async create(data: CreateWorkshopDto): Promise<Workshop | { error: string }> {
    try {
      const existingWorkshop = await this.prisma.workshop.findUnique({
        where: { title: data.title }, // Assuming 'title' is unique
      });
  
      if (existingWorkshop) {
        return { error: 'A workshop with this title already exists.' };
      }
  
      const workshop = await this.prisma.workshop.create({ data });
      return workshop;
    } catch (error) {
      return { error: 'An unexpected error occurred while creating the workshop.' };
    }
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
      data, // Partial update: only updates provided fields
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
    try {
      const currentDate = new Date();
      console.log('Current Date:', currentDate.toISOString());
      
      // First, get all workshops to check their dates
      const allWorkshops = await this.prisma.workshop.findMany();
      console.log('All workshops:', allWorkshops.map(w => ({
        id: w.id,
        title: w.title,
        date: w.date.toISOString()
      })));
      
      const workshops = await this.prisma.workshop.findMany({
        where: {
          date: {
            lt: currentDate,
          },
        },
      });
      
      console.log('Found past workshops:', workshops.map(w => ({
        id: w.id,
        title: w.title,
        date: w.date.toISOString()
      })));
      return workshops;
    } catch (error) {
      console.error('Error in findPast:', error);
      throw error;
    }
  }
  
  async findUpcoming(): Promise<Workshop[]> {
    const currentDate = new Date();
    console.log('Current Date:', currentDate);
    
    const workshops = await this.prisma.workshop.findMany({
      where: {
        date: {
          gt: currentDate,
        },
      },
    });
    
    console.log('Found upcoming workshops:', workshops);
    return workshops;
  }
  
}

// the dto {}