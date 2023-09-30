import { Module } from '@nestjs/common';
import { Smsc } from './smsc';
import { SmscApiService } from './smsc-api.service';
import { HttpRequestModule } from '@app/http-request/http.module';

@Module({
    imports: [HttpRequestModule],
    providers: [Smsc, SmscApiService],
    exports: [Smsc],
})
export class SmscModule {}
