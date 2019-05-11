"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const http_error_response_1 = require("./http-error-response");
/**
 * Mocked HttpService that can be used for unit testing.
 * It allows you to specify what response should be returned to the request or simulate client-side errors.
 */
class MockHttpService {
    get requestOptions() {
        return this._requestOptions;
    }
    /** Initializes a new MockHttpService instance. */
    constructor() {
        this._requestOptions = null;
        this._responseOptions = {
            body: {},
            callback: null,
            error: null,
            status: 200,
        };
    }
    /**
     * Specifies a callback that will handle each subsequent request.
     * NOTE: To simulate an error just throw the corresponding HttpErrorResponse.
     * @param handler Function that will receive the request data and return a response.
     */
    callback(handler) {
        this._responseOptions = { status: 0, body: null, headers: undefined, error: null, callback: handler };
    }
    /**
     * Specifies an HTTP response that should be returned to the following request.
     * @param body Optional body to be returned in the response
     * @param status HTTP Status code; default is 200
     * @param statusText Optional status text
     * @param headers Optional headers to be returned in the response
     */
    response(body = {}, status = 200, statusText, headers) {
        this._responseOptions = { body, status, statusText, error: null, headers, callback: null };
    }
    /**
     * Makes the following request throw a given client-side error.
     * @param error The Event object to be returned in the HttpErrorResponse
     */
    clientError(error) {
        this._responseOptions = { status: 0, body: null, headers: undefined, error };
    }
    /**
     * Simulates network offline error.
     */
    offline() {
        this._responseOptions = {
            body: null,
            error: new ProgressEvent('error', { loaded: 0, lengthComputable: false, total: 0 }),
            status: 0,
            statusText: 'Unknown Error',
        };
    }
    request(options) {
        if (!options) {
            throw new Error('Invalid request data');
        }
        this._requestOptions = options;
        const { status, statusText, body, error, headers, callback } = this._responseOptions;
        if (callback) {
            try {
                return rxjs_1.of(callback(options));
            }
            catch (err) {
                return rxjs_1.throwError(err);
            }
        }
        if (status >= 200 && status < 400) {
            return rxjs_1.of(body);
        }
        return rxjs_1.throwError(new http_error_response_1.HttpErrorResponse({
            error: body || error,
            headers,
            status,
            statusText,
            url: this._requestOptions.url,
        }));
    }
}
exports.MockHttpService = MockHttpService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1odHRwLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2NrLWh0dHAtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrRDtBQUVsRCwrREFBMEQ7QUFjMUQ7OztHQUdHO0FBQ0gsTUFBYSxlQUFlO0lBQzFCLElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELGtEQUFrRDtJQUNsRDtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUN0QixJQUFJLEVBQUUsRUFBRTtZQUNSLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsR0FBRztTQUNaLENBQUM7SUFDSixDQUFDO0lBS0Q7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxPQUE2QztRQUNwRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN4RyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsUUFBUSxDQUFDLE9BQVksRUFBRSxFQUFFLFNBQWlCLEdBQUcsRUFBRSxVQUFtQixFQUFFLE9BQW1CO1FBQ3JGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUM3RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLEtBQVk7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDL0UsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUN0QixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDbkYsTUFBTSxFQUFFLENBQUM7WUFDVCxVQUFVLEVBQUUsZUFBZTtTQUM1QixDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUEyQjtRQUNqQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFFL0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBRXJGLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSTtnQkFDRixPQUFPLFNBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8saUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtTQUNGO1FBRUQsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDakMsT0FBTyxTQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7UUFFRCxPQUFPLGlCQUFVLENBQUMsSUFBSSx1Q0FBaUIsQ0FBQztZQUN0QyxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUs7WUFDcEIsT0FBTztZQUNQLE1BQU07WUFDTixVQUFVO1lBQ1YsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRztTQUM5QixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDRjtBQXhGRCwwQ0F3RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vaHR0cC1lcnJvci1yZXNwb25zZSc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL2h0dHAtcmVxdWVzdC1vcHRpb25zJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLXNlcnZpY2UnO1xuaW1wb3J0IHsgU3RyaW5nTWFwIH0gZnJvbSAnLi9uYW1lZC12YWx1ZXMnO1xuXG5pbnRlcmZhY2UgSHR0cFJlc3BvbnNlT3B0aW9ucyB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xuICBib2R5PzogYW55O1xuICBoZWFkZXJzPzogU3RyaW5nTWFwO1xuICBlcnJvcjogYW55IHwgbnVsbDtcbiAgY2FsbGJhY2s/OiAocmVxdWVzdDogSHR0cFJlcXVlc3RPcHRpb25zKSA9PiBhbnk7XG59XG5cbi8qKlxuICogTW9ja2VkIEh0dHBTZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHVuaXQgdGVzdGluZy5cbiAqIEl0IGFsbG93cyB5b3UgdG8gc3BlY2lmeSB3aGF0IHJlc3BvbnNlIHNob3VsZCBiZSByZXR1cm5lZCB0byB0aGUgcmVxdWVzdCBvciBzaW11bGF0ZSBjbGllbnQtc2lkZSBlcnJvcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2NrSHR0cFNlcnZpY2UgaW1wbGVtZW50cyBIdHRwU2VydmljZSB7XG4gIGdldCByZXF1ZXN0T3B0aW9ucygpOiBIdHRwUmVxdWVzdE9wdGlvbnMgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdE9wdGlvbnM7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgYSBuZXcgTW9ja0h0dHBTZXJ2aWNlIGluc3RhbmNlLiAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9yZXF1ZXN0T3B0aW9ucyA9IG51bGw7XG4gICAgdGhpcy5fcmVzcG9uc2VPcHRpb25zID0ge1xuICAgICAgYm9keToge30sXG4gICAgICBjYWxsYmFjazogbnVsbCxcbiAgICAgIGVycm9yOiBudWxsLFxuICAgICAgc3RhdHVzOiAyMDAsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlcXVlc3RPcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgfCBudWxsO1xuICBwcml2YXRlIF9yZXNwb25zZU9wdGlvbnM6IEh0dHBSZXNwb25zZU9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBoYW5kbGUgZWFjaCBzdWJzZXF1ZW50IHJlcXVlc3QuXG4gICAqIE5PVEU6IFRvIHNpbXVsYXRlIGFuIGVycm9yIGp1c3QgdGhyb3cgdGhlIGNvcnJlc3BvbmRpbmcgSHR0cEVycm9yUmVzcG9uc2UuXG4gICAqIEBwYXJhbSBoYW5kbGVyIEZ1bmN0aW9uIHRoYXQgd2lsbCByZWNlaXZlIHRoZSByZXF1ZXN0IGRhdGEgYW5kIHJldHVybiBhIHJlc3BvbnNlLlxuICAgKi9cbiAgY2FsbGJhY2soaGFuZGxlcjogKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0T3B0aW9ucykgPT4gYW55KSB7XG4gICAgdGhpcy5fcmVzcG9uc2VPcHRpb25zID0geyBzdGF0dXM6IDAsIGJvZHk6IG51bGwsIGhlYWRlcnM6IHVuZGVmaW5lZCwgZXJyb3I6IG51bGwsIGNhbGxiYWNrOiBoYW5kbGVyIH07XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmaWVzIGFuIEhUVFAgcmVzcG9uc2UgdGhhdCBzaG91bGQgYmUgcmV0dXJuZWQgdG8gdGhlIGZvbGxvd2luZyByZXF1ZXN0LlxuICAgKiBAcGFyYW0gYm9keSBPcHRpb25hbCBib2R5IHRvIGJlIHJldHVybmVkIGluIHRoZSByZXNwb25zZVxuICAgKiBAcGFyYW0gc3RhdHVzIEhUVFAgU3RhdHVzIGNvZGU7IGRlZmF1bHQgaXMgMjAwXG4gICAqIEBwYXJhbSBzdGF0dXNUZXh0IE9wdGlvbmFsIHN0YXR1cyB0ZXh0XG4gICAqIEBwYXJhbSBoZWFkZXJzIE9wdGlvbmFsIGhlYWRlcnMgdG8gYmUgcmV0dXJuZWQgaW4gdGhlIHJlc3BvbnNlXG4gICAqL1xuICByZXNwb25zZShib2R5OiBhbnkgPSB7fSwgc3RhdHVzOiBudW1iZXIgPSAyMDAsIHN0YXR1c1RleHQ/OiBzdHJpbmcsIGhlYWRlcnM/OiBTdHJpbmdNYXApIHtcbiAgICB0aGlzLl9yZXNwb25zZU9wdGlvbnMgPSB7IGJvZHksIHN0YXR1cywgc3RhdHVzVGV4dCwgZXJyb3I6IG51bGwsIGhlYWRlcnMsIGNhbGxiYWNrOiBudWxsIH07XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgdGhlIGZvbGxvd2luZyByZXF1ZXN0IHRocm93IGEgZ2l2ZW4gY2xpZW50LXNpZGUgZXJyb3IuXG4gICAqIEBwYXJhbSBlcnJvciBUaGUgRXZlbnQgb2JqZWN0IHRvIGJlIHJldHVybmVkIGluIHRoZSBIdHRwRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgY2xpZW50RXJyb3IoZXJyb3I6IEV2ZW50KSB7XG4gICAgdGhpcy5fcmVzcG9uc2VPcHRpb25zID0geyBzdGF0dXM6IDAsIGJvZHk6IG51bGwsIGhlYWRlcnM6IHVuZGVmaW5lZCwgZXJyb3IgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW11bGF0ZXMgbmV0d29yayBvZmZsaW5lIGVycm9yLlxuICAgKi9cbiAgb2ZmbGluZSgpIHtcbiAgICB0aGlzLl9yZXNwb25zZU9wdGlvbnMgPSB7XG4gICAgICBib2R5OiBudWxsLFxuICAgICAgZXJyb3I6IG5ldyBQcm9ncmVzc0V2ZW50KCdlcnJvcicsIHsgbG9hZGVkOiAwLCBsZW5ndGhDb21wdXRhYmxlOiBmYWxzZSwgdG90YWw6IDAgfSksXG4gICAgICBzdGF0dXM6IDAsXG4gICAgICBzdGF0dXNUZXh0OiAnVW5rbm93biBFcnJvcicsXG4gICAgfTtcbiAgfVxuXG4gIHJlcXVlc3Qob3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCByZXF1ZXN0IGRhdGEnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZXF1ZXN0T3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBjb25zdCB7IHN0YXR1cywgc3RhdHVzVGV4dCwgYm9keSwgZXJyb3IsIGhlYWRlcnMsIGNhbGxiYWNrIH0gPSB0aGlzLl9yZXNwb25zZU9wdGlvbnM7XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBvZihjYWxsYmFjayhvcHRpb25zKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCA0MDApIHtcbiAgICAgIHJldHVybiBvZihib2R5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xuICAgICAgZXJyb3I6IGJvZHkgfHwgZXJyb3IsXG4gICAgICBoZWFkZXJzLFxuICAgICAgc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dCxcbiAgICAgIHVybDogdGhpcy5fcmVxdWVzdE9wdGlvbnMudXJsLFxuICAgIH0pKTtcbiAgfVxufVxuIl19