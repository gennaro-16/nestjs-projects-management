import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';

import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from './mail/mail.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { ApprovalStatusController } from './approval-status/approval-status.controller';
import { ApprovalStatusService } from './approval-status/approval-status.service';
import { ApprovalStatusModule } from './approval-status/approval-status.module';

import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';

import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleModule } from './module/module.module';
import { Workshop } from '@prisma/client';
import { WorkshopModule } from './workshop/workshop.module';
import { WorkshopController } from './workshop/workshop.controller';
import { WorkshopService } from './workshop/workshop.service';

// Add missing controller imports
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { ModuleController } from './module/module.controller';

// Add missing service imports
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { ModuleService } from './module/module.service';


@Module({
  imports: [AuthModule,ConfigModule,WorkshopModule, UserModule, ApprovalStatusModule, NotificationModule, MailModule, ModuleModule],
  controllers: [
    AppController, 
    ProjectController,
    WorkshopController, 
    ApprovalStatusController, 
    NotificationController,
    AuthController,
    UserController,
    ModuleController
  ],
  providers: [
    AppService, 
    PrismaService,
    WorkshopService, 
    ProjectService,
    JwtService, 
    MailService,
    AuthGuard, 
    ApprovalStatusService, 
    NotificationService,
    AuthService,
    UserService,
    ModuleService
  ],
})
export class AppModule {}
