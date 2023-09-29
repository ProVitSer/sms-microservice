import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { CheckSmsStatusResponse } from '../interfaces/smsc.interfaces';
import { SMSC_ERROR_CODE_DESCRIPTION, SMSC_STATUS_DESCRIPTION, SMSC_STATUS_TO_SMS_STATUS } from '../smsc.consts';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms-api/adapters/base-check-sms-status-data.adapter';
import { CheckSmsStatuResult } from '@app/sms-api/interfaces/sms-api.interfaces';

export class SmscCheckStatusResultAdapter {
    public data: CheckSmsStatuResult;
    constructor(private smscData: BaseCheckSmsStatusDataAdapter, private result: CheckSmsStatusResponse) {
        this.data = this.formatResultData();
    }

    private formatResultData(): CheckSmsStatuResult {
        const resultStatusInfo = 'error_code' in this.result ? this.formatError() : this.getResultStatus();
        return {
            ...resultStatusInfo,
            clientId: this.smscData.clientConfig.clientId,
            smsId: this.smscData.smsData.smsId,
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
