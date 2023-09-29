import { BaseCheckSmsStatusDataAdapter } from '@app/sms/adapters/base-check-sms-status-data.adapter';
import { BaseSendApiSmsDataAdapter } from '@app/sms/adapters/base-send-api-sms-data.asapter';
import { BaseSendSmsDataAdapter } from '@app/sms/adapters/base-send-sms-data.adapter';
import { ResultSendSmsDataAdapter } from '@app/sms/adapters/result-send-sms-data.adapter';
import { Injectable } from '@nestjs/common';
import { SmsProvider } from '../sms.provider';

@Injectable()
export class SmsAero extends SmsProvider {
    protected apiSend(dataAdapter: BaseSendApiSmsDataAdapter): Promise<ResultSendSmsDataAdapter> {
        throw new Error('Method not implemented.');
    }

    protected checkStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<ResultSendSmsDataAdapter> {
        throw new Error('Method not implemented.');
    }

    protected send(dataAdapter: BaseSendSmsDataAdapter): Promise<ResultSendSmsDataAdapter> {
        throw new Error('Method not implemented.');
    }
}
