import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { BaseApiSendSmsDataAdapter } from '../adapters/base-api-send-sms-data.adapter';
import { SendSmsResultDataAdapter } from '../adapters/send-sms-result-data.adapter';
import { SmsData } from '../interfaces/sms-api.interfaces';
import { BaseCheckSmsStatusDataAdapter } from '../adapters/base-check-sms-status-data.adapter';
import { Sms } from '@app/sms/sms.schema';
import { CheckSmsStatusResultDataAdapter } from '../adapters/check-sms-status-result-data.adapter';
import { SmsJob } from '@app/sms-job/sms-job.schema';
import { BaseMassSendSmsDataAdapter } from '../adapters/base-mass-send-sms-data.adapter';
import { SendMassSmsResultDataAdapter } from '../adapters/send-mass-sms-result-data.adapter';

export abstract class SmsApiProvider {
    protected abstract smsSending(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter>;
    protected abstract checkStatusSendingSms(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter>;
    protected abstract massSmsSending(dataAdapter: BaseMassSendSmsDataAdapter): Promise<SendMassSmsResultDataAdapter>;

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

    public async sendMassSms(smsJob: SmsJob, clientConfig: SmsClientConfig) {
        try {
            return await this.massSmsSending(new BaseMassSendSmsDataAdapter(smsJob, clientConfig));
        } catch (e) {
            throw e;
        }
    }
}
