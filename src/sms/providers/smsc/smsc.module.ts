import { Module } from '@nestjs/common';
import { Smsc } from './smsc';
import { SmscService } from './smsc.service';
import { HttpRequestModule } from '@app/http-request/http.module';

@Module({
    imports: [HttpRequestModule],
    providers: [Smsc, SmscService],
    exports: [Smsc],
})
export class SmscModule {}
