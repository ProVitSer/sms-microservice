import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Smsc } from './smsc';

@Module({
    imports: [ConfigModule],
    providers: [Smsc],
    exports: [Smsc],
})
export class SmscModule {}
