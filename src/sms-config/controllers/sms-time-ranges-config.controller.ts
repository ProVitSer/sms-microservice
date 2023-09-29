import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { SmsConfigService } from '../services/sms-config.service';
import { UUIDParam } from '../../decorators/uuid-param.decorator';
import { SmsTimeRangesConfignDto } from '../dto/sms-time-range-config.dto';

@Controller('sms-time-ranges-config')
export class SmsTimeRangesConfigController {
    constructor(private readonly smsConfigService: SmsConfigService) {}

    @Post()
    async addTimeRange(@Body() body: SmsTimeRangesConfignDto) {
        return await this.smsConfigService.addTimeRange(body);
    }

    @Get(':clientId')
    async getClientTimeRanges(@UUIDParam('clientId') clientId: string) {
        return await this.smsConfigService.getClientTimeRanges(clientId);
    }

    @Delete(':rangeId')
    async deleteRange(@UUIDParam('rangeId') rangeId: string) {
        return await this.smsConfigService.deleteRange(rangeId);
    }
}
