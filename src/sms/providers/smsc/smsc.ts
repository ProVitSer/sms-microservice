import { ResultSendSmsDataAdapter } from '@app/sms/adapters/result-send-sms-data.adapter';
import { SmsProvider } from '@app/sms/services/sms.provider';
import { Injectable } from '@nestjs/common';
import { SmscSendSmsDataAdapter } from './adapters/smsc-send-sms.adapter';
import { SmscService } from './smsc.service';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms/adapters/base-check-sms-status-data.adapter';
import { SmscResultSendAdapter } from './adapters/smsc-result-send.adapter';
import { SmscCheckStatusResultAdapter } from './adapters/smsc-check-status-result.adapter';
import { BaseSendApiSmsDataAdapter } from '@app/sms/adapters/base-send-api-sms-data.asapter';
import { SmscCheckStatusDataAdapter } from './adapters/smsc-check-status-data.adapter';
import { BaseSendSmsDataAdapter } from '@app/sms/adapters/base-send-sms-data.adapter';

@Injectable()
export class Smsc extends SmsProvider {
    constructor(private readonly smscService: SmscService) {
        super();
    }
    public async send(dataAdapter: BaseSendSmsDataAdapter): Promise<ResultSendSmsDataAdapter> {
        const data = new SmscSendSmsDataAdapter(dataAdapter);

        const result = await this.smscService.sendSmscSms(data.requestData);

        return new SmscResultSendAdapter(data, result).data;
    }

    public async checkStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<ResultSendSmsDataAdapter> {
        const result = await this.smscService.checkStatus(new SmscCheckStatusDataAdapter(dataAdapter).requestParams);

        return new SmscCheckStatusResultAdapter(dataAdapter, result).data;
    }

    public async apiSend(dataAdapter: BaseSendApiSmsDataAdapter): Promise<ResultSendSmsDataAdapter> {
        const data = new SmscSendSmsDataAdapter(dataAdapter);

        const result = await this.smscService.sendSmscSms(data.requestData);

        return new SmscResultSendAdapter(data, result).data;
    }
}
