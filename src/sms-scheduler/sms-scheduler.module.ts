import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsSchedulerEntity } from './sms-scheduler.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([SmsSchedulerEntity])],
    controllers: [],
    providers: [],
    exports: [],
})
export class SmsSchedulerModule {}
