import { NamedValues } from './named-values';
import { IEnumRestClientMetadataMethod } from './rest-client';
/** HTTP Method to be used in the request. */
export declare type HttpMethod = IEnumRestClientMetadataMethod;
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
    readonly headers: NamedValues;
    readonly params: NamedValues<Record<string, any>>;
    constructor(url: string, method: HttpMethod, body?: any, headers?: NamedValues, params?: NamedValues<Record<string, any>>);
    toValue(): {
        url: string;
        method: IEnumRestClientMetadataMethod;
        body: any;
        headers: import("./named-values").StringMap<string>;
        params: Record<string, any>;
    };
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
}
