import { Injectable } from '@nestjs/common';
import { AddSmsJobDto } from '../dto/add-sms-job.dto';
import { SmsJobModelService } from './sms-job-model.service';
import { SmsJob } from '../sms-job.schema';
import SmsJobIdNotFoundException from '../exceptions/sms-job-id-not-found.exeption';
import ClientJobsNotFoundException from '../exceptions/client-jobs-not-found.exeption';
import { AddNewSmsJobDataAdapter } from '../adapters/add-new-sms-job-data.adapter';
import { UpdateSmsJobDto } from '../dto/update-sms-job.dto';
import { UpdateSmsJobAdapter } from '../adapters/update-sms-job.adapter';
import { SmsJobStatus } from '../interfaces/sms-job.enum';
import { CacheService } from '@app/cache/cache.service';
import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { CLIENT_NOT_ACTIVE } from '../sms-job.consts';
import { SmsApiProviderService } from '@app/sms-api/services/sms-api-provider.service';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { ResultUpdateSmsJobAdapter } from '../adapters/result-update-sms-job.adapter';
import ClientNotFoundException from '../exceptions/client-not-found.exeption';

@Injectable()
export class SmsJobService {
    constructor(
        private readonly smsJobModelService: SmsJobModelService,
        private readonly cacheService: CacheService,
        private readonly log: AppLoggerService,
        private readonly smsApiProviderService: SmsApiProviderService,
    ) {}

    public async addSmsJob(data: AddSmsJobDto): Promise<SmsJob> {
        try {
            const clientConfig = await this.getClientConfig(data.clientId);

            if (!clientConfig) throw new ClientNotFoundException(data.clientId);

            return await this.smsJobModelService.create(new AddNewSmsJobDataAdapter(data, clientConfig));
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

    public async startSmsJob() {
        try {
            const smsJobs = await this.findMessagesToSend(new Date().toISOString());
            console.log(smsJobs);

            if (smsJobs.length == 0) return;

            for (const smsJob of smsJobs) {
                await this.setInProgress(smsJob);

                const clientConfig = await this.getClientConfig(smsJob.clientId);

                await this.checkClientConfig(smsJob, clientConfig);

                await this.sendMassSms(smsJob, clientConfig);
            }
        } catch (e) {
            throw e;
        }
    }

    private async sendMassSms(smsJob: SmsJob, clientConfig: SmsClientConfig): Promise<void> {
        const provider = this.smsApiProviderService.getProvider(clientConfig.smsProviderConfig.smsApiProvider);

        const result = await provider.sendMassSms(smsJob, clientConfig);

        await this.smsJobModelService.update(result.smsJobId, new ResultUpdateSmsJobAdapter(result));
    }

    private async findMessagesToSend(currentTime: string): Promise<SmsJob[]> {
        return await this.smsJobModelService.find({ status: SmsJobStatus.planned, sendTime: { $lte: currentTime } });
    }

    private async setInProgress(smsJob: SmsJob): Promise<void> {
        await this.smsJobModelService.updateOne({ smsJobId: smsJob.smsJobId }, { status: SmsJobStatus.inProgress });
    }

    private async getClientConfig(clientId: string): Promise<SmsClientConfig | undefined> {
        return await this.cacheService.get<SmsClientConfig>(clientId);
    }

    private async checkClientConfig(smsJob: SmsJob, clientConfig: SmsClientConfig | undefined): Promise<void> {
        if (!clientConfig && !clientConfig.isActive)
            throw await this.smsJobModelService.updateOne(
                { smsJobId: smsJob.smsJobId },
                { status: SmsJobStatus.apiFail, result: CLIENT_NOT_ACTIVE },
            );
    }
}
