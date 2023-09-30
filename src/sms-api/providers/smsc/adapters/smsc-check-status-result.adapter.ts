import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { CheckSmsStatusResponse } from '../interfaces/smsc.interfaces';
import { SMSC_ERROR_CODE_DESCRIPTION, SMSC_STATUS_DESCRIPTION, SMSC_STATUS_TO_SMS_STATUS } from '../smsc.consts';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms-api/adapters/base-check-sms-status-data.adapter';
import { CheckSmsStatuResult } from '@app/sms-api/interfaces/sms-api.interfaces';
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';

export class SmscCheckStatusResultAdapter implements CheckSmsStatusResultDataAdapter {
    public status: SmsStatus;
    public clientId: string;
    public smsId: string;
    public result: string;
    constructor(private smscData: BaseCheckSmsStatusDataAdapter, private checkSmsStatusResponse: CheckSmsStatusResponse) {
        const data = this.formatResultData();
        this.status = data.status;
        this.clientId = data.clientId;
        this.smsId = data.smsId;
        this.result = data.result;
    }

    private formatResultData(): CheckSmsStatuResult {
        const resultStatusInfo = 'error_code' in this.checkSmsStatusResponse ? this.formatError() : this.getResultStatus();
        return {
            ...resultStatusInfo,
            clientId: this.smscData.clientConfig.clientId,
            smsId: this.smscData.smsData.smsId,
        };
    }

    private formatError() {
        return {
            status: SmsStatus.apiFail,
            result: SMSC_ERROR_CODE_DESCRIPTION[this.checkSmsStatusResponse.error_code],
        };
    }

    private getResultStatus() {
        return {
            status: SMSC_STATUS_TO_SMS_STATUS[this.checkSmsStatusResponse.status],
            result: SMSC_STATUS_DESCRIPTION[this.checkSmsStatusResponse.status],
        };
    }
}
