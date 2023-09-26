import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Sms, SmsSchema } from './schemas/sms.schema';
import { RabbitModule } from '@app/rabbit/rabbit.module';
import { SmscModule } from './providers/smsc/smsc.module';
import { SmsAeroModule } from './providers/sms-aero/sms-aero.module';
import { SmsRuModule } from './providers/sms-ru/sms-ru.module';
import { SmsService } from './services/sms.service';
import { SmsProviderService } from './services/sms-provider.service';
import { SmsMessagingSubService } from './services/sms-messaging-sub.service';
import { SmsModelService } from './services/sms-model.service';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: Sms.name, schema: SmsSchema }]),
        RabbitModule,
        SmscModule,
        SmsAeroModule,
        SmsRuModule,
    ],
    providers: [SmsModelService, SmsService, SmsProviderService, SmsMessagingSubService],
    controllers: [],
})
export class SmsModule {}
