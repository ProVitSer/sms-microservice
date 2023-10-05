import { BaseApiSendSmsDataAdapter, BaseMassSendSmsDataAdapter } from '@app/sms-api/adapters';
import { SmsAeroSendSmsData } from '../interfaces/sms-aero.interfaces';
import { DEFAULT_SENDER_NAME } from '../sms-aero.config';
import { SmsUtils } from '@app/utils/sms.utils';
import { SendSmsInfo } from '@app/sms-job/sms-job.schema';

export class SmsAeroBaseSendDataAdapter {
    static single(dataAdapter: BaseApiSendSmsDataAdapter): SmsAeroSendSmsData {
        return this.getBaseRequestInfo(dataAdapter, SmsUtils.getSmsApiUrl());
    }

    static mass(dataAdapter: BaseMassSendSmsDataAdapter): SmsAeroSendSmsData {
        return this.getBaseRequestInfo(dataAdapter, SmsUtils.getSmsJobApiUrl());
    }

    private static getBaseRequestInfo(
        dataAdapter: BaseApiSendSmsDataAdapter | BaseMassSendSmsDataAdapter,
        apiUrl: string,
    ): SmsAeroSendSmsData {
        const sign = dataAdapter.sender !== 'default' ? { sign: dataAdapter.sender } : { sign: DEFAULT_SENDER_NAME };
        return {
            ...this.getNumbersInfo(dataAdapter),
            ...sign,
            text: dataAdapter.smsText,
            callbackUrl: `${apiUrl}/${dataAdapter.clientConfig.smsProviderConfig.smsApiProvider}/${dataAdapter.clientId}`,
        };
    }

    private static getNumbersInfo(dataAdapter: BaseApiSendSmsDataAdapter | BaseMassSendSmsDataAdapter) {
        if (dataAdapter instanceof BaseApiSendSmsDataAdapter) {
            return {
                number: dataAdapter.externalNumber,
            };
        }
        return {
            numbers: dataAdapter.sendSmsInfo.map((i: SendSmsInfo) => i.number),
        };
    }
}
