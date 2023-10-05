import { SmsApiProvider } from '@app/sms-api/services/sms-api.provider';
import { Injectable } from '@nestjs/common';
import { SmsAeroApiService } from './sms-aero-api.service';
import { SmsAeroBaseResponse, SmsAeroCallbackSendingResult, SmsAeroSendSmsResponse } from './interfaces/sms-aero.interfaces';
import { SMS_AERO_STATUS_DESCRIPTION, SMS_AERO_STATUS_TO_SMS_STATUS } from './sms-aero.consts';
import {
    SmsAeroBaseSendDataAdapter,
    SmsAeroParseSmsSendingResultAdapter,
    SmsAeroSendSmsJobResultAdapter,
    SmsAeroSendSmsResultAdapter,
} from './adapters';
import {
    BaseApiSendSmsDataAdapter,
    BaseCheckSmsStatusDataAdapter,
    BaseMassSendSmsDataAdapter,
    CheckSmsStatusResultDataAdapter,
    SendMassSmsResultDataAdapter,
    SendSmsResultDataAdapter,
} from '@app/sms-api/adapters';
import { CheckConnectionSmsProviderResult } from '@app/sms-api/interfaces/sms-api.interfaces';
import { SmsProviderConfig } from '@app/sms-config/schemas/sms-provider-config.schema';

@Injectable()
export class SmsAero extends SmsApiProvider {
    constructor(private readonly smsAeroApiService: SmsAeroApiService) {
        super();
    }

    public async smsSending(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter> {
        const data = SmsAeroBaseSendDataAdapter.single(dataAdapter);

        const result = await this.smsAeroApiService.sendSmsAeroSms<SmsAeroBaseResponse<SmsAeroSendSmsResponse>>(
            data,
            dataAdapter.clientConfig,
        );

        return new SmsAeroSendSmsResultAdapter(dataAdapter, result);
    }

    public async parseSmsSendingResult(
        resultSending: SmsAeroCallbackSendingResult,
        clientId: string,
    ): Promise<CheckSmsStatusResultDataAdapter> {
        return new SmsAeroParseSmsSendingResultAdapter(resultSending, clientId);
    }

    public async checkStatusSendingSms(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter> {
        const result = await this.smsAeroApiService.checkStatus({ id: Number(dataAdapter.smsData.smsId) }, dataAdapter.clientConfig);

        return new CheckSmsStatusResultDataAdapter({
            status: SMS_AERO_STATUS_TO_SMS_STATUS[result.data.status],
            clientId: dataAdapter.smsData.clientId,
            smsId: dataAdapter.smsData.smsId,
            result: SMS_AERO_STATUS_DESCRIPTION[result.data.status],
        });
    }

    public async massSmsSending(dataAdapter: BaseMassSendSmsDataAdapter): Promise<any> {
        const data = SmsAeroBaseSendDataAdapter.mass(dataAdapter);

        const result = await this.smsAeroApiService.sendSmsAeroSms<SmsAeroBaseResponse<SmsAeroSendSmsResponse[]>>(
            data,
            dataAdapter.clientConfig,
        );

        return new SmsAeroSendSmsJobResultAdapter(dataAdapter, result);
    }

    public async checkAuthorisation(smsProviderConfig: SmsProviderConfig): Promise<CheckConnectionSmsProviderResult> {
        const result = await this.smsAeroApiService.checkAuth(smsProviderConfig);

        return { result: !!result.success };
    }
}
