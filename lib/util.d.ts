/**
 * Created by user on 2019/5/12.
 */
import 'reflect-metadata';
import Bluebird = require('bluebird');
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
export { AxiosObservable as Observable } from 'axios-observable/dist/axios-observable.interface';
export declare type IBluebird = typeof Bluebird;
export declare function urlNormalize(input: string | URL): string;
export declare function urlResolve(input: string, base?: string | URL): string;
export declare const enum EnumRestClientMetadata {
    PARAM_PATH = "Path",
    PARAM_QUERY = "Query",
    PARAM_BODY = "Body",
    PARAM_HEADER = "Header",
    METHOD_GET = "GET",
    METHOD_POST = "POST",
    METHOD_PUT = "PUT",
    METHOD_PATCH = "PATCH",
    METHOD_DELETE = "DELETE",
    METHOD_HEAD = "HEAD",
    METHOD = "METHOD",
    BASE_URL = "BASE_URL",
    DEFAULT_HEADERS = "DEFAULT_HEADERS",
    HTTP_CLIENT = "HTTP_CLIENT",
    REQUEST_INTERCEPTOR = "REQUEST_INTERCEPTOR"
}
export declare const SymbolBaseUrl: unique symbol;
export declare const SymbolDefaultHeaders: unique symbol;
export declare const SymbolHttpClient: unique symbol;
export declare const SymbolRequestInterceptor: unique symbol;
export declare function standardQueryEncoding(v: string): string;
export declare function subscribeObservable<T extends AxiosObservable<any>>(ob: T): Bluebird<import("rxjs").Subscription>;
