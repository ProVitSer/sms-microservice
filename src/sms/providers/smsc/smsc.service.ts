import { HttpRequestService } from '@app/http-request/http.service';
import { Injectable } from '@nestjs/common';
import { SmscDataAdapter } from './adapters/smsc.adapter';
import { SEND_URL } from './smsc.config';
import { HttpRequestConfigInterface } from '@app/http-request/types/interfaces';
import { SendSmsResponse, SmscSendSmsData } from './interfaces/smsc.interfaces';

@Injectable()
export class SmscService {
    private readonly requestConfig: HttpRequestConfigInterface = {
        url: SEND_URL,
        customRequestConfig: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    };
    constructor(private readonly http: HttpRequestService) {}

    public async sendSmscSms(dataAdapter: SmscDataAdapter): Promise<SendSmsResponse> {
        try {
            return await this.http.post<SmscSendSmsData, SendSmsResponse>({ data: dataAdapter.requestData }, this.requestConfig);
        } catch (e) {
            throw e;
        }
    }
}
