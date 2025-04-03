import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { JwtCustomModule } from 'src/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // Use env variables in production
      signOptions: { expiresIn: '1h' },
    }),  ConfigModule,
  ],
  providers: [AuthService, JwtStrategy,JwtService, PrismaService,AuthGuard,JwtCustomModule],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
