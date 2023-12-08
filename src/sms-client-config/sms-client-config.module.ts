import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsClientConfigEntity } from './sms-client-config.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([SmsClientConfigEntity])],
    controllers: [],
    providers: [],
    exports: [],
})
export class SmsConfigModule {}
