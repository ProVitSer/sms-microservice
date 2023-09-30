import { BaseMassSendSmsDataAdapter } from '@app/sms-api/adapters/base-mass-send-sms-data.adapter';
import { SendMassSmsResultDataAdapter } from '@app/sms-api/adapters/send-mass-sms-result-data.adapter';
import { SendSmsToNumbersInfo } from '@app/sms-api/interfaces/sms-api.interfaces';
import { SmsJobSendStatus, SmsJobStatus } from '@app/sms-job/interfaces/sms-job.enum';
import { SendSmsResponse } from '../interfaces/smsc.interfaces';
import { SMSC_ERROR_CODE_DESCRIPTION } from '../smsc.consts';

export class SmscSendSmsJobResultAdapter implements SendMassSmsResultDataAdapter {
    status: SmsJobStatus;
    smsJobId: string;
    clientId: string;
    sendSmsToNumbersInfo: SendSmsToNumbersInfo[];
    constructor(public dataAdapter: BaseMassSendSmsDataAdapter, public sendSmsResponse: SendSmsResponse) {
        this.status = 'error_code' in this.sendSmsResponse ? SmsJobStatus.apiFail : SmsJobStatus.inProgress;
        this.smsJobId = dataAdapter.smsJobId;
        this.clientId = dataAdapter.clientId;
        this.sendSmsToNumbersInfo = this.formatNumberInfo();
    }

    private formatNumberInfo(): SendSmsToNumbersInfo[] {
        const numbersInfo: SendSmsToNumbersInfo[] = [];
        if ('error_code' in this.sendSmsResponse) {
            this.dataAdapter.sendSmsInfo.map((s) => {
                numbersInfo.push({
                    sendStatus: SmsJobSendStatus.error,
                    smsId: '',
                    number: s.number,
                    result: SMSC_ERROR_CODE_DESCRIPTION[this.sendSmsResponse.error_code],
                });
            });
        } else {
            this.dataAdapter.sendSmsInfo.map((s) => {
                numbersInfo.push({
                    sendStatus: SmsJobSendStatus.inProgress,
                    smsId: this.sendSmsResponse.id,
                    number: s.number,
                    result: '',
                });
            });
        }
        return numbersInfo;
    }
}
