import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';


@Injectable()
export class AppService {

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleServerRunning() {
    try {
      console.log("Server is running");
    } catch (err) {
      throw err;
    }
  }
}
