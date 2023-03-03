import { Controller, Get, Render } from '@nestjs/common';
import { AirPolutionServiceService } from './air-polution-service/air-polution-service.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly airPollutionService: AirPolutionServiceService) { }

  @Get()
  @Render('index')
  getHello() {
    this.airPollutionService
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
  @Get('maxTemperature')
  async getMaxTemperature() {
    return {
      "maxTemperature": await this.airPollutionService.getMaxTemperature()
    }
  }
}
