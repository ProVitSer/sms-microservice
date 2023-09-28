import { BaseCheckSmsStatusDataAdapter } from '@app/sms/adapters/base-check-sms-status-data.adapter';
import { SmsCheckSmsStatusParams } from '../interfaces/smsc.interfaces';
import { ResponseFormat } from '../interfaces/smsc.enum';

export class SmscCheckStatusDataAdapter {
    public requestParams: SmsCheckSmsStatusParams;
    constructor(dataAdapter: BaseCheckSmsStatusDataAdapter) {
        this.requestParams = {
            id: dataAdapter.smsData.smsId,
            login: dataAdapter.clientConfig.smsProviderConfig.login,
            psw: dataAdapter.clientConfig.smsProviderConfig.password,
            phone: dataAdapter.smsData.externalNumber,
            fmt: ResponseFormat.json,
        };
    }
}
