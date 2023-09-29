import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UUIDParam } from '@app/decorators/uuid-param.decorator';

@Controller('sms-job')
export class SmsJobController {
    constructor() {}

    @Post('job')
    async addSendJob(@Body() body: any) {}

    @Get('job/:smsJobId')
    async getSmsJob(@UUIDParam('smsJobId') smsJobId: string) {}

    @Delete('job/:smsJobId')
    async deleteSmsJob(@UUIDParam('smsJobId') smsJobId: string) {}
}
