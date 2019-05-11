import { Observable } from './util';
import { HttpRequestOptions } from './http-request-options';
import { HttpService } from './http-service';
import { StringMap } from './named-values';
/**
 * Mocked HttpService that can be used for unit testing.
 * It allows you to specify what response should be returned to the request or simulate client-side errors.
 */
export declare class MockHttpService implements HttpService {
    readonly requestOptions: HttpRequestOptions | null;
    /** Initializes a new MockHttpService instance. */
    constructor();
    private _requestOptions;
    private _responseOptions;
    /**
     * Specifies a callback that will handle each subsequent request.
     * NOTE: To simulate an error just throw the corresponding HttpErrorResponse.
     * @param handler Function that will receive the request data and return a response.
     */
    callback(handler: (request: HttpRequestOptions) => any): void;
    /**
     * Specifies an HTTP response that should be returned to the following request.
     * @param body Optional body to be returned in the response
     * @param status HTTP Status code; default is 200
     * @param statusText Optional status text
     * @param headers Optional headers to be returned in the response
     */
    response(body?: any, status?: number, statusText?: string, headers?: StringMap): void;
    /**
     * Makes the following request throw a given client-side error.
     * @param error The Event object to be returned in the HttpErrorResponse
     */
    clientError(error: Event): void;
    /**
     * Simulates network offline error.
     */
    offline(): void;
    request(options: HttpRequestOptions): Observable<any>;
}
