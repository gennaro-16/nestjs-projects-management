// jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private jwt: NestJwtService) {}

  // Sign a token with user data
  signToken(payload: object): string {
    return this.jwt.sign(payload);
  }

  // Verify a JWT token and return decoded payload
  verifyToken(token: string): any {
    return this.jwt.verify(token);
  }

  // Decode a token without verifying (useful for optional authentication)
  decodeToken(token: string): any {
    return this.jwt.decode(token);
  }
}
