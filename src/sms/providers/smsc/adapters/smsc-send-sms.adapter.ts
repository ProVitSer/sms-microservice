import { SmsClientConfig, SmscConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsProviderConfig } from '@app/sms-config/schemas/sms-provider-config.schema';
import { BaseSendSmsDataAdapter } from '@app/sms/adapters/base-send-sms-data.adapter';
import { SendSmsMsgData } from '@app/sms/interfaces/sms.interfaces';
import { SmscSendSmsData } from '../interfaces/smsc.interfaces';
import { v1 } from 'uuid';
import { ResponseFormat } from '../interfaces/smsc.enum';

export class SmscSendSmsDataAdapter extends BaseSendSmsDataAdapter {
    private readonly smscConfig: SmscConfig;
    public readonly requestData: SmscSendSmsData;
    public readonly smsId: string;
    constructor(data: SendSmsMsgData, config: SmsClientConfig) {
        super(data, config);
        this.smsId = v1();
        this.smscConfig = config.smsProviderConfig as Required<Pick<SmsProviderConfig, 'login' | 'password'>>;
        const sender = this.sender !== 'default' ? { sender: this.sender } : {};
        this.requestData = {
            login: this.smscConfig.login,
            psw: this.smscConfig.password,
            phones: this.externalNumber,
            mes: this.smsText,
            id: this.smsId,
            ...sender,
            fmt: ResponseFormat.json,
        };
    }
}
