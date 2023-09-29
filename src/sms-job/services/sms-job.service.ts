import { Injectable } from '@nestjs/common';
import { AddSmsJobDto } from '../dto/add-sms-job.dto';
import { SmsJobModelService } from './sms-job-model.service';
import { SmsJob } from '../sms-job.schema';
import SmsJobIdNotFoundException from '../exceptions/sms-job-id-not-found.exeption';
import ClientJobsNotFoundException from '../exceptions/client-jobs-not-found.exeption';
import { AddNewSmsJobDataAdapter } from '../adapters/add-new-sms-job-data.adapter';
import { UpdateSmsJobDto } from '../dto/update-sms-job.dto';
import { UpdateSmsJobAdapter } from '../adapters/update-sms-job.adapter';

@Injectable()
export class SmsJobService {
    constructor(private readonly smsJobModelService: SmsJobModelService) {}

    public async addSmsJob(data: AddSmsJobDto): Promise<SmsJob> {
        try {
            return await this.smsJobModelService.create(new AddNewSmsJobDataAdapter(data));
        } catch (e) {
            throw e;
        }
    }

    public async getSmsJob(smsJobId: string): Promise<SmsJob> {
        const smsJob = await this.smsJobModelService.findOne({ smsJobId, deleted: false });

        if (!smsJob) throw new SmsJobIdNotFoundException(smsJobId);

        return smsJob;
    }

    public async getClientJob(clientId: string): Promise<SmsJob[]> {
        const smsJobs = await this.smsJobModelService.find({ clientId, deleted: false });

        if (!smsJobs) throw new ClientJobsNotFoundException(clientId);

        return smsJobs;
    }

    public async deleteSmsJob(smsJobId: string): Promise<void> {
        await this.getSmsJob(smsJobId);
        await this.smsJobModelService.updateOne({ smsJobId }, { deleted: true });
    }

    public async updateSmsJob(smsJobId: string, smsJob: UpdateSmsJobDto): Promise<SmsJob> {
        const smsJobResult = await this.smsJobModelService.update(smsJobId, new UpdateSmsJobAdapter(smsJob));

        if (!smsJobResult) throw new SmsJobIdNotFoundException(smsJobId);

        return smsJobResult;
    }
}
