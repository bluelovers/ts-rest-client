import { StringMap } from './named-values';
/**
 * Holds information about a failed HTTP request.
 * If the request failed on server side, error is to be filled with the response body.
 * If the request failed on client side, error is to be filled with an Event object describing what happened.
 */
export declare class HttpErrorResponse implements Error {
    readonly error: any | null | Error;
    readonly headers: StringMap;
    readonly message: string;
    readonly name = "HttpErrorResponse";
    readonly stack?: string | undefined;
    readonly status: number;
    readonly statusText: string;
    readonly url?: string;
    constructor(init: {
        error?: any;
        headers?: StringMap;
        status?: number;
        statusText?: string;
        url?: string;
    });
}
export default HttpErrorResponse;
