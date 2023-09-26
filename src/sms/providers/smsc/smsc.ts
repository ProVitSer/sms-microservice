import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { ResultSendSmsDataAdapter } from '@app/sms/adapters/result-send-sms-data.adapter';
import { SendSmsMsgData } from '@app/sms/interfaces/sms.interfaces';
import { SmsProvider } from '@app/sms/services/sms.provider';
import { Injectable } from '@nestjs/common';
import { SmscDataAdapter } from './adapters/smsc.adapter';
import { SmscService } from './smsc.service';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms/adapters/base-check-sms-status-data.adapter';
import { SmscResultAdapter } from './adapters/smsc-result.adapter';

@Injectable()
export class Smsc extends SmsProvider {
    constructor(private readonly smscService: SmscService) {
        super();
    }
    public async getSmsDataAdapter(data: SendSmsMsgData, config: SmsClientConfig): Promise<SmscDataAdapter> {
        return new SmscDataAdapter(data, config);
    }

    public async send(dataAdapter: SmscDataAdapter): Promise<ResultSendSmsDataAdapter> {
        const result = await this.smscService.sendSmscSms(dataAdapter);
        return new ResultSendSmsDataAdapter(new SmscResultAdapter(result).data);
    }

    public async checkSmsStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<ResultSendSmsDataAdapter> {
        throw new Error('Method not implemented.');
    }
}
