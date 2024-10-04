import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('wake-up/start')
  startWakeUp(
    @Query('delay') delay: number,
    @Query('duration') duration: number,
  ){
    return this.appService.handleWakeUp(delay, duration)
  }

  @Get('stop')
  stopWakeUp(){
    return this.appService.stopWakeUp()
  }
}
