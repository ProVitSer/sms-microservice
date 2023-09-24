import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SmsConfigService } from '../services/sms-config.service';
import { UUIDParam } from '../decorators/uuid-param.decorator';
import { SmsConfignDto } from '../dto/sms-config.dto';
import { SmsConfignActivateDto } from '../dto/sms-config-active.dto';

@Controller('sms-config')
export class SmsConfigController {
    constructor(private readonly smsConfigService: SmsConfigService) {}

    @Post()
    async addSmsConfig(@Body() body: SmsConfignDto) {
        return await this.smsConfigService.addSmsConfig(body);
    }

    @Get(':clientId')
    async getClientConfig(@UUIDParam('clientId') clientId: string) {
        return await this.smsConfigService.getClientConfig(clientId);
    }

    @Delete(':clientId')
    async deleteConfig(@UUIDParam('clientId') clientId: string) {
        return await this.smsConfigService.deleteConfig(clientId);
    }

    @HttpCode(HttpStatus.OK)
    @Post('active')
    async activateConfig(@Body() body: SmsConfignActivateDto) {
        return await this.smsConfigService.modifyActive(body);
    }
}
