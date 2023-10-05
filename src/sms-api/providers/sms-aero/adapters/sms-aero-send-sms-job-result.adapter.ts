import { BaseMassSendSmsDataAdapter, SendMassSmsResultDataAdapter } from '@app/sms-api/adapters';
import { SendSmsToNumbersInfo } from '@app/sms-api/interfaces/sms-api.interfaces';
import { SmsJobSendStatus, SmsJobStatus } from '@app/sms-job/interfaces/sms-job.enum';
import { SmsAeroBaseResponse, SmsAeroSendSmsResponse } from '../interfaces/sms-aero.interfaces';
import { SMS_AERO_STATUS_DESCRIPTION } from '../sms-aero.consts';

export class SmsAeroSendSmsJobResultAdapter implements SendMassSmsResultDataAdapter {
    public status: SmsJobStatus;
    public smsJobId: string;
    public clientId: string;
    public sendSmsToNumbersInfo: SendSmsToNumbersInfo[];
    constructor(public dataAdapter: BaseMassSendSmsDataAdapter, public sendSmsResponse: SmsAeroBaseResponse<SmsAeroSendSmsResponse[]>) {
        this.status = sendSmsResponse.success ? SmsJobStatus.inProgress : SmsJobStatus.apiFail;
        this.smsJobId = dataAdapter.smsJobId;
        this.clientId = dataAdapter.clientId;
        this.sendSmsToNumbersInfo = this.formatNumberInfo();
    }

    private formatNumberInfo(): SendSmsToNumbersInfo[] {
        const numbersInfo: SendSmsToNumbersInfo[] = [];
        this.sendSmsResponse.data.map((r: SmsAeroSendSmsResponse) => {
            numbersInfo.push({
                sendStatus: SmsJobSendStatus.inProgress,
                smsId: String(r.id),
                number: r.number,
                result: SMS_AERO_STATUS_DESCRIPTION[r.status],
            });
        });
        return numbersInfo;
    }
}
