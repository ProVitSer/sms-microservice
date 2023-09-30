import { SendMassSmsResultDataAdapter } from '@app/sms-api/adapters/send-mass-sms-result-data.adapter';
import { SendSmsInfo } from '../sms-job.schema';
import { SmsJobSendStatus, SmsJobStatus } from '../interfaces/sms-job.enum';
import { SendSmsToNumbersInfo } from '@app/sms-api/interfaces/sms-api.interfaces';

export class ResultUpdateSmsJobAdapter {
    public status: SmsJobStatus;
    public smsJobId: string;
    public clientId: string;
    public sendSmsInfo: SendSmsInfo[];
    public changed: Date;
    constructor(public dataAdapter: SendMassSmsResultDataAdapter) {
        this.status = dataAdapter.status;
        this.smsJobId = dataAdapter.smsJobId;
        this.clientId = dataAdapter.clientId;
        this.changed = new Date();
        this.sendSmsInfo = this.formatSendSmsToNumbers();
    }

    private formatSendSmsToNumbers(): SendSmsInfo[] {
        const sendSmsInfo: SendSmsInfo[] = [];
        this.dataAdapter.sendSmsToNumbersInfo.map((r: SendSmsToNumbersInfo) => {
            sendSmsInfo.push({
                sendStatus: SmsJobSendStatus.inProgress,
                smsId: r.smsId,
                result: r.result,
                number: r.number,
                changed: new Date(),
            });
        });

        return sendSmsInfo;
    }
}
