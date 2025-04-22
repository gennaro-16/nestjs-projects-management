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
import { AnnouncementController } from './announcement/announcement.controller';
import { AnnouncementService } from './announcement/announcement.service';
import { AnnouncementModule } from './announcement/announcement.module';
import { ApprovalStatusController } from './approval-status/approval-status.controller';
import { ApprovalStatusService } from './approval-status/approval-status.service';
import { ApprovalStatusModule } from './approval-status/approval-status.module';

import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { SoutenanceController } from './soutenance/soutenance.controller';
import { SoutenanceService } from './soutenance/soutenance.service';
import { SoutenanceModule } from './soutenance/soutenance.module';

import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleModule } from './module/module.module';



@Module({
  imports: [AuthModule,ConfigModule, UserModule, AnnouncementModule, ApprovalStatusModule, NotificationModule, SoutenanceModule,  AdminModule, MailModule, ModuleModule],
  controllers: [AppController, ProjectController, AnnouncementController, ApprovalStatusController,  NotificationController, SoutenanceController, AdminController],
  providers: [AppService, PrismaService, ProjectService,JwtService, MailService,AuthGuard, AnnouncementService, ApprovalStatusService, NotificationService, SoutenanceService, AdminService],
})
export class AppModule {}
