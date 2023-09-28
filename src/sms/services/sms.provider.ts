import { BaseSendSmsDataAdapter } from '../adapters/base-send-sms-data.adapter';
import { ResultSendSmsDataAdapter } from '../adapters/result-send-sms-data.adapter';
import { BaseCheckSmsStatusDataAdapter } from '../adapters/base-check-sms-status-data.adapter';
import { BaseSendApiSmsDataAdapter } from '../adapters/base-send-api-sms-data.asapter';

export abstract class SmsProvider {
    protected abstract send(dataAdapter: BaseSendSmsDataAdapter): Promise<ResultSendSmsDataAdapter>;
    protected abstract checkStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<ResultSendSmsDataAdapter>;
    protected abstract apiSend(dataAdapter: BaseSendApiSmsDataAdapter): Promise<ResultSendSmsDataAdapter>;
    // protected abstract massSmsSending(): Promise<any>;

    public async sendSms(dataAdapter: BaseSendSmsDataAdapter): Promise<ResultSendSmsDataAdapter> {
        try {
            return await this.send(dataAdapter);
        } catch (e) {
            throw e;
        }
    }

    public async checkSmsStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<ResultSendSmsDataAdapter> {
        try {
            return await this.checkStatus(dataAdapter);
        } catch (e) {
            throw e;
        }
    }

    public async sendApiSms(data: BaseSendApiSmsDataAdapter): Promise<ResultSendSmsDataAdapter> {
        try {
            return await this.apiSend(data);
        } catch (e) {
            throw e;
        }
    }
}
