/**
 * Created by user on 2019/5/12.
 */
import { setupCache } from 'axios-cache-adapter';
import { Axios } from 'axios-observable';
import { AxiosObservable as IAxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { AxiosRequestConfig as IAxiosRequestConfig } from 'axios';
import { IRestClientOptions, RestClient } from '../rest-client';
export declare type IAxios = typeof Axios;
export interface IRequestConfig extends IAxiosRequestConfig {
    cache?: number | boolean | ReturnType<typeof setupCache>;
}
export { IAxiosObservable, IAxiosRequestConfig, Axios, setupCache };
export declare type IRestClientAxiosOptions<T extends Axios = Axios> = IRestClientOptions<T> & {
    config?: IRequestConfig;
};
export declare abstract class RestClientAxios<T extends Axios = Axios> extends RestClient<T> {
    constructor(opts?: Partial<IRestClientAxiosOptions<T>>);
}
export declare namespace RestClientAxios {
    type Observable<T> = IAxiosObservable<T>;
}
export declare function createAxios(config?: IRequestConfig): Axios;
