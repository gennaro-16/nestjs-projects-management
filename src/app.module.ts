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
import { AuditLogController } from './audit-log/audit-log.controller';
import { AuditLogService } from './audit-log/audit-log.service';
import { AuditLogModule } from './audit-log/audit-log.module';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackModule } from './feedback/feedback.module';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { MilestoneController } from './milestone/milestone.controller';
import { MilestoneService } from './milestone/milestone.service';
import { MilestoneModule } from './milestone/milestone.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { SoutenanceController } from './soutenance/soutenance.controller';
import { SoutenanceService } from './soutenance/soutenance.service';
import { SoutenanceModule } from './soutenance/soutenance.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrackingController } from './tracking/tracking.controller';
import { TrackingService } from './tracking/tracking.service';
import { TrackingModule } from './tracking/tracking.module';
import { WorkshopService } from './workshop/workshop.service';
import { DeliverableService } from './deliverable/deliverable.service';
import { WorkshopController } from './workshop/workshop.controller';
import { DeliverableController } from './deliverable/deliverable.controller';
import { WorkshopModule } from './workshop/workshop.module';
import { DeliverableModule } from './deliverable/deliverable.module';


@Module({
  imports: [AuthModule,ConfigModule, UserModule, AnnouncementModule, ApprovalStatusModule, AuditLogModule, CommentModule, FeedbackModule, FileModule, MilestoneModule, NotificationModule, SoutenanceModule, TaskModule, AdminModule, MailModule, TrackingModule, WorkshopModule, DeliverableModule,],
  controllers: [AppController, ProjectController, AnnouncementController, ApprovalStatusController, AuditLogController, CommentController, FeedbackController, FileController, MilestoneController, NotificationController, SoutenanceController, TaskController, AdminController, TrackingController, WorkshopController, DeliverableController],
  providers: [AppService, PrismaService, ProjectService,JwtService, MailService,AuthGuard, AnnouncementService, ApprovalStatusService, AuditLogService, CommentService, FeedbackService, FileService, MilestoneService, NotificationService, SoutenanceService, TaskService, AdminService, TrackingService, WorkshopService, DeliverableService],
})
export class AppModule {}
