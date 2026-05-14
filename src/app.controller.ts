import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EvService } from './common/config/ev/ev.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly evService: EvService) {
    console.log(`Port from EvService: ${this.evService.getPort()}`);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
