import { HttpRequestService } from '@app/http-request/http.service';
import { Injectable } from '@nestjs/common';
import { SMSC_SEND_SMS_URL, SMSC_CHECK_SMS_STATUS_URL, SMSC_SEND_MASS_JOB_SMS_URL } from './smsc.config';
import {
    SmscCheckSmsStatusResponse,
    SmscSendSmsJob,
    SmscSendSmsResponse,
    SmscCheckSmsStatusParams,
    SmscSendSmsData,
} from './interfaces/smsc.interfaces';

@Injectable()
export class SmscApiService {
    private readonly customRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    constructor(private readonly http: HttpRequestService) {}

    public async sendSmscSms(requestData: SmscSendSmsData): Promise<SmscSendSmsResponse> {
        try {
            return await this.http.post<SmscSendSmsData, SmscSendSmsResponse>(
                { data: requestData },
                {
                    url: SMSC_SEND_SMS_URL,
                    customRequestConfig: this.customRequestConfig,
                },
            );
        } catch (e) {
            throw e;
        }
    }

    public async checkStatus(requestParams: SmscCheckSmsStatusParams): Promise<SmscCheckSmsStatusResponse> {
        try {
            return await this.http.get<SmscCheckSmsStatusResponse>(SMSC_CHECK_SMS_STATUS_URL, {
                customRequestConfig: { params: requestParams },
            });
        } catch (e) {
            throw e;
        }
    }

    public async sendJobs(requestParams: SmscSendSmsJob): Promise<SmscSendSmsResponse> {
        try {
            return await this.http.get<SmscCheckSmsStatusResponse>(SMSC_SEND_MASS_JOB_SMS_URL, {
                customRequestConfig: { params: requestParams },
            });
        } catch (e) {
            throw e;
        }
    }
}
