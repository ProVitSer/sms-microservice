import { SendSmsResponse } from '../interfaces/smsc.interfaces';
import { SmscStatus } from '../interfaces/smsc.enum';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmscSendSmsDataAdapter } from './smsc-send-sms.adapter';
import { SMSC_ERROR_CODE_DESCRIPTION, SMSC_STATUS_DESCRIPTION } from '../smsc.consts';
import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { SendSmsResult } from '@app/sms-api/interfaces/sms-api.interfaces';

export class SmscResultSendAdapter {
    public data: SendSmsResult;
    constructor(private smsData: SmscSendSmsDataAdapter, private result: SendSmsResponse) {
        this.data = this.formatResultData();
    }

    private formatResultData(): SendSmsResult {
        const resultStatusInfo = 'error_code' in this.result ? this.formatError() : this.inProgress();
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
            result: SMSC_ERROR_CODE_DESCRIPTION[this.result.error_code],
        };
    }

    private inProgress() {
        return {
            status: SmsStatus.inProgress,
            result: SMSC_STATUS_DESCRIPTION[SmscStatus.WaitingSent],
        };
    }
}
