import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private intervalId: NodeJS.Timeout | null = null;
  private stopTimeoutId: NodeJS.Timeout | null = null;

  constructor(private readonly httpService: HttpService){}

  handleWakeUp(delay: number, duration: number) {
    const delayMs = delay * 60 * 1000; 
    const durationMs = duration * 60 * 1000; 

    this.intervalId = setInterval(async () => {
      try {
        await this.httpService.get(process.env.ENDPOINT_ORCHESTRATOR).toPromise();
        await this.httpService.get(process.env.ENDPOINT_ADMINPANEL).toPromise();
        console.log('API called successfully');
      } catch (error) {
        console.error('Error calling API', error);
      }
    }, delayMs);

    this.stopTimeoutId = setTimeout(() => {
      this.stopWakeUp();
    }, durationMs);

    console.log(`Wake-up started: every ${delay} minutes for ${duration} minutes`);
    return `Wake-up started: every ${delay} minutes for ${duration} minutes`;
  }

  stopWakeUp() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.stopTimeoutId) {
      clearTimeout(this.stopTimeoutId);
      this.stopTimeoutId = null;
    }
    console.log('Wake-up process stopped');
  }
}