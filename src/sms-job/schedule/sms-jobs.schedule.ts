import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { SmsJobService } from '../services/sms-job.service';
import { EVERY_20_SECONDS } from '../sms-job.consts';

@Injectable()
export class SmsJobsSchedule {
    constructor(private readonly smsJobService: SmsJobService, private readonly log: AppLoggerService) {}

    @Cron(EVERY_20_SECONDS)
    async sendScheduledSmsJob(): Promise<void> {
        try {
            await this.smsJobService.startSmsJob();
        } catch (e) {
            this.log.error(e);
        }
    }
}
