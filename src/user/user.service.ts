import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByName(firstName: string, lastName: string) {
    return this.prisma.user.findMany({ where: { firstName, lastName } });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async updateUserPassword(dto: UpdateUserPasswordDto) {
    const { email, newPassword } = dto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    
    const hashedPassword = await hash(newPassword, 10);
    await this.prisma.user.update({ where: { email }, data: { password: hashedPassword } });
    return { message: 'Password updated successfully' };
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async comparePasswords(plainText: string, hashedPassword: string) {
    return compare(plainText, hashedPassword);
  }

  async deleteUser(id: string) {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    
    return this.prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async updateUserProfile(id: string, data: Partial<Prisma.UserUpdateInput>) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async generateResetToken(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
    await this.prisma.user.update({ where: { email }, data: { resetToken, resetTokenExpiry } });
    return { resetToken };
  }

  async validateResetToken(email: string, token: string) {
    const user = await this.findUserByEmail(email);
    if (!user || user.resetToken !== token || new Date() > user.resetTokenExpiry) {
      throw new BadRequestException('Invalid or expired reset token');
    }
    return true;
  }

  async verifyUser(email: string, token: string) {
    const user = await this.findUserByEmail(email);
    if (!user || user.verificationToken !== token) throw new BadRequestException('Invalid verification token');
    
    await this.prisma.user.update({ where: { email }, data: { verified: true, verificationToken: null } });
    return { message: 'User verified successfully' };
  }

  async updateUserRole(id: string, role: RoleType) {
    return this.prisma.user.update({ where: { id }, data: { role } });
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
  id: string;
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
  role: RoleType;
};
