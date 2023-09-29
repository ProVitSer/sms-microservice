import { Injectable } from '@nestjs/common';
import { SmscSendSmsDataAdapter } from './adapters/smsc-send-sms.adapter';
import { SmscService } from './smsc.service';
import { SmscResultSendAdapter } from './adapters/smsc-result-send.adapter';
import { SmsApiProvider } from '@app/sms-api/services/sms-api.provider';
import { BaseApiSendSmsDataAdapter } from '@app/sms-api/adapters/base-api-send-sms-data.adapter';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms-api/adapters/base-check-sms-status-data.adapter';
import { SmscCheckStatusDataAdapter } from './adapters/smsc-check-status-data.adapter';
import { SmscCheckStatusResultAdapter } from './adapters/smsc-check-status-result.adapter';
import { SendSmsResultDataAdapter } from '@app/sms-api/adapters/send-sms-result-data.adapter';
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';

@Injectable()
export class Smsc extends SmsApiProvider {
    constructor(private readonly smscService: SmscService) {
        super();
    }
    public async send(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter> {
        const data = new SmscSendSmsDataAdapter(dataAdapter);

        const result = await this.smscService.sendSmscSms(data.requestData);

        return new SmscResultSendAdapter(data, result).data;
    }

    public async checkStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter> {
        const result = await this.smscService.checkStatus(new SmscCheckStatusDataAdapter(dataAdapter).requestParams);

        return new SmscCheckStatusResultAdapter(dataAdapter, result).data;
    }
}
