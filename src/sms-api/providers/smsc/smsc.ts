import { Injectable } from '@nestjs/common';
import { SmscSendSmsDataAdapter } from './adapters/smsc-send-sms-data.adapter';
import { SmscApiService } from './smsc-api.service';
import { SmscSendSmsResultAdapter } from './adapters/smsc-send-sms-result.adapter';
import { SmsApiProvider } from '@app/sms-api/services/sms-api.provider';
import { BaseApiSendSmsDataAdapter } from '@app/sms-api/adapters/base-api-send-sms-data.adapter';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms-api/adapters/base-check-sms-status-data.adapter';
import { SmscCheckStatusDataAdapter } from './adapters/smsc-check-status-data.adapter';
import { SmscCheckStatusResultAdapter } from './adapters/smsc-check-status-result.adapter';
import { SendSmsResultDataAdapter } from '@app/sms-api/adapters/send-sms-result-data.adapter';
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';
import { BaseMassSendSmsDataAdapter } from '@app/sms-api/adapters/base-mass-send-sms-data.adapter';
import { SendMassSmsResultDataAdapter } from '@app/sms-api/adapters/send-mass-sms-result-data.adapter';
import { SmscSendSmsJobDataAdapter } from './adapters/smsc-send-sms-job-data.adapter';
import { SmscSendSmsJobResultAdapter } from './adapters/smsc-send-sms-job-result.adapter';
import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { IncomingSmsSendingResult } from '@app/sms-api/interfaces/sms-api.interfaces';

@Injectable()
export class Smsc extends SmsApiProvider {
    constructor(private readonly smscApiService: SmscApiService) {
        super();
    }
    public async smsSending(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter> {
        const data = new SmscSendSmsDataAdapter(dataAdapter);

        const result = await this.smscApiService.sendSmscSms(data.requestData);

        return new SmscSendSmsResultAdapter(data, result);
    }

    public async checkStatusSendingSms(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter> {
        const result = await this.smscApiService.checkStatus(new SmscCheckStatusDataAdapter(dataAdapter).requestParams);

        return new SmscCheckStatusResultAdapter(dataAdapter, result);
    }

    public async massSmsSending(dataAdapter: BaseMassSendSmsDataAdapter): Promise<SendMassSmsResultDataAdapter> {
        const result = await this.smscApiService.sendJobs(new SmscSendSmsJobDataAdapter(dataAdapter).requestParams);
        return new SmscSendSmsJobResultAdapter(dataAdapter, result);
    }

    public async checkConnetion(clientConfig: SmsClientConfig): Promise<any> {
        throw new Error('Method not implemented.');
    }

    public async parseSmsSendingResult(result: IncomingSmsSendingResult, clientId: string): Promise<CheckSmsStatusResultDataAdapter> {
        throw new Error('Method not implemented.');
    }
}
