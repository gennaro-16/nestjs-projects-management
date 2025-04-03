import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcomeMessage() {
    return this.appService.getWelcomeMessage();
  }

  @Get('/info')
  getPlatformInfo() {
    return this.appService.getPlatformInfo();
  }
}
