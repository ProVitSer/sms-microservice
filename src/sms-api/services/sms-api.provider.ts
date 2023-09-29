import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { BaseApiSendSmsDataAdapter } from '../adapters/base-api-send-sms-data.adapter';
import { SendSmsResultDataAdapter } from '../adapters/send-sms-result-data.adapter';
import { SmsData } from '../interfaces/sms-api.interfaces';
import { BaseCheckSmsStatusDataAdapter } from '../adapters/base-check-sms-status-data.adapter';
import { Sms } from '@app/sms/sms.schema';
import { CheckSmsStatusResultDataAdapter } from '../adapters/check-sms-status-result-data.adapter';

export abstract class SmsApiProvider {
    protected abstract send(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter>;
    protected abstract checkStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter>;
    // protected abstract massSmsSending(): Promise<any>;

    public async sendSms(smsData: SmsData): Promise<SendSmsResultDataAdapter> {
        try {
            return await this.send(new BaseApiSendSmsDataAdapter(smsData));
        } catch (e) {
            throw e;
        }
    }

    public async checkSmsStatus(smsData: Sms, clientConfig: SmsClientConfig): Promise<CheckSmsStatusResultDataAdapter> {
        try {
            return await this.checkStatus(new BaseCheckSmsStatusDataAdapter(smsData, clientConfig));
        } catch (e) {
            throw e;
        }
    }
}
