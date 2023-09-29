import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { SmsUtils } from '../../utils/sms.utils';
import { parse, isWithinInterval, format } from 'date-fns';
import { SmsTimeRanges } from '@app/sms-config/schemas/sms-time-ranges.schema';
import { SmsSendType } from '../interfaces/sms.enum';
import { SendSmsMsgData } from '../interfaces/sms.interfaces';

export class BaseSendSmsDataAdapter {
    public readonly clientId: string;
    public readonly externalNumber: string;
    public readonly sender: string;
    public readonly smsText: string;
    public readonly smsSendType: SmsSendType;
    public clientConfig: SmsClientConfig;
    constructor(private data: SendSmsMsgData, clientConfig: SmsClientConfig) {
        this.clientId = this.data.clientId;
        this.clientConfig = clientConfig;
        this.externalNumber = SmsUtils.normalizePhoneNumber(this.data.externalNumber);
        const rangeConfig = this.getRangeConfig();
        this.sender = rangeConfig.sender;
        this.smsText = rangeConfig.smsText;
        this.smsSendType = SmsSendType.pbxEvent;
    }

    private getRangeConfig(): SmsTimeRanges {
        const formattedTime = format(new Date(), 'HH:mm');
        const actualTime = parse(formattedTime, 'HH:mm', new Date());
        const needRangeConfig: SmsTimeRanges[] = [];
        this.clientConfig.smsTimeRanges.some((interval: SmsTimeRanges) => {
            const existingStart = parse(interval.start, 'HH:mm', new Date());
            const existingEnd = parse(interval.end, 'HH:mm', new Date());

            if (isWithinInterval(actualTime, { start: existingStart, end: existingEnd })) needRangeConfig.push(interval);
        });
        return needRangeConfig[0];
    }
}
