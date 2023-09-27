import { HttpRequestService } from '@app/http-request/http.service';
import { Injectable } from '@nestjs/common';
import { SmscSendSmsDataAdapter } from './adapters/smsc-send-sms.adapter';
import { SEND_URL, STATUS_URL } from './smsc.config';
import { CheckSmsStatusResponse, SendSmsResponse, SmsCheckSmsStatusParams, SmscSendSmsData } from './interfaces/smsc.interfaces';
import { BaseCheckSmsStatusDataAdapter } from '@app/sms/adapters/base-check-sms-status-data.adapter';
import { ResponseFormat } from './interfaces/smsc.enum';

@Injectable()
export class SmscService {
    constructor(private readonly http: HttpRequestService) {}

    public async sendSmscSms(dataAdapter: SmscSendSmsDataAdapter): Promise<SendSmsResponse> {
        try {
            return await this.http.post<SmscSendSmsData, SendSmsResponse>(
                { data: dataAdapter.requestData },
                {
                    url: SEND_URL,
                    customRequestConfig: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                },
            );
        } catch (e) {
            throw e;
        }
    }

    public async checkStatus(dataAdapter: BaseCheckSmsStatusDataAdapter): Promise<CheckSmsStatusResponse> {
        try {
            const requestParams: SmsCheckSmsStatusParams = {
                id: dataAdapter.smsData.smsId,
                login: dataAdapter.clientConfig.smsProviderConfig.login,
                psw: dataAdapter.clientConfig.smsProviderConfig.password,
                phone: dataAdapter.smsData.externalNumber,
                fmt: ResponseFormat.json,
            };

            const result = await this._checkStatus(requestParams);
            return result;
        } catch (e) {
            throw e;
        }
    }

    private async _checkStatus(reauestParams: SmsCheckSmsStatusParams): Promise<CheckSmsStatusResponse> {
        return await this.http.get<CheckSmsStatusResponse>(STATUS_URL, { customRequestConfig: { params: reauestParams } });
    }
}
