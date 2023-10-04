import { SendSmsResultDataAdapter } from '@app/sms-api/adapters/send-sms-result-data.adapter';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsStatus, SmsSendType } from '@app/sms/interfaces/sms.enum';
import { SmsAeroBaseResponse, SmsAeroSendSmsResponse } from '../interfaces/sms-aero.interfaces';
import { SmsAeroSendSmsDataAdapter } from './sms-aero-send-sms-data.adapter';
import { SMS_AERO_STATUS_DESCRIPTION, SMS_AERO_STATUS_TO_SMS_STATUS, UNKNOWN_ERROR, UNKNOWN_RESULT } from '../sms-aero.consts';
import { v1 } from 'uuid';

export class SmsAeroSendSmsResultAdapter implements SendSmsResultDataAdapter {
    public status: SmsStatus;
    public smsApiProviderType: SmsApiProviderType;
    public clientId: string;
    public smsId: string;
    public externalNumber: string;
    public smsText: string;
    public result: string;
    public sender: string;
    public smsSendType: SmsSendType;
    constructor(private smsData: SmsAeroSendSmsDataAdapter, private sendSmsResponse: SmsAeroBaseResponse<SmsAeroSendSmsResponse>) {
        const result = this.checkResult();
        this.status = result.status;
        this.smsId = String(result.smsId);
        this.result = result.result;

        this.smsApiProviderType = SmsApiProviderType.smsAero;
        this.clientId = this.smsData.dataAdapter.clientId;
        this.externalNumber = this.smsData.dataAdapter.externalNumber;
        this.smsText = this.smsData.dataAdapter.smsText;
        this.sender = this.smsData.dataAdapter.sender;
        this.smsSendType = this.smsData.dataAdapter.smsSendType;
    }

    private checkResult() {
        if (!this.sendSmsResponse.success) return this.setError();
        if (Array.isArray(this.sendSmsResponse.data)) {
            return {
                status: SMS_AERO_STATUS_TO_SMS_STATUS[this.sendSmsResponse.data[0].status],
                smsId: this.sendSmsResponse.data[0].id,
                result: SMS_AERO_STATUS_DESCRIPTION[this.sendSmsResponse.data[0].status] || UNKNOWN_RESULT,
            };
        }
        return {
            status: SMS_AERO_STATUS_TO_SMS_STATUS[this.sendSmsResponse.data.status],
            smsId: this.sendSmsResponse.data.id,
            result: SMS_AERO_STATUS_DESCRIPTION[this.sendSmsResponse.data.status] || UNKNOWN_RESULT,
        };
    }

    private setError() {
        return {
            status: SmsStatus.apiFail,
            smsId: v1(),
            result: this.sendSmsResponse.message || UNKNOWN_ERROR,
        };
    }
}
