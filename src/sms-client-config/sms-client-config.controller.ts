import { SmsMessagePatternCmd } from '@app/platform-types/client-proxy/types';
import { Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSmsConfignDto } from './dtos/create-sms-config.dto';
import { CreateSmsClientConfig } from '@app/platform-types/sms/interfaces';

@Controller('sms-client-config')
export class SmsClientCinfigController {
    constructor() {}

    @MessagePattern({ cmd: SmsMessagePatternCmd.createSmsClientConfig })
    async create(@Payload() data: CreateSmsConfignDto): Promise<CreateSmsClientConfig> {}
}
