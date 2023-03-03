import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      "message": this.appService.getHello()
    }
  }
  @Get('maps')
  @Render('maps')
  getMap() {
    return {
      "message": this.appService.getHello()
    }
  }
  @Get('chart')
  @Render('chart')
  getChart() {
    return {
      "message": this.appService.getHello()
    }
  }
}
