import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { ResultSendSmsDataAdapter } from '@app/sms/adapters/result-send-sms-data.adapter';
import { SendSmsMsgData } from '@app/sms/interfaces/sms.interfaces';
import { SmsProvider } from '@app/sms/services/sms.provider';
import { Injectable } from '@nestjs/common';
import { SmscSendSmsDataAdapter } from './adapters/smsc-send-sms.adapter';
import { SmscService } from './smsc.service';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms/adapters/base-check-sms-status-data.adapter';
import { SmscResultSendAdapter } from './adapters/smsc-result-send.adapter';
import { SmscCheckStatusResultAdapter } from './adapters/smsc-check-status-result.adapter';

@Injectable()
export class Smsc extends SmsProvider {
    constructor(private readonly smscService: SmscService) {
        super();
    }
    public async getSmsDataAdapter(data: SendSmsMsgData, config: SmsClientConfig): Promise<SmscSendSmsDataAdapter> {
        return new SmscSendSmsDataAdapter(data, config);
    }

    public async send(dataAdapter: SmscSendSmsDataAdapter): Promise<ResultSendSmsDataAdapter> {
        const result = await this.smscService.sendSmscSms(dataAdapter);
        return new SmscResultSendAdapter(dataAdapter, result).data;
    }

    public async checkStatus(smsData: BaseCheckSmsStatusDataAdapter): Promise<ResultSendSmsDataAdapter> {
        const result = await this.smscService.checkStatus(smsData);
        return new SmscCheckStatusResultAdapter(smsData, result).data;
    }
}
