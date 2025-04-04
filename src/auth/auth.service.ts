import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ForgotPasswordDto,ResetPasswordDto } from './dto/forgot-password.dto';
import { CustomUserUpdateInput } from 'src/types/custom-prisma.types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwt-payload.type';
import { v4 as uuidv4 } from 'uuid';
import { addMinutes, isAfter } from 'date-fns';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService, // Add ConfigService here
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async signup(dto: SignupDto) {
    const { email, password, firstName, lastName, role, phoneNumber, profilePicture, bio, website } = dto;
  
    // ✅ Prevent users from signing up as ADMIN
    if (role === "ADMIN") {
      throw new BadRequestException('You cannot sign up as an ADMIN');
    }
  
    // ✅ Check if user already exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
  
    // ✅ Ensure password is strong
    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }
  
    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // ✅ Generate secure verification token
    try {
      // ✅ Generate 6-digit verification token
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          profilePicture,
          bio,
          website,
          role,
          verified: false,
          verificationToken,
        },
      });
    
      // ✅ Send email with 6-digit code
      await this.sendVerificationEmail(user.email, verificationToken);
    
      return { message: 'User created successfully. Please verify your email with the code sent to you.' };
    } catch (error) {
      throw new BadRequestException('Error creating user. Please try again.');
    }
    
  }
  

  async signin(dto: SigninDto) {
    const { email, password } = dto;
  
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
  
    const token = await this.generateJwtToken(user);
  
    // Remove null fields dynamically
    const userResponse = Object.fromEntries(
      Object.entries({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        bio: user.bio,
        website: user.website,
        role: user.role,
      }).filter(([_, value]) => value !== null)
    );
  
    return {
      message: 'Login successful',
      token,
      user: userResponse,
    };
  }
  

  private async generateJwtToken(user: any) {
    const payload: JwtPayload = { id: user.id, email: user.email };
    const jwtSecret = this.configService.get<string>('JWT_SECRET'); // Use env variable for JWT secret
    return this.jwtService.signAsync(payload, { secret: jwtSecret, expiresIn: '1h' });
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const { email } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    const resetToken = uuidv4();
    const resetTokenExpiry = addMinutes(new Date(), 15);

    await this.prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry } as CustomUserUpdateInput,
    });

    await this.sendResetEmail(user.email, resetToken);

    return { message: 'Password reset email sent' };
  }

  private async sendResetEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'), // Use env variable for email user
        pass: this.configService.get<string>('EMAIL_PASS'), // Use env variable for email password
      },
    });

    const mailOptions = {
      from: `"ProjectHub" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: email,
      subject: '🔒 Password Reset Request',
      text: `You requested a password reset. Use the following token: ${token}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;">
          <div style="text-align: center; padding-bottom: 20px;">
            <h2 style="color: #333;">🔐 Password Reset Request</h2>
          </div>
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <p style="font-size: 16px; color: #444;">Hello,</p>
            <p style="font-size: 16px; color: #444;">You requested to reset your password. Click the button below to proceed:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="http://yourfrontend.com/reset-password?token=${token}" 
                 style="background: #007bff; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; display: inline-block; font-size: 16px; font-weight: bold;">
                Reset Your Password
              </a>
            </div>
            <p style="font-size: 14px; color: #888;">If you did not request this, please ignore this email.</p>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #aaa; text-align: center;">ProjectHub | All rights reserved © ${new Date().getFullYear()}</p>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Reset email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new BadRequestException('Failed to send password reset email');
    }
  }

  async sendVerificationEmail(email: string, code: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  
    const mailOptions = {
      from: `"ProjectHub" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: email,
      subject: 'Verify Your Email - ProjectHub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #333;">Welcome to ProjectHub 🎉</h2>
          <p>Please use the following verification code to activate your account:</p>
          <div style="font-size: 32px; font-weight: bold; color: #007bff; margin: 20px 0;">${code}</div>
          <p>If you didn't sign up, you can safely ignore this email.</p>
          <p style="font-size: 12px; color: #aaa; text-align: center;">© ${new Date().getFullYear()} ProjectHub. All rights reserved.</p>
        </div>
      `,
    };
  
    await transporter.sendMail(mailOptions);
  }
  

  async resetPassword(dto: ResetPasswordDto) {
    const { token, newPassword } = dto;

    const user = await this.prisma.user.findFirst({
      where: { resetToken: token },
    });

    if (!user || !user.resetTokenExpiry || isAfter(new Date(), user.resetTokenExpiry)) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      } as CustomUserUpdateInput,
    });

    return { message: 'Password reset successfully' };
  }

  async verifyEmail(code: string) {
    const user = await this.prisma.user.findFirst({
      where: { verificationToken: code },
    });
  
    if (!user) {
      throw new BadRequestException('Invalid or expired verification code');
    }
  
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
        verificationToken: null,
      },
    });
  
    return { message: 'Email verified successfully!' };
  }
  
}
