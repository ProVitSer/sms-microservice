import { HttpRequestService } from '@app/http-request/http.service';
import { Injectable } from '@nestjs/common';
import {
    SmsAeroBaseResponse,
    SmsAeroCheckSmsStatusParams,
    SmsAeroCheckSmsStatusResponse,
    SmsAeroSendSmsData,
} from './interfaces/sms-aero.interfaces';
import { SmsAeroSmsApiUrlPath } from './interfaces/sms-aero.enum';
import { SMS_AERO_API_URL } from './sms-aero.config';
import { SmsClientConfig } from '@app/sms-config/interfaces/sms-config.interfaces';
import { AxiosRequestConfig } from 'axios';
import { SmsProviderConfig } from '@app/sms-config/schemas/sms-provider-config.schema';

@Injectable()
export class SmsAeroApiService {
    constructor(private readonly http: HttpRequestService) {}

    public async sendSmsAeroSms<T>(requestData: SmsAeroSendSmsData, clientConfig: SmsClientConfig): Promise<T> {
        try {
            return await this.http.post<SmsAeroSendSmsData, T>(
                { data: requestData },
                {
                    url: `${SMS_AERO_API_URL}${SmsAeroSmsApiUrlPath.sendSms}`,
                    customRequestConfig: this.getCustomRequestConfig(clientConfig.smsProviderConfig),
                },
            );
        } catch (e) {
            throw e;
        }
    }

    public async checkAuth(smsProviderConfig: SmsProviderConfig): Promise<SmsAeroBaseResponse<null>> {
        try {
            return await this.http.post<unknown, SmsAeroBaseResponse<null>>(
                { data: {} },
                {
                    url: `${SMS_AERO_API_URL}${SmsAeroSmsApiUrlPath.auth}`,
                    customRequestConfig: this.getCustomRequestConfig(smsProviderConfig),
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
                    customRequestConfig: this.getCustomRequestConfig(clientConfig.smsProviderConfig),
                },
            );
        } catch (e) {
            throw e;
        }
    }

    private getCustomRequestConfig(smsProviderConfig: SmsProviderConfig): AxiosRequestConfig {
        const { api_key, email } = smsProviderConfig;

        const auth = Buffer.from(`${email}:${api_key}`).toString('base64');

        return { headers: { Authorization: `Basic ${auth}` } };
    }
}
