import { SmsUtils } from '@app/utils/sms.utils';
import { SendSmsInfo } from '../sms-job.schema';
import { UpdateSmsJobDto } from '../dto/update-sms-job.dto';

export class UpdateSmsJobAdapter {
    public sender?: string;
    public externalNumbers?: string[];
    public sendSmsInfo?: SendSmsInfo[];
    public smsText?: string;
    public sendTime?: Date;
    public changed: Date;
    constructor(updateData: UpdateSmsJobDto) {
        this.sender = updateData.sender;
        this.externalNumbers = updateData.externalNumbers;
        this.smsText = updateData.smsText;
        this.sendTime = updateData.sendTime;
        this.changed = new Date();
        this.formatSendSmsInfo();
    }

    private formatSendSmsInfo(): void {
        if (!this.externalNumbers) return;
        const sendSmsInfo: SendSmsInfo[] = [];
        this.externalNumbers.map((n: string) => {
            sendSmsInfo.push({
                number: SmsUtils.normalizePhoneNumber(n),
                result: '',
                created: new Date(),
            });
        });
        this.sendSmsInfo = sendSmsInfo;
    }
}
