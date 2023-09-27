import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { SendSmsResponse, SmscData } from '../interfaces/smsc.interfaces';
import { SmsResult } from '@app/sms/interfaces/sms.interfaces';
import { SMSC_ERROR_CODE_DESCRIPTION, SMSC_STATUS_DESCRIPTION } from '../smsс.consts';
import { SmscStatus } from '../interfaces/smsc.enum';
import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';

export class SmscResultSendAdapter {
    public data: SmsResult;
    constructor(private smscData: SmscData, private result: SendSmsResponse) {
        this.data = this.formatResultData();
    }

    private formatResultData(): SmsResult {
        const resultStatusInfo = 'error_code' in this.result ? this.formatError() : this.inProgress();
        return {
            ...resultStatusInfo,
            smsProvider: SmsProviderType.smsc,
            clientId: this.smscData.clientId,
            smsId: this.smscData.smsId,
            externalNumber: this.smscData.externalNumber,
            smsText: this.smscData.smsText,
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
