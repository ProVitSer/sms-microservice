import { BaseApiSendSmsDataAdapter } from '@app/sms-api/adapters/base-api-send-sms-data.adapter';
import { SmsAeroSendSmsData } from '../interfaces/sms-aero.interfaces';
import { SmsUtils } from '@app/utils/sms.utils';
import { DEFAULT_SENDER_NAME } from '../sms-aero.config';

export class SmsAeroSendSmsDataAdapter {
    public requestData: SmsAeroSendSmsData;
    public readonly dataAdapter: BaseApiSendSmsDataAdapter;
    constructor(dataAdapter: BaseApiSendSmsDataAdapter) {
        this.dataAdapter = dataAdapter;
        const sign = dataAdapter.sender !== 'default' ? { sign: dataAdapter.sender } : { sign: DEFAULT_SENDER_NAME };
        const smsApiUrl = SmsUtils.getSmsApiUrl();
        this.requestData = {
            number: this.dataAdapter.externalNumber,
            ...sign,
            text: this.dataAdapter.smsText,
            callbackUrl: `${smsApiUrl}/${this.dataAdapter.clientConfig.smsProviderConfig.smsApiProvider}/${this.dataAdapter.clientId}`,
        };
    }
}
