// jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET, // Use an environment variable
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  providers: [JwtService], // Provide JwtService
  exports: [JwtService], // Make available to other modules
})
export class JwtCustomModule {} // Named differently to avoid conflicts
