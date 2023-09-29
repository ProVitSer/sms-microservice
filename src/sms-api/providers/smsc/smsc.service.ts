import { HttpRequestService } from '@app/http-request/http.service';
import { Injectable } from '@nestjs/common';
import { SEND_URL, STATUS_URL } from './smsc.config';
import { CheckSmsStatusResponse, SendSmsResponse, SmsCheckSmsStatusParams, SmscSendSmsData } from './interfaces/smsc.interfaces';

@Injectable()
export class SmscService {
    constructor(private readonly http: HttpRequestService) {}

    public async sendSmscSms(requestData: SmscSendSmsData): Promise<any> {
        try {
            return await this.http.post<SmscSendSmsData, SendSmsResponse>(
                { data: requestData },
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

    public async checkStatus(requestParams: SmsCheckSmsStatusParams): Promise<CheckSmsStatusResponse> {
        try {
            return await this.http.get<CheckSmsStatusResponse>(STATUS_URL, { customRequestConfig: { params: requestParams } });
        } catch (e) {
            throw e;
        }
    }
}
