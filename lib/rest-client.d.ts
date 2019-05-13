import 'reflect-metadata';
import { HttpMethod, HttpRequestOptions, IHttpRequestHeaders } from './http-request-options';
import { HttpService } from './http-service';
import { NamedValues, StringMap } from './named-values';
import { EnumRestClientMetadata, SymbolBaseUrl, SymbolDefaultHeaders, SymbolHttpClient, SymbolRequestInterceptor } from './util';
import { IAxiosObservable as Observable, IAxiosRequestConfig } from './axios';
interface Parameter<T = any> {
    key: string;
    parameterIndex: number;
    defaultValue?: T;
}
export declare type UnpackRequestOptions<H extends HttpService> = H extends HttpService<infer U> ? U : IAxiosRequestConfig;
/**
 * An interceptor is a function that takes the prepared HTTP request data and returns them modified.
 */
export declare type HttpRequestInterceptor<H extends HttpService> = <T extends HttpRequestOptions>(request: T) => UnpackRequestOptions<H> | any;
export interface IRestClientOptions<H extends HttpService> {
    httpClient: H;
    requestInterceptor?: HttpRequestInterceptor<H>;
}
/**
 * Abstract base class for the REST clients.
 */
export declare abstract class RestClient<H extends HttpService = HttpService> {
    readonly [SymbolHttpClient]: H;
    /**
     * Request interceptor allowing to modifiy the collected request data before sending it.
     * Typical use is the insertion of an authorization token to the request headers.
     * Leave null if you don't want to use it.
     */
    protected [SymbolRequestInterceptor]: HttpRequestInterceptor<H>;
    constructor(options: IRestClientOptions<H>);
    readonly $baseURL: string;
    readonly $http: H;
    $request<T>(options: UnpackRequestOptions<H>): Observable<T>;
    /**
     * Returns the base of the REST API URL.
     */
    [SymbolBaseUrl](): string;
    /**
     * Returns the default HTTP headers attached to each request.
     */
    [SymbolDefaultHeaders](): IHttpRequestHeaders;
}
/**
 * Sets the default HTTP headers attached to each request to the REST API.
 * Intended to use as a decorator: @DefaultHeaders({'Header': 'value', 'Header2': 'value'}
 * @param headers   The headers in key-value pairs.
 */
export declare function DefaultHeaders(headers: IHttpRequestHeaders): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
/**
 * Sets the base URL of the REST API.
 * Intended to use as a decorator: @BaseUrl("http://...")
 * @param url   the base URL.
 */
export declare function BaseUrl(url: string | URL): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare type IClassWithPrototype<T extends object = object> = object & {
    prototype: T;
};
export declare type IEnumRestClientMetadataParam = EnumRestClientMetadata.PARAM_PATH | EnumRestClientMetadata.PARAM_QUERY | EnumRestClientMetadata.PARAM_BODY | EnumRestClientMetadata.PARAM_HEADER;
export declare type IEnumRestClientMetadataMethod = EnumRestClientMetadata.METHOD_GET | EnumRestClientMetadata.METHOD_POST | EnumRestClientMetadata.METHOD_PUT | EnumRestClientMetadata.METHOD_PATCH | EnumRestClientMetadata.METHOD_DELETE | EnumRestClientMetadata.METHOD_HEAD;
export declare type IEnumRestClientMetadataExclude = Exclude<EnumRestClientMetadata, IEnumRestClientMetadataParam>;
export interface IRestClientMethodMetadataReturn {
    [EnumRestClientMetadata.PARAM_PATH]: Parameter[];
    [EnumRestClientMetadata.PARAM_QUERY]: Parameter[];
    [EnumRestClientMetadata.PARAM_BODY]: Parameter[];
    [EnumRestClientMetadata.PARAM_HEADER]: Parameter[];
    [EnumRestClientMetadata.METHOD]: IEnumRestClientMetadataMethod;
    [EnumRestClientMetadata.BASE_URL]: string;
    [EnumRestClientMetadata.DEFAULT_HEADERS]: StringMap;
}
export declare function getRestClientMethodMetadata<K extends IEnumRestClientMetadataParam, RC extends RestClient = RestClient>(metadataKey: K, target: RC, propertyKey: symbol | string): IRestClientMethodMetadataReturn[K];
export declare function getRestClientMethodMetadata<T extends unknown, RC extends RestClient = RestClient>(metadataKey: IEnumRestClientMetadataExclude, target: RC, propertyKey: symbol | string): T;
export declare function setRestClientMethodMetadata<K extends IEnumRestClientMetadataParam, RC extends RestClient>(metadataKey: K, target: RC, propertyKey: symbol | string, metadataValue: IRestClientMethodMetadataReturn[K]): void;
export declare function setRestClientMethodMetadata<RC extends RestClient>(metadataKey: IEnumRestClientMetadataExclude, target: RC, propertyKey: symbol | string, metadataValue: any): void;
/**
 * Path variable of a method's URL, type: string.
 * @param key   path key to bind value.
 */
