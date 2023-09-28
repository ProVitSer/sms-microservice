import { SmscConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsProviderConfig } from '@app/sms-config/schemas/sms-provider-config.schema';
import { BaseSendSmsDataAdapter } from '@app/sms/adapters/base-send-sms-data.adapter';
import { SmscSendSmsData } from '../interfaces/smsc.interfaces';
import { v1 } from 'uuid';
import { ResponseFormat } from '../interfaces/smsc.enum';
import { BaseSendApiSmsDataAdapter } from '@app/sms/adapters/base-send-api-sms-data.asapter';

export class SmscSendSmsDataAdapter {
    private readonly smscConfig: SmscConfig;
    public requestData: SmscSendSmsData;
    public readonly smsId: string;
    public readonly dataAdapter: BaseSendSmsDataAdapter | BaseSendApiSmsDataAdapter;
    constructor(dataAdapter: BaseSendSmsDataAdapter | BaseSendApiSmsDataAdapter) {
        this.dataAdapter = dataAdapter;
        this.smsId = v1();
        this.smscConfig = dataAdapter.clientConfig.smsProviderConfig as Required<Pick<SmsProviderConfig, 'login' | 'password'>>;
        const sender = dataAdapter.sender !== 'default' ? { sender: dataAdapter.sender } : {};
        this.requestData = {
            login: this.smscConfig.login,
            psw: this.smscConfig.password,
            phones: dataAdapter.externalNumber,
            mes: dataAdapter.smsText,
            id: this.smsId,
            ...sender,
            fmt: ResponseFormat.json,
        };
    }
}
