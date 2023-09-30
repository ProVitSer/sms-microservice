import { SmsUtils } from '@app/utils/sms.utils';
import { AddSmsJobDto } from '../dto/add-sms-job.dto';
import { SmsJobStatus } from '../interfaces/sms-job.enum';
import { SendSmsInfo } from '../sms-job.schema';
import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';

export class AddNewSmsJobDataAdapter {
    public status: SmsJobStatus;
    public clientId: string;
    public sender: string;
    public externalNumbers: string[];
    public sendSmsInfo: SendSmsInfo[];
    public smsText: string;
    public sendTime: Date;
    public result: string;
    public name: string;
    public smsApiProviderType: SmsApiProviderType;
    constructor(data: AddSmsJobDto, clientConfig: SmsClientConfig) {
        this.status = SmsJobStatus.planned;
        this.name = data.name;
        this.clientId = data.clientId;
        this.sender = data.sender;
        this.externalNumbers = data.externalNumbers;
        this.smsText = data.smsText;
        this.sendTime = data.sendTime;
        this.result = '';
        this.sendSmsInfo = this.formatSendSmsInfo();
        this.smsApiProviderType = clientConfig.smsProviderConfig.smsApiProvider;
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
