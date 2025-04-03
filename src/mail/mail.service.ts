import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    // Configure Nodemailer with environment variables
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // For Gmail users; change this if using another email service
      auth: {
        user: this.configService.get<string>('EMAIL_USER'), // Use env variable for email user
        pass: this.configService.get<string>('EMAIL_PASS'), // Use env variable for email password/app key
      },
    });
  }

  // Method to send an email
  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
    try {
      const mailOptions = {
        from: `"Your Name" <${this.configService.get<string>('EMAIL_USER')}>`, // Sender address
        to, // Recipient email address
        subject, // Subject line
        text, // Plain text body
        html, // HTML body (optional)
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to} successfully.`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error.message);
      throw new Error(`Unable to send email to ${to}`);
    }
  }
}
