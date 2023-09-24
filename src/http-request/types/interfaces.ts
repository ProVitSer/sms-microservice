import { AxiosRequestConfig } from 'axios';

export interface HttpRequestDataInterface<T> {
    data: T;
}

export interface HttpRequestConfigInterface {
    url: string;
    customRequestConfig: AxiosRequestConfig;
}
