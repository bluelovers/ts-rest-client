/**
 * Created by user on 2019/5/12.
 */
import 'reflect-metadata';
import { IAxiosObservable } from './axios';
import { Observer, PartialObserver } from 'rxjs';
import Bluebird = require('bluebird');
import Rxjs = require('rxjs');
import { IClassWithPrototype } from './rest-client';
export { Observer, PartialObserver };
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
export declare function createObserver<T, E extends Error | any = Error>(observer?: PartialObserver<T>, log?: Console): Observer<T>;
export declare type IUnpackObservableData<T extends Rxjs.Observable<any>> = T extends Rxjs.Observable<infer U> ? U : unknown;
export declare type IUnpackAxiosObservableData<T extends Rxjs.Observable<any>> = T extends IAxiosObservable<infer U> ? U : T extends Rxjs.Observable<infer U> ? U : unknown;
export declare function subscribeObservable<T extends Rxjs.Observable<any>>(ob: T, observer?: PartialObserver<IUnpackObservableData<T>>): Rxjs.Subscription;
export declare function resolveObservable<T extends Rxjs.Observable<any>>(ob: T, observer?: PartialObserver<IUnpackObservableData<T>>): Bluebird<Rxjs.Subscription>;
declare const _default: typeof import("./util");
export default _default;
export declare function getThisTypeMetadata<T extends any>(metadataKey: any, target: ThisType<any>): T;
export declare function setThisTypeMetadata(metadataKey: any, metadataValue: any, target: ThisType<any>): void;
export declare function getClassMetadata<T extends any>(metadataKey: any, target: IClassWithPrototype): T;
export declare function setClassMetadata(metadataKey: any, metadataValue: any, target: IClassWithPrototype): void;
