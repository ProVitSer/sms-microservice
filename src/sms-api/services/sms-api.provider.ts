import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { CheckConnectionSmsProviderResult, IncomingSmsSendingResult, SmsData } from '../interfaces/sms-api.interfaces';
import { Sms } from '@app/sms/sms.schema';
import { CheckSmsStatusResultDataAdapter } from '../adapters/check-sms-status-result-data.adapter';
import { SmsJob } from '@app/sms-job/sms-job.schema';
import {
    BaseApiSendSmsDataAdapter,
    BaseCheckSmsStatusDataAdapter,
    BaseMassSendSmsDataAdapter,
    SendMassSmsResultDataAdapter,
    SendSmsResultDataAdapter,
} from '../adapters';
import { SmsProviderConfig } from '@app/sms-config/schemas/sms-provider-config.schema';

export abstract class SmsApiProvider {
    protected abstract smsSending(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter>;
    protected abstract checkStatusSendingSms(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter>;
    protected abstract massSmsSending(dataAdapter: BaseMassSendSmsDataAdapter): Promise<SendMassSmsResultDataAdapter>;
    protected abstract parseSmsSendingResult(result: IncomingSmsSendingResult, clientId: string): Promise<CheckSmsStatusResultDataAdapter>;
    protected abstract checkAuthorisation(smsProviderConfig: SmsProviderConfig): Promise<CheckConnectionSmsProviderResult>;

    public async sendSms(smsData: SmsData): Promise<SendSmsResultDataAdapter> {
        try {
            return await this.smsSending(new BaseApiSendSmsDataAdapter(smsData));
        } catch (e) {
            throw e;
        }
    }

    public async checkSmsStatus(smsData: Sms, clientConfig: SmsClientConfig): Promise<CheckSmsStatusResultDataAdapter> {
        try {
            return await this.checkStatusSendingSms(new BaseCheckSmsStatusDataAdapter(smsData, clientConfig));
        } catch (e) {
            throw e;
        }
    }

    public async sendMassSms(smsJob: SmsJob, clientConfig: SmsClientConfig): Promise<SendMassSmsResultDataAdapter> {
        try {
            return await this.massSmsSending(new BaseMassSendSmsDataAdapter(smsJob, clientConfig));
        } catch (e) {
            throw e;
        }
    }

    public async parseSmsResult(result: IncomingSmsSendingResult, clientId: string): Promise<CheckSmsStatusResultDataAdapter> {
        try {
            return await this.parseSmsSendingResult(result, clientId);
        } catch (e) {
            throw e;
        }
    }

    public async checkAuthorisationSmsProvider(smsProviderConfig: SmsProviderConfig): Promise<CheckConnectionSmsProviderResult> {
        try {
            return await this.checkAuthorisation(smsProviderConfig);
        } catch (e) {
            throw e;
        }
    }
}
