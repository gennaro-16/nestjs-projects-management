import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUser } from 'src/types/request-with-user.type';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1]; // Extract token

    try {
      //  Verify and decode token
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }); //  Ensure this uses the correct secret

      console.log("Decoded JWT:", decoded); // 🔍 Debug: Check what’s inside

      if (!decoded.id || !decoded.email) {
        throw new UnauthorizedException('Invalid token structure');
      }

      //  Fetch full user data from DB
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user; // Attach user to request
      return true;
    } catch (err) {
      console.error("JWT Verification Error:", err.message); // 🔍 Debug
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
