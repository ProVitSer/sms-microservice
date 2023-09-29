import { RabbitModule } from '@app/rabbit/rabbit.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Sms, SmsSchema } from './sms.schema';
import { SmsModelService } from './services/sms-model.service';
import { SmsService } from './services/sms.service';
import { SmsApiModule } from '@app/sms-api/sms-api.module';
import { SmsController } from './controllers/sms.controller';
import { CheckSmscSmsStatus } from './schedule/check-smsc-sms-status.schedule';
import { SmsMessagingSubscribe } from './sms-mq/sms-messaging.subscribe';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: Sms.name, schema: SmsSchema }]),
        ScheduleModule.forRoot(),
        RabbitModule,
        SmsApiModule,
    ],
    providers: [SmsModelService, SmsService, CheckSmscSmsStatus, SmsMessagingSubscribe],
    controllers: [SmsController],
    exports: [],
})
export class SmsModule {}
