import { Body, Controller, Post, Get, Req, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { AuthGuard } from '../guards/auth/auth.guard'; // ✅ Ensures user is authenticated
import { IsVerifiedGuard } from '../guards/is-verified/is-verified.guard'; // ✅ Ensures user is verified
import { RequestWithUser } from 'src/types/request-with-user.type';
import { Role } from 'src/types/roles.enum';
import { Roles } from '../decorators/roles/roles.decorator';
import { VerifyEmailDto } from './dto/verify-email.dto';
@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}

  // ❌ No Guards → Anyone can register
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  // ❌ No Guards → Anyone can sign in
  //@UseGuards(IsVerifiedGuard)
  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  // ❌ No Guards → Anyone can request a password reset
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  // ❌ No Guards → Anyone can reset their password
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  // ❌ No Guards → Users verify their email freely
  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyEmail(body.token);
  }
  // ✅ Apply BOTH `AuthGuard` & `IsVerifiedGuard` ONLY to protected routes
  @Get('protected')
  @UseGuards(AuthGuard, IsVerifiedGuard)
  getProfile(@Req() request: RequestWithUser) {
    return {
      message: 'User Profile',
      user: request.user, // ✅ Full user object available
    };
  }

  @Get('admin')
  @UseGuards(AuthGuard, RolesGuard) // ✅ AuthGuard first, then RolesGuard
  @Roles(Role.ADMIN) // ✅ Requires ADMIN role
  getAdminData() {
    return { message: 'This is admin data' };
  }
  
  @Get('project-owner')
  // ✅ Use the Role enum
  getProjectOwnerData() {
    return { message: 'Project owner access' };
  }

  @Get('public')
  getPublicData() {
    return { message: 'This route is public' };
  }
}
