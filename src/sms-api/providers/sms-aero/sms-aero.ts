import { SmsApiProvider } from '@app/sms-api/services/sms-api.provider';
import { Injectable } from '@nestjs/common';
import { BaseApiSendSmsDataAdapter } from '@app/sms-api/adapters/base-api-send-sms-data.adapter';
import { SendSmsResultDataAdapter } from '@app/sms-api/adapters/send-sms-result-data.adapter';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms-api/adapters/base-check-sms-status-data.adapter';
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';
import { BaseMassSendSmsDataAdapter } from '@app/sms-api/adapters/base-mass-send-sms-data.adapter';
import { SendMassSmsResultDataAdapter } from '@app/sms-api/adapters/send-mass-sms-result-data.adapter';

@Injectable()
export class SmsAero extends SmsApiProvider {
    protected massSmsSending(dataAdapter: BaseMassSendSmsDataAdapter): Promise<SendMassSmsResultDataAdapter> {
        throw new Error('Method not implemented.');
    }
    protected smsSending(dataAdapter: BaseApiSendSmsDataAdapter): Promise<SendSmsResultDataAdapter> {
        throw new Error('Method not implemented.');
    }
    protected checkStatusSendingSms(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResultDataAdapter> {
        throw new Error('Method not implemented.');
    }
}
