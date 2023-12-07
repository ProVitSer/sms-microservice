import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestService } from './http.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [HttpRequestService],
    exports: [HttpRequestService],
})
export class HttpRequestModule {}
