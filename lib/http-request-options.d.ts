import { NamedValues, StringMap } from './named-values';
import { IEnumRestClientMetadataMethod } from './rest-client';
import { IAxiosRequestConfig } from './axios';
/** HTTP Method to be used in the request. */
export declare type HttpMethod = IEnumRestClientMetadataMethod;
export interface IHttpRequestHeaders extends StringMap<any> {
    Accepts?: string | 'application/json';
    'Accept-Language'?: string;
    'Accept-Encoding'?: string;
    'Referer'?: string;
    'Connection'?: string;
    'Upgrade-Insecure-Requests'?: string;
    'If-Modified-Since'?: string;
    'If-None-Match'?: string;
    'Content-Type'?: string | 'application/json';
    'User-Agent'?: string;
    'Cache-Control'?: string;
    'Authorization'?: string;
    'Cookie'?: string;
    'Content-Length'?: string;
    'Date'?: string;
    'Max-Forwards'?: number;
    'Origin'?: string;
    'Proxy-Authorization'?: string;
    'Range'?: string;
    'X-Requested-With'?: string;
    'X-Forwarded-For'?: string;
    'X-Forwarded-Host'?: string;
    'X-HTTP-Method-Override'?: string;
    'X-Att-Deviceid'?: string;
    'X-Wap-Profile'?: string;
    'Access-Control-Allow-Origin'?: string | '*';
    'Allow'?: string;
}
export interface IHttpRequestOptions {
    url: string;
    method: IEnumRestClientMetadataMethod;
    body: any;
    headers: IHttpRequestHeaders;
    params: Record<string, any>;
}
/**
 * HTTP Request options.
 *  - url: required request URL
 *  - method: required request method (e.g. GET)
 *  - body: optional content to be sent as the request body
 *  - headers: optional HTTP headers to be added to the request
 *  - params: optional query parameters to be sent along with the request
 */
export declare class HttpRequestOptions {
    readonly url: string;
    readonly method: HttpMethod;
    readonly body: any;
    readonly headers: NamedValues<IHttpRequestHeaders>;
    readonly params: NamedValues<Record<string, any>>;
    constructor(url: string, method: HttpMethod, body?: any, headers?: NamedValues<IHttpRequestHeaders>, params?: NamedValues<Record<string, any>>);
    toValue(): IHttpRequestOptions;
    /**
     * Detects the content type from the request body.
     */
    getContentType(): string;
    /**
     * Returns the body serialized into a string.
     */
    getSerializedBody(): string;
    /**
     * Gets the request URL including eventual query string.
     */
    getUrl(): string;
    static toValue(options: IAxiosRequestConfig | HttpRequestOptions | IHttpRequestOptions): IHttpRequestOptions | IAxiosRequestConfig;
}
export default HttpRequestOptions;
