import { SmsApiProvider } from '@app/sms-api/services/sms-api.provider';
import { Injectable } from '@nestjs/common';
import { BaseApiSendSmsDataAdapter } from '@app/sms-api/adapters/base-api-send-sms-data.adapter';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms-api/adapters/base-check-sms-status-data.adapter';
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';
import { BaseMassSendSmsDataAdapter } from '@app/sms-api/adapters/base-mass-send-sms-data.adapter';
import { SendMassSmsResultDataAdapter } from '@app/sms-api/adapters/send-mass-sms-result-data.adapter';
import { SmsAeroSendSmsDataAdapter } from './adapters/sms-aero-send-sms-data.adapter';
import { SmsAeroApiService } from './sms-aero-api.service';
import { SmsAeroSendSmsResultAdapter } from './adapters/sms-aero-send-sms-result.adapter';
import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsAeroCallbackSendingResult } from './interfaces/sms-aero.interfaces';
import { SmsAeroParseSmsSendingResultAdapter } from './adapters/sms-aero-parse-sms-sending-result.adapter';

@Injectable()
export class SmsAero extends SmsApiProvider {
    constructor(private readonly smsAeroApiService: SmsAeroApiService) {
        super();
    }

    public async smsSending(dataAdapter: BaseApiSendSmsDataAdapter): Promise<any> {
        const data = new SmsAeroSendSmsDataAdapter(dataAdapter);

        const result = await this.smsAeroApiService.sendSmsAeroSms(data.requestData, dataAdapter.clientConfig);

        return new SmsAeroSendSmsResultAdapter(data, result);
    }

    public async parseSmsSendingResult(
        resultSending: SmsAeroCallbackSendingResult,
        clientId: string,
    ): Promise<CheckSmsStatusResultDataAdapter> {
        return new SmsAeroParseSmsSendingResultAdapter(resultSending, clientId);
    }

    public async checkStatusSendingSms(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter> {
        throw new Error('Method not implemented.');
    }

    public async massSmsSending(dataAdapter: BaseMassSendSmsDataAdapter): Promise<SendMassSmsResultDataAdapter> {
        throw new Error('Method not implemented.');
    }

    public async checkConnetion(clientConfig: SmsClientConfig): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
