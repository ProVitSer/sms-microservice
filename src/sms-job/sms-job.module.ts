import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SmsJob, SmsJobSchema } from './sms-job.schema';
import { SmsJobController } from './controllers/sms-job.controller';
import { SmsJobService } from './services/sms-job.service';
import { SmsJobModelService } from './services/sms-job-model.service';
import { SmsJobsSchedule } from './schedule/sms-jobs.schedule';
import { SmsConfigModule } from '@app/sms-config/sms-config.module';
import { SmsApiModule } from '@app/sms-api/sms-api.module';
import { CheckStatusSmscJobSchedule } from './schedule/check-status-sms-job.schedule';
import { SmsJobResultController } from './controllers/sms-job-result.controller';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: SmsJob.name, schema: SmsJobSchema }]),
        ScheduleModule.forRoot(),
        SmsConfigModule,
        SmsApiModule,
    ],
    providers: [SmsJobService, SmsJobModelService, SmsJobsSchedule, CheckStatusSmscJobSchedule],
    exports: [],
    controllers: [SmsJobController, SmsJobResultController],
})
export class SmsjobModule {}
