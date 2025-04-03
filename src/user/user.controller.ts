import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getAuthenticatedUser(@Req() req) {
    return req.user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get('name')
  async getUserByName(@Query('firstName') firstName: string, @Query('lastName') lastName: string) {
    return this.userService.findUserByName(firstName, lastName);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput) {
    return this.userService.createUser(data);
  }

  @Patch('password')
  async updateUserPassword(@Body() dto: UpdateUserPasswordDto) {
    return this.userService.updateUserPassword(dto);
  }

  @Patch('profile')
  @UseGuards(AuthGuard)
  async updateAuthenticatedUserProfile(@Req() req, @Body() data: Partial<Prisma.UserUpdateInput>) {
    return this.userService.updateUserProfile(req.user.id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post('reset-token')
  async generateResetToken(@Body('email') email: string) {
    return this.userService.generateResetToken(email);
  }

  @Post('validate-reset-token')
  async validateResetToken(@Body('email') email: string, @Body('token') token: string) {
    return this.userService.validateResetToken(email, token);
  }

  @Post('verify-user')
  async verifyUser(@Body('email') email: string, @Body('token') token: string) {
    return this.userService.verifyUser(email, token);
  }

  @Patch('role/:id')
  async updateUserRole(@Param('id') id: string, @Body('role') role: RoleType) {
    return this.userService.updateUserRole(id, role);
  }
}

export enum RoleType {
  ADMIN = 'ADMIN',
  STAGE_SERVICE = 'STAGE_SERVICE',
  PROJECT_OWNER = 'PROJECT_OWNER',
  COMMITTEE_MEMBER = 'COMMITTEE_MEMBER',
  JURY_MEMBER = 'JURY_MEMBER',
  SUPERVISOR = 'SUPERVISOR',
  MEMBER = 'MEMBER',
  LEADER = 'LEADER',
}


export type UserType = {
  id: string; // UUID as a string
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  profilePicture?: string | null;
  bio?: string | null;
  website?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  verified: boolean;
  verificationToken?: string | null;
  role: RoleType; // ✅ Updated to match Prisma Enum
};

