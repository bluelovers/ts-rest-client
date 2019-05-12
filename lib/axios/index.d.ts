/**
 * Created by user on 2019/5/12.
 */
import { Axios } from 'axios-observable';
import { setupCache } from 'axios-cache-adapter';
import { AxiosObservable as IAxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { AxiosRequestConfig as IAxiosRequestConfig, AxiosResponse } from 'axios';
import { IRestClientOptions, RestClient } from '../rest-client';
export declare type IAxios = typeof Axios;
export interface IRequestConfig extends IAxiosRequestConfig {
    cache?: number | boolean | ReturnType<typeof setupCache>;
}
export { IAxiosObservable, IAxiosRequestConfig, Axios, setupCache };
export declare type IRestClientAxiosOptions<T extends Axios = Axios> = IRestClientOptions<T> & {
    configAxios?: IRequestConfig;
};
export declare abstract class RestClientAxios<T extends Axios = Axios> extends RestClient<T> {
    constructor(opts?: Partial<IRestClientAxiosOptions<T>>);
    static getOptionsFromAxiosResponse: typeof getOptionsFromAxiosResponse;
    static createAxios: typeof createAxios;
}
export declare namespace RestClientAxios {
    type Observable<T> = IAxiosObservable<T>;
}
export declare function createAxios(config?: IRequestConfig): Axios;
export declare function getOptionsFromAxiosResponse<T extends AxiosResponse<any>>(ret: T): IAxiosRequestConfig;
export declare function infoFromAxiosResponse<T extends AxiosResponse<any>>(ret: T): {
    status: number;
    statusText: string;
    path: string;
    responseUrl: string;
    redirects: string;
    headers: Record<string, string>;
    options: IAxiosRequestConfig;
};
export default RestClientAxios;
