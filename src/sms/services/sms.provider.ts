import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { BaseSendSmsDataAdapter } from '../adapters/base-send-sms-data.adapter';
import { SendSmsMsgData } from '../interfaces/sms.interfaces';
import { ResultSendSmsDataAdapter } from '../adapters/result-send-sms-data.adapter';
import { BaseCheckSmsStatusDataAdapter } from '../adapters/base-check-sms-status-data.adapter';

export abstract class SmsProvider {
    protected abstract getSmsDataAdapter(data: SendSmsMsgData, config: SmsClientConfig): Promise<BaseSendSmsDataAdapter>;
    protected abstract send(dataAdapter: BaseSendSmsDataAdapter): Promise<ResultSendSmsDataAdapter>;
    protected abstract checkSmsStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<ResultSendSmsDataAdapter>;

    public async sendSms(data: SendSmsMsgData, config: SmsClientConfig): Promise<ResultSendSmsDataAdapter> {
        try {
            const dataAdapter = await this.getSmsDataAdapter(data, config);
            return await this.send(dataAdapter);
        } catch (e) {
            throw e;
        }
    }
}
