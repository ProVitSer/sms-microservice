import { HttpRequestService } from '@app/http-request/http.service';
import { Injectable } from '@nestjs/common';
import {
    SmsAeroBaseResponse,
    SmsAeroCheckSmsStatusParams,
    SmsAeroCheckSmsStatusResponse,
    SmsAeroSendSmsData,
    SmsAeroSendSmsResponse,
} from './interfaces/sms-aero.interfaces';
import { SmsAeroSmsApiUrlPath } from './interfaces/sms-aero.enum';
import { SMS_AERO_API_URL } from './sms-aero.config';
import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class SmsAeroApiService {
    constructor(private readonly http: HttpRequestService) {}

    public async sendSmsAeroSms(requestData: SmsAeroSendSmsData, clientConfig: SmsClientConfig): Promise<any> {
        try {
            return await this.http.post<SmsAeroSendSmsData, SmsAeroBaseResponse<SmsAeroSendSmsResponse>>(
                { data: requestData },
                {
                    url: `${SMS_AERO_API_URL}${SmsAeroSmsApiUrlPath.sendSms}`,
                    customRequestConfig: this.getCustomRequestConfig(clientConfig),
                },
            );
        } catch (e) {
            throw e;
        }
    }

    public async checkAuth(clientConfig: SmsClientConfig): Promise<SmsAeroBaseResponse<null>> {
        try {
            return await this.http.post<unknown, SmsAeroBaseResponse<null>>(
                { data: {} },
                {
                    url: `${SMS_AERO_API_URL}${SmsAeroSmsApiUrlPath.auth}`,
                    customRequestConfig: this.getCustomRequestConfig(clientConfig),
                },
            );
        } catch (e) {
            throw e;
        }
    }

    public async checkStatus(
        requestData: SmsAeroCheckSmsStatusParams,
        clientConfig: SmsClientConfig,
    ): Promise<SmsAeroBaseResponse<SmsAeroCheckSmsStatusResponse>> {
        try {
            return await this.http.post<SmsAeroCheckSmsStatusParams, SmsAeroBaseResponse<SmsAeroCheckSmsStatusResponse>>(
                { data: requestData },
                {
                    url: `${SMS_AERO_API_URL}${SmsAeroSmsApiUrlPath.checkSmsStatus}`,
                    customRequestConfig: this.getCustomRequestConfig(clientConfig),
                },
            );
        } catch (e) {
            throw e;
        }
    }

    private getCustomRequestConfig(clientConfig: SmsClientConfig): AxiosRequestConfig {
        const { api_key, email } = clientConfig.smsProviderConfig;

        const auth = Buffer.from(`${email}:${api_key}`).toString('base64');

        return { headers: { Authorization: `Basic ${auth}` } };
    }
}
