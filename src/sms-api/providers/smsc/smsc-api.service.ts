import { HttpRequestService } from '@app/http-request/http.service';
import { Injectable } from '@nestjs/common';
import { SEND_SMS_URL, CHECK_SMS_STATUS_URL, SEND_MASS_JOB_SMS_URL } from './smsc.config';
import {
    CheckSmsStatusResponse,
    SendSmsJob,
    SendSmsResponse,
    SmsCheckSmsStatusParams,
    SmscSendSmsData,
} from './interfaces/smsc.interfaces';

@Injectable()
export class SmscApiService {
    constructor(private readonly http: HttpRequestService) {}

    public async sendSmscSms(requestData: SmscSendSmsData): Promise<SendSmsResponse> {
        try {
            return await this.http.post<SmscSendSmsData, SendSmsResponse>(
                { data: requestData },
                {
                    url: SEND_SMS_URL,
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
            return await this.http.get<CheckSmsStatusResponse>(CHECK_SMS_STATUS_URL, { customRequestConfig: { params: requestParams } });
        } catch (e) {
            throw e;
        }
    }

    public async sendJobs(requestParams: SendSmsJob): Promise<SendSmsResponse> {
        try {
            return await this.http.get<CheckSmsStatusResponse>(SEND_MASS_JOB_SMS_URL, { customRequestConfig: { params: requestParams } });
        } catch (e) {
            throw e;
        }
    }
}
