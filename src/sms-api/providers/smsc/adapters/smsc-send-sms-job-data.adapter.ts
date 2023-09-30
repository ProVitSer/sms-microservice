import { BaseMassSendSmsDataAdapter } from '@app/sms-api/adapters/base-mass-send-sms-data.adapter';
import { SendSmsJob } from '../interfaces/smsc.interfaces';
import { SmscConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsProviderConfig } from '@app/sms-config/schemas/sms-provider-config.schema';
import { AddType, CharsetType, ResponseFormat } from '../interfaces/smsc.enum';

export class SmscSendSmsJobDataAdapter {
    private readonly smscConfig: SmscConfig;
    public requestParams: SendSmsJob;
    constructor(public dataAdapter: BaseMassSendSmsDataAdapter) {
        this.smscConfig = dataAdapter.clientConfig.smsProviderConfig as Required<Pick<SmsProviderConfig, 'login' | 'password'>>;
        const sender = dataAdapter.sender !== 'default' ? { sender: dataAdapter.sender } : {};
        this.requestParams = {
            add: AddType.add,
            login: this.smscConfig.login,
            psw: this.smscConfig.password,
            name: dataAdapter.name,
            phones: this.formatPhones(),
            mes: dataAdapter.smsText,
            ...sender,
            fmt: ResponseFormat.json,
            charset: CharsetType.utf,
        };
    }

    private formatPhones(): string {
        return this.dataAdapter.sendSmsInfo.map((s) => s.number).join(',');
    }
}
