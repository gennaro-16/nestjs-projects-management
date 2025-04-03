import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // ✅ Import PrismaModule
import { AuthModule } from '../auth/auth.module'; // ✅ Import AuthModule
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule, AuthModule], // ✅ Add AuthModule here
  providers: [UserService, AuthGuard,JwtService], // ✅ Provide AuthGuard explicitly
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
