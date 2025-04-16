import { Controller, Post, Body,Query, UseGuards, Request, Get, Patch, Delete, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { OwnershipGuard } from 'src/guards/ownership/ownership.guard';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtService } from '@nestjs/jwt';
import { ProjectType, ProjectStatus, ProjectStage } from '../types/project.types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(AuthGuard) // Only authenticated users can create a project
  @Post()
  async createProject(@Request() req, @Body() dto: CreateProjectDto) {
    return this.projectService.createProject(req.user.id, dto);
  }
//get all memebrs , encadrants ...../
@Get(':projectId/relation')
async getProjectRelation(
  @Param('projectId') projectId: string,
  @Query('relationType') relationType: string, // Pass the relation type as a query parameter
) {
  if (!relationType) {
    throw new BadRequestException('Relation type is required');
  }
  return this.projectService.getProjectRelation(projectId, relationType);
}

  //add member to a project 
  // Example route handler for /add-user
  //✅ tested 
  @UseGuards(AuthGuard, OwnershipGuard)
  @Post('/add-member')
  addMember(@Body() body) {
    const { projectId, userIdentifier } = body;
    return this.projectService.attachUserToProject(projectId, userIdentifier, "members");
  }
  
  @Post('/add-encadrant')
  addEncadrant(@Body() body) {
    const { projectId, userIdentifier } = body;
    return this.projectService.attachUserToProject(projectId, userIdentifier, "encadrants");
  }
  
  @Post('/add-jury')
  addJury(@Body() body) {
    const { projectId, userIdentifier } = body;
    return this.projectService.attachUserToProject(projectId, userIdentifier, "juryMembers");
  }
  

  //add encadrant to a prject (in case they didnt have encdarant yet )

  // get projects that doest have encadranss 
  @Get('noencadransts')
  async getProjectsWithoutEncadrants() {
    return this.projectService.getProjectsWithoutEncadrants();
  }

  // get projects that have only 2 members (field of more members needeed true )


  @Get('search/name/:name')
  async searchByName(@Param('name') name: string) {
    return this.projectService.searchProjectByName(name);
  }

  @Get('search/owner/:ownerName')
  async searchByOwner(@Param('ownerName') ownerName: string) {
    return this.projectService.searchProjectByOwner(ownerName);
  }

  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }


  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @UseGuards(AuthGuard, OwnershipGuard) // Only authenticated owners can update
  @Patch(':id')
  async updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.updateProject(id, dto);
  }

  @UseGuards(AuthGuard, OwnershipGuard) // Only project owners can delete
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Get('search/industry/:industry')
  async searchByIndustry(@Param('industry') industry: string) {
    return this.projectService.searchProjectByIndustry(industry);
  }

  @UseGuards(AuthGuard, OwnershipGuard) // Only owners can manage team members
  @Post(':projectId/add-member/:userId')
  async addMembe(@Param('projectId') projectId: string, @Param('userId') userId: string) {
    return this.projectService.addMember(projectId, userId);
  }

  @UseGuards(AuthGuard, OwnershipGuard)
  @Post(':projectId/remove-member/:userId')
  async removeMember(@Param('projectId') projectId: string, @Param('userId') userId: string) {
    return this.projectService.removeMember(projectId, userId);
  }

  @Get('filter/stage/:stage')
  async getProjectsByStage(@Param('stage') stage: ProjectStage) {
    return this.projectService.getProjectsByStage(stage);
  }

  @Get('filter/status/:status')
  async getProjectsByStatus(@Param('status') status: ProjectStatus) {
    return this.projectService.getProjectsByStatus(status);
  }

  @Get('sort/date/:order')
  async sortByDate(@Param('order') order: 'asc' | 'desc') {
    return this.projectService.getProjectsSortedByDate(order);
  }

  @Get('sort/members/:order')
  async sortByMembers(@Param('order') order: 'asc' | 'desc') {
    return this.projectService.getProjectsSortedByMembers(order);
  }

  @Get('stats/top-industries')
  async getTopIndustries() {
    return this.projectService.getTopIndustries();
  }

  @Get('stats/top-projects')
  async getTopProjectsByMembers() {
    return this.projectService.getTopProjectsByMembers();
  }
}


/*// 

// ✅ Set funding goal
@Patch(':projectId/funding-goal')
async setFundingGoal(@Param('projectId') projectId: string, @Body('fundingGoal') fundingGoal: number) {
  return this.projectService.setFundingGoal(projectId, fundingGoal);
}

// ✅ Update funding raised
@Patch(':projectId/funding-raised')
async updateFundingRaised(@Param('projectId') projectId: string, @Body('amount') amount: number) {
  return this.projectService.updateFundingRaised(projectId, amount);
}

// ✅ Get top industries
@Get('stats/top-industries')
async getTopIndustries() {
  return this.projectService.getTopIndustries();
}

// ✅ Get top projects by members
@Get('stats/top-projects')
async getTopProjectsByMembers() {
  return this.projectService.getTopProjectsByMembers();
}

// ✅ Follow a project
@Post(':projectId/follow/:userId')
async followProject(@Param('userId') userId: string, @Param('projectId') projectId: string) {
  return this.projectService.followProject(userId, projectId);
}

// ✅ Send partnership request
@Post(':projectId/partnership/:userId')
async sendPartnershipRequest(@Param('userId') userId: string, @Param('projectId') projectId: string) {
  return this.projectService.sendPartnershipRequest(userId, projectId);
}
*/