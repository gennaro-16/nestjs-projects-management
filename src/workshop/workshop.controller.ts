import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { CreateWorkshopDto} from './dto/CreateWorkshopDto';
import { UpdateWorkshopDto } from './dto/UpdateWorkshopDto';

@Controller('workshops')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post()
  create(@Body() createWorkshopDto: CreateWorkshopDto) {
    return this.workshopService.create(createWorkshopDto);
  }

  @Get()
  findAll() {
    return this.workshopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workshopService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateWorkshopDto: UpdateWorkshopDto) {
    return this.workshopService.update(id, updateWorkshopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workshopService.remove(id);
  }
  @Get('past')
  findPast() {
    return this.workshopService.findPast();
  }

  @Get('upcoming')
  findUpcoming() {
    return this.workshopService.findUpcoming();
  }
}
