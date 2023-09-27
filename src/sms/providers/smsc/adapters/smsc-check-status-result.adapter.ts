import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { CheckSmsStatusResponse } from '../interfaces/smsc.interfaces';
import { SmsResult } from '@app/sms/interfaces/sms.interfaces';
import { SMSC_ERROR_CODE_DESCRIPTION, SMSC_STATUS_DESCRIPTION, SMSC_STATUS_TO_SMS_STATUS } from '../smsс.consts';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms/adapters/base-check-sms-status-data.adapter';

export class SmscCheckStatusResultAdapter {
    public data: SmsResult;
    constructor(private smscData: BaseCheckSmsStatusDataAdapter, private result: CheckSmsStatusResponse) {
        this.data = this.formatResultData();
    }

    private formatResultData(): SmsResult {
        const resultStatusInfo = 'error_code' in this.result ? this.formatError() : this.getResultStatus();
        return {
            ...resultStatusInfo,
            smsProvider: this.smscData.smsData.smsProvider,
            clientId: this.smscData.clientConfig.clientId,
            smsId: this.smscData.smsData.smsId,
            externalNumber: this.smscData.smsData.externalNumber,
            smsText: this.smscData.smsData.smsText,
        };
    }

    private formatError() {
        return {
            status: SmsStatus.apiFail,
            result: SMSC_ERROR_CODE_DESCRIPTION[this.result.error_code],
        };
    }

    private getResultStatus() {
        return {
            status: SMSC_STATUS_TO_SMS_STATUS[this.result.status],
            result: SMSC_STATUS_DESCRIPTION[this.result.status],
        };
    }
}
