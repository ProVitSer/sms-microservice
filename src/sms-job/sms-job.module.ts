import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SmsJob, SmsJobSchema } from './sms-job.schema';
import { SmsJobController } from './controllers/sms-job.controller';
import { SmsJobService } from './services/sms-job.service';
import { SmsJobModelService } from './services/sms-job-model.service';

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{ name: SmsJob.name, schema: SmsJobSchema }]), ScheduleModule.forRoot()],
    providers: [SmsJobService, SmsJobModelService],
    exports: [],
    controllers: [SmsJobController],
})
export class SmsjobModule {}
