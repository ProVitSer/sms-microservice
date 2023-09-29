import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Sms, SmsSchema } from './schemas/sms.schema';
import { RabbitModule } from '@app/rabbit/rabbit.module';
import { SmscModule } from './providers/smsc/smsc.module';
import { SmsAeroModule } from './providers/sms-aero/sms-aero.module';
import { SmsRuModule } from './providers/sms-ru/sms-ru.module';
import { SmsService } from './services/sms.service';
import { SmsProviderService } from './providers/sms-provider.service';
import { SmsMessagingSubscribe } from './sms-mq/sms-messaging.subscribe';
import { SmsModelService } from './services/sms-model.service';
import { CheckSmscSmsStatus } from './providers/smsc/schedule/check-smsc-sms-status.schedule';
import { ScheduleModule } from '@nestjs/schedule';
import { SmsController } from './controllers/sms.controller';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: Sms.name, schema: SmsSchema }]),
        ScheduleModule.forRoot(),
        RabbitModule,
        SmscModule,
        SmsAeroModule,
        SmsRuModule,
    ],
    providers: [SmsModelService, SmsService, SmsProviderService, SmsMessagingSubscribe, CheckSmscSmsStatus],
    exports: [SmsModelService],
    controllers: [SmsController],
})
export class SmsModule {}
