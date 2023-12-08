import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsMessageEntity } from './sms-message.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([SmsMessageEntity])],
    controllers: [],
    providers: [],
    exports: [],
})
export class SmsMessageModule {}
