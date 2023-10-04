import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';
import { SmsAeroCallbackSendingResult } from '../interfaces/sms-aero.interfaces';
import { SmsStatus } from '@app/sms/interfaces/sms.enum';
import { SMS_AERO_STATUS_DESCRIPTION, SMS_AERO_STATUS_TO_SMS_STATUS } from '../sms-aero.consts';

export class SmsAeroParseSmsSendingResultAdapter implements CheckSmsStatusResultDataAdapter {
    public readonly status: SmsStatus;
    public readonly clientId: string;
    public readonly smsId: string;
    public readonly result: string;
    constructor(private resultSending: SmsAeroCallbackSendingResult, clientId: string) {
        this.status = SMS_AERO_STATUS_TO_SMS_STATUS[resultSending.status];
        this.clientId = clientId;
        this.smsId = resultSending.id;
        this.result = SMS_AERO_STATUS_DESCRIPTION[resultSending.status];
    }
}
