import { IAxiosRequestConfig, IAxiosObservable } from './axios';
/**
 * Generic interface of an HTTP service capable of sending a request and return the response as an RxJs Observable.
 * In case of a successful HTTP request the observable has to contain the response body.
 * In case of an error the observable has to throw an HttpErrorResponse.
 * @see HttpErrorResponse
 */
export interface HttpService<O extends IAxiosRequestConfig = IAxiosRequestConfig> {
    /**
     * Performs an HTTP Request.
     * @param options request data
     */
    request<T>(options: O): IAxiosObservable<T>;
}
export default HttpService;
