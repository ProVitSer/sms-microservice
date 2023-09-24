import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { HttpRequestConfigInterface, HttpRequestDataInterface } from './types/interfaces';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class HttpRequestService {
    constructor(private httpService: HttpService) {}

    public async post<T, D>(requestData: HttpRequestDataInterface<T>, requestConfig: HttpRequestConfigInterface): Promise<D> {
        try {
            const response = await firstValueFrom(
                this.httpService.post<D>(requestConfig.url, requestData.data, <any>requestConfig.customRequestConfig).pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
            );
            return response as D;
        } catch (e) {
            return e;
        }
    }
}
