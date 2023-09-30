import { SendSmsResponse } from '../interfaces/smsc.interfaces';
import { SmscStatus } from '../interfaces/smsc.enum';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmscSendSmsDataAdapter } from './smsc-send-sms-data.adapter';
import { SMSC_ERROR_CODE_DESCRIPTION, SMSC_STATUS_DESCRIPTION } from '../smsc.consts';
import { SmsSendType, SmsStatus } from '@app/sms/interfaces/sms.enum';
import { SendSmsResult } from '@app/sms-api/interfaces/sms-api.interfaces';
import { SendSmsResultDataAdapter } from '@app/sms-api/adapters/send-sms-result-data.adapter';

export class SmscSendSmsResultAdapter implements SendSmsResultDataAdapter {
    public status: SmsStatus;
    public smsApiProviderType: SmsApiProviderType;
    public clientId: string;
    public smsId: string;
    public externalNumber: string;
    public smsText: string;
    public sender: string;
    public smsSendType: SmsSendType;
    public result: string;

    constructor(private smsData: SmscSendSmsDataAdapter, private sendSmsResponse: SendSmsResponse) {
        const data = this.formatResultData();
        this.status = data.status;
        this.smsApiProviderType = data.smsApiProviderType;
        this.clientId = data.clientId;
        this.externalNumber = data.externalNumber;
        this.smsText = data.smsText;
        this.sender = data.sender;
        this.smsSendType = data.smsSendType;
        this.result = data.result;
    }

    private formatResultData(): SendSmsResult {
        const resultStatusInfo = 'error_code' in this.sendSmsResponse ? this.formatError() : this.inProgress();
        return {
            ...resultStatusInfo,
            smsApiProviderType: SmsApiProviderType.smsc,
            clientId: this.smsData.dataAdapter.clientId,
            smsId: this.smsData.smsId,
            externalNumber: this.smsData.dataAdapter.externalNumber,
            smsText: this.smsData.dataAdapter.smsText,
            sender: this.smsData.dataAdapter.sender,
            smsSendType: this.smsData.dataAdapter.smsSendType,
        };
    }

    private formatError() {
        return {
            status: SmsStatus.apiFail,
            result: SMSC_ERROR_CODE_DESCRIPTION[this.sendSmsResponse.error_code],
        };
    }

    private inProgress() {
        return {
            status: SmsStatus.inProgress,
            result: SMSC_STATUS_DESCRIPTION[SmscStatus.WaitingSent],
        };
    }
}