export declare const Path: (key: string, defaultValue?: any) => <RC extends RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: any, parameterIndex: number) => void;
/**
 * Query value of a method's URL, type: string.
 * @param key   query key to bind value.
 */
export declare const Query: (key: string, defaultValue?: any) => <RC extends RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: any, parameterIndex: number) => void;
/**
 * Body of a REST method, type: key-value pair object.
 * Only one body per method!
 */
export declare const Body: <RC extends RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: any, parameterIndex: number) => void;
/**
 * Custom header of a REST method, type: string.
 * @param key   header key to bind value.
 */
export declare const Header: (key: string, defaultValue?: any) => <RC extends RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: any, parameterIndex: number) => void;
export interface IRestClientMethodDescriptor<T extends Function, SM extends StringMap = StringMap> extends TypedPropertyDescriptor<T> {
    headers?: NamedValues<SM>;
}
/**
 * Set custom headers for a REST method.
 * @param headersDef    custom headers in key-value pairs.
 */
export declare function Headers<SM extends StringMap>(headersDef: SM): <F extends Function>(_target: RestClient<HttpService<IAxiosRequestConfig>>, _propertyKey: string, descriptor: IRestClientMethodDescriptor<F, SM>) => IRestClientMethodDescriptor<F, SM>;
export declare function methodBuilder(method: HttpMethod): (url: string) => <RC extends RestClient<HttpService<IAxiosRequestConfig>> = RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: string | symbol, descriptor: IRestClientMethodDescriptor<Function, StringMap<string>>) => void;
/**
 * GET method.
 * @param url   resource URL of the method
 */
export declare const GET: (url: string) => <RC extends RestClient<HttpService<IAxiosRequestConfig>> = RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: string | symbol, descriptor: IRestClientMethodDescriptor<Function, StringMap<string>>) => void;
/**
 * POST method.
 * @param url   resource URL of the method
 */
export declare const POST: (url: string) => <RC extends RestClient<HttpService<IAxiosRequestConfig>> = RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: string | symbol, descriptor: IRestClientMethodDescriptor<Function, StringMap<string>>) => void;
/**
 * PUT method.
 * @param url   resource URL of the method
 */
export declare const PUT: (url: string) => <RC extends RestClient<HttpService<IAxiosRequestConfig>> = RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: string | symbol, descriptor: IRestClientMethodDescriptor<Function, StringMap<string>>) => void;
/**
 * PATCH method.
 * @param url   resource URL of the method
 */
export declare const PATCH: (url: string) => <RC extends RestClient<HttpService<IAxiosRequestConfig>> = RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: string | symbol, descriptor: IRestClientMethodDescriptor<Function, StringMap<string>>) => void;
/**
 * DELETE method.
 * @param url   resource URL of the method
 */
export declare const DELETE: (url: string) => <RC extends RestClient<HttpService<IAxiosRequestConfig>> = RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: string | symbol, descriptor: IRestClientMethodDescriptor<Function, StringMap<string>>) => void;
/**
 * HEAD method.
 * @param url   resource URL of the method
 */
export declare const HEAD: (url: string) => <RC extends RestClient<HttpService<IAxiosRequestConfig>> = RestClient<HttpService<IAxiosRequestConfig>>>(target: RC, propertyKey: string | symbol, descriptor: IRestClientMethodDescriptor<Function, StringMap<string>>) => void;
export default RestClient;
