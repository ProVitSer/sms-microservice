import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms/adapters/base-check-sms-status-data.adapter';
import { BaseSendSmsDataAdapter } from '@app/sms/adapters/base-send-sms-data.adapter';
import { ResultSendSmsDataAdapter } from '@app/sms/adapters/result-send-sms-data.adapter';
import { SendSmsMsgData } from '@app/sms/interfaces/sms.interfaces';
import { SmsProvider } from '@app/sms/services/sms.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsAero extends SmsProvider {
    protected checkStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<ResultSendSmsDataAdapter> {
        throw new Error('Method not implemented.');
    }
    protected getSmsDataAdapter(data: SendSmsMsgData, config: SmsClientConfig): Promise<BaseSendSmsDataAdapter> {
        throw new Error('Method not implemented.');
    }
    protected send(dataAdapter: BaseSendSmsDataAdapter): Promise<ResultSendSmsDataAdapter> {
        throw new Error('Method not implemented.');
    }
}
