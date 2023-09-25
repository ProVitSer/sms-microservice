import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { BaseSmsDataAdapter } from '../adapters/base-sms-data.adapter';
import { SmsMsgData } from '../interfaces/sms.interfaces';
import { ResultSendSmsDataAdapter } from '../adapters/result-send-sms-data.adapter';

export abstract class SmsSender {
    protected abstract getSmsDataAdapter(data: SmsMsgData, config: SmsClientConfig): Promise<BaseSmsDataAdapter>;
    protected abstract send(dataAdapter: BaseSmsDataAdapter): Promise<ResultSendSmsDataAdapter>;

    public async sendSms(data: SmsMsgData, config: SmsClientConfig): Promise<ResultSendSmsDataAdapter> {
        try {
            const dataAdapter = this.getSmsDataAdapter(data, config);
            return await this.send(dataAdapter);
        } catch (e) {
            throw e;
        }
    }
}
