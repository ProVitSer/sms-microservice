import { SmsApiProvider } from '@app/sms-api/services/sms-api.provider';
import { Injectable } from '@nestjs/common';
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';
import { BaseApiSendSmsDataAdapter } from '@app/sms-api/adapters/base-api-send-sms-data.adapter';
import { SendSmsResultDataAdapter } from '@app/sms-api/adapters/send-sms-result-data.adapter';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms-api/adapters/base-check-sms-status-data.adapter';

@Injectable()
export class SmsRu extends SmsApiProvider {
    protected send(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter> {
        throw new Error('Method not implemented.');
    }

    protected checkStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter> {
        throw new Error('Method not implemented.');
    }
}
