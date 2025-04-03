import { Module } from '@nestjs/common';
import { MailService } from './mail.service'; // Import MailService
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule for environment variables

@Module({
  imports: [ConfigModule], // Import ConfigModule to use ConfigService
  providers: [MailService], // Register MailService
  exports: [MailService], // Export MailService for use in other modules
})
export class MailModule {}
