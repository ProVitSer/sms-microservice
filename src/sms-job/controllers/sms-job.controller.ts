import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UUIDParam } from '@app/decorators/uuid-param.decorator';
import { AddSmsJobDto } from '../dto/add-sms-job.dto';
import { SmsJobService } from '../services/sms-job.service';
import { UpdateSmsJobDto } from '../dto/update-sms-job.dto';

@Controller('sms-job')
export class SmsJobController {
    constructor(private readonly smsJobService: SmsJobService) {}

    @Post()
    async addSmsJob(@Body() body: AddSmsJobDto) {
        return this.smsJobService.addSmsJob(body);
    }

    @Get(':smsJobId')
    async getSmsJob(@UUIDParam('smsJobId') smsJobId: string) {
        return this.smsJobService.getSmsJob(smsJobId);
    }

    @Get('client-jobs/:clientId')
    async getClientJob(@UUIDParam('clientId') clientId: string) {
        return this.smsJobService.getClientJob(clientId);
    }

    @Delete(':smsJobId')
    async deleteSmsJob(@UUIDParam('smsJobId') smsJobId: string) {
        return this.smsJobService.deleteSmsJob(smsJobId);
    }

    @Patch(':smsJobId')
    async updateSmsJob(@UUIDParam('smsJobId') smsJobId: string, @Body() smsJob: UpdateSmsJobDto) {
        return this.smsJobService.updateSmsJob(smsJobId, smsJob);
    }
}
