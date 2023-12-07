import { Injectable } from '@nestjs/common';
import { SmscApiService } from './smsc-api.service';
import { SmsApiProvider } from '@app/sms-api/services/sms-api.provider';
import { CheckConnectionSmsProviderResult, IncomingSmsSendingResult } from '@app/sms-api/interfaces/sms-api.interfaces';
import {
    BaseApiSendSmsDataAdapter,
    BaseCheckSmsStatusDataAdapter,
    BaseMassSendSmsDataAdapter,
    CheckSmsStatusResultDataAdapter,
    SendMassSmsResultDataAdapter,
    SendSmsResultDataAdapter,
} from '@app/sms-api/adapters';
import {
    SmscCheckStatusDataAdapter,
    SmscCheckStatusResultAdapter,
    SmscSendSmsDataAdapter,
    SmscSendSmsJobDataAdapter,
    SmscSendSmsJobResultAdapter,
    SmscSendSmsResultAdapter,
} from './adapters';
import { ResponseFormat } from './interfaces/smsc.enum';
import { SmsProviderConfig } from '@app/sms-config/schemas/sms-provider-config.schema';

@Injectable()
export class Smsc extends SmsApiProvider {
    constructor(private readonly smscApiService: SmscApiService) {
        super();
    }
    public async smsSending(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter> {
        const data = new SmscSendSmsDataAdapter(dataAdapter);

        const result = await this.smscApiService.sendSms(data.requestData);

        return new SmscSendSmsResultAdapter(data, result);
    }

    public async checkStatusSendingSms(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter> {
        const result = await this.smscApiService.checkSmsStatus(new SmscCheckStatusDataAdapter(dataAdapter).requestParams);

        return new SmscCheckStatusResultAdapter(dataAdapter, result);
    }

    public async massSmsSending(dataAdapter: BaseMassSendSmsDataAdapter): Promise<SendMassSmsResultDataAdapter> {
        const result = await this.smscApiService.sendSmsJobs(new SmscSendSmsJobDataAdapter(dataAdapter).requestParams);
        return new SmscSendSmsJobResultAdapter(dataAdapter, result);
    }

    public async checkAuthorisation(smsProviderConfig: SmsProviderConfig): Promise<CheckConnectionSmsProviderResult> {
        const { login, password } = smsProviderConfig;

        const result = await this.smscApiService.checkBalance({ login, psw: password, fmt: ResponseFormat.json });

        return { result: !!result?.balance };
    }

    public async parseSmsSendingResult(result: IncomingSmsSendingResult, clientId: string): Promise<CheckSmsStatusResultDataAdapter> {
        throw new Error('Method not implemented.');
    }
}
