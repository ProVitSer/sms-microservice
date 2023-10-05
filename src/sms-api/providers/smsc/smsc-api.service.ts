import { HttpRequestService } from '@app/http-request/http.service';
import { Injectable } from '@nestjs/common';
import { SMSC_SEND_SMS_URL, SMSC_CHECK_SMS_STATUS_URL, SMSC_SEND_MASS_JOB_SMS_URL, SMSC_SEND_CHECK_BALANCE_URL } from './smsc.config';
import {
    SmscCheckSmsStatusResponse,
    SmscSendSmsJob,
    SmscSendSmsResponse,
    SmscCheckSmsStatusParams,
    SmscSendSmsData,
    CheckBalanceParams,
    CheckBalanceResponse,
} from './interfaces/smsc.interfaces';

@Injectable()
export class SmscApiService {
    constructor(private readonly http: HttpRequestService) {}

    public async sendSms(requestData: SmscSendSmsData): Promise<SmscSendSmsResponse> {
        try {
            return await this.http.post<SmscSendSmsData, SmscSendSmsResponse>(
                { data: requestData },
                {
                    url: SMSC_SEND_SMS_URL,
                },
            );
        } catch (e) {
            throw e;
        }
    }

    public async checkSmsStatus(requestParams: SmscCheckSmsStatusParams): Promise<SmscCheckSmsStatusResponse> {
        try {
            return await this.http.get<SmscCheckSmsStatusResponse>(SMSC_CHECK_SMS_STATUS_URL, {
                customRequestConfig: { params: requestParams },
            });
        } catch (e) {
            throw e;
        }
    }

    public async sendSmsJobs(requestParams: SmscSendSmsJob): Promise<SmscSendSmsResponse> {
        try {
            return await this.http.get<SmscCheckSmsStatusResponse>(SMSC_SEND_MASS_JOB_SMS_URL, {
                customRequestConfig: { params: requestParams },
            });
        } catch (e) {
            throw e;
        }
    }

    public async checkBalance(requestParams: CheckBalanceParams): Promise<CheckBalanceResponse> {
        try {
            return await this.http.get<CheckBalanceResponse>(SMSC_SEND_CHECK_BALANCE_URL, {
                customRequestConfig: { params: requestParams },
            });
        } catch (e) {
            throw e;
        }
    }
}
