import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Sms, SmsSchema } from './schemas/sms.schema';

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{ name: Sms.name, schema: SmsSchema }])],
    providers: [],
    exports: [],
    controllers: [],
})
export class SmsModule {}
