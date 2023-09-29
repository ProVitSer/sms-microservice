import { SmsUtils } from '@app/utils/sms.utils';
import { AddSmsJobDto } from '../dto/add-sms-job.dto';
import { SmsJobStatus } from '../interfaces/sms-job.enum';
import { SendSmsInfo } from '../sms-job.schema';

export class AddNewSmsJobDataAdapter {
    public status: SmsJobStatus;
    public clientId: string;
    public sender: string;
    public externalNumbers: string[];
    public sendSmsInfo: SendSmsInfo[];
    public smsText: string;
    public sendTime: Date;
    constructor(data: AddSmsJobDto) {
        this.status = SmsJobStatus.planned;
        this.clientId = data.clientId;
        this.sender = data.sender;
        this.externalNumbers = data.externalNumbers;
        this.smsText = data.smsText;
        this.sendTime = data.sendTime;
        this.sendSmsInfo = this.formatSendSmsInfo();
    }

    private formatSendSmsInfo(): SendSmsInfo[] {
        const sendSmsInfo: SendSmsInfo[] = [];
        this.externalNumbers.map((n: string) => {
            sendSmsInfo.push({
                number: SmsUtils.normalizePhoneNumber(n),
                result: '',
                created: new Date(),
            });
        });
        return sendSmsInfo;
    }
}
