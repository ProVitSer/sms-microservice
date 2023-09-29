import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SmsJob, SmsJobSchema } from './sms-job.schema';
import { SmsJobController } from './sms-job.controller';

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{ name: SmsJob.name, schema: SmsJobSchema }]), ScheduleModule.forRoot()],
    providers: [],
    exports: [],
    controllers: [SmsJobController],
})
export class SmsjobModule {}
