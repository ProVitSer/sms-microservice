import { SmscCheckSmsStatusParams } from '../interfaces/smsc.interfaces';
import { ResponseFormat } from '../interfaces/smsc.enum';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms-api/adapters/base-check-sms-status-data.adapter';

export class SmscCheckStatusDataAdapter {
    public requestParams: SmscCheckSmsStatusParams;
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
