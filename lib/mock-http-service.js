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
exports.default = MockHttpService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1odHRwLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2NrLWh0dHAtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFzQztBQUd0QywrREFBMEQ7QUFjMUQ7OztHQUdHO0FBQ0gsTUFBYSxlQUFlO0lBQzFCLElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELGtEQUFrRDtJQUNsRDtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUN0QixJQUFJLEVBQUUsRUFBRTtZQUNSLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsR0FBRztTQUNaLENBQUM7SUFDSixDQUFDO0lBS0Q7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxPQUE2QztRQUNwRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN4RyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsUUFBUSxDQUFDLE9BQVksRUFBRSxFQUFFLFNBQWlCLEdBQUcsRUFBRSxVQUFtQixFQUFFLE9BQW1CO1FBQ3JGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUM3RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLEtBQVk7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDL0UsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUN0QixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDbkYsTUFBTSxFQUFFLENBQUM7WUFDVCxVQUFVLEVBQUUsZUFBZTtTQUM1QixDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUEyQjtRQUNqQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFFL0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBRXJGLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSTtnQkFDRixPQUFPLFNBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8saUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtTQUNGO1FBRUQsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDakMsT0FBTyxTQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7UUFFRCxPQUFPLGlCQUFVLENBQUMsSUFBSSx1Q0FBaUIsQ0FBQztZQUN0QyxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUs7WUFDcEIsT0FBTztZQUNQLE1BQU07WUFDTixVQUFVO1lBQ1YsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRztTQUM5QixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDRjtBQXhGRCwwQ0F3RkM7QUFFRCxrQkFBZSxlQUFlLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSUF4aW9zT2JzZXJ2YWJsZSBhcyBPYnNlcnZhYmxlIH0gZnJvbSAnLi9heGlvcyc7XG5cbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9odHRwLWVycm9yLXJlc3BvbnNlJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4vaHR0cC1yZXF1ZXN0LW9wdGlvbnMnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuL2h0dHAtc2VydmljZSc7XG5pbXBvcnQgeyBTdHJpbmdNYXAgfSBmcm9tICcuL25hbWVkLXZhbHVlcyc7XG5cbmludGVyZmFjZSBIdHRwUmVzcG9uc2VPcHRpb25zIHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gIGJvZHk/OiBhbnk7XG4gIGhlYWRlcnM/OiBTdHJpbmdNYXA7XG4gIGVycm9yOiBhbnkgfCBudWxsO1xuICBjYWxsYmFjaz86IChyZXF1ZXN0OiBIdHRwUmVxdWVzdE9wdGlvbnMpID0+IGFueTtcbn1cblxuLyoqXG4gKiBNb2NrZWQgSHR0cFNlcnZpY2UgdGhhdCBjYW4gYmUgdXNlZCBmb3IgdW5pdCB0ZXN0aW5nLlxuICogSXQgYWxsb3dzIHlvdSB0byBzcGVjaWZ5IHdoYXQgcmVzcG9uc2Ugc2hvdWxkIGJlIHJldHVybmVkIHRvIHRoZSByZXF1ZXN0IG9yIHNpbXVsYXRlIGNsaWVudC1zaWRlIGVycm9ycy5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tIdHRwU2VydmljZSBpbXBsZW1lbnRzIEh0dHBTZXJ2aWNlIHtcbiAgZ2V0IHJlcXVlc3RPcHRpb25zKCk6IEh0dHBSZXF1ZXN0T3B0aW9ucyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0T3B0aW9ucztcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplcyBhIG5ldyBNb2NrSHR0cFNlcnZpY2UgaW5zdGFuY2UuICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3JlcXVlc3RPcHRpb25zID0gbnVsbDtcbiAgICB0aGlzLl9yZXNwb25zZU9wdGlvbnMgPSB7XG4gICAgICBib2R5OiB7fSxcbiAgICAgIGNhbGxiYWNrOiBudWxsLFxuICAgICAgZXJyb3I6IG51bGwsXG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVxdWVzdE9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyB8IG51bGw7XG4gIHByaXZhdGUgX3Jlc3BvbnNlT3B0aW9uczogSHR0cFJlc3BvbnNlT3B0aW9ucztcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGhhbmRsZSBlYWNoIHN1YnNlcXVlbnQgcmVxdWVzdC5cbiAgICogTk9URTogVG8gc2ltdWxhdGUgYW4gZXJyb3IganVzdCB0aHJvdyB0aGUgY29ycmVzcG9uZGluZyBIdHRwRXJyb3JSZXNwb25zZS5cbiAgICogQHBhcmFtIGhhbmRsZXIgRnVuY3Rpb24gdGhhdCB3aWxsIHJlY2VpdmUgdGhlIHJlcXVlc3QgZGF0YSBhbmQgcmV0dXJuIGEgcmVzcG9uc2UuXG4gICAqL1xuICBjYWxsYmFjayhoYW5kbGVyOiAocmVxdWVzdDogSHR0cFJlcXVlc3RPcHRpb25zKSA9PiBhbnkpIHtcbiAgICB0aGlzLl9yZXNwb25zZU9wdGlvbnMgPSB7IHN0YXR1czogMCwgYm9keTogbnVsbCwgaGVhZGVyczogdW5kZWZpbmVkLCBlcnJvcjogbnVsbCwgY2FsbGJhY2s6IGhhbmRsZXIgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgYW4gSFRUUCByZXNwb25zZSB0aGF0IHNob3VsZCBiZSByZXR1cm5lZCB0byB0aGUgZm9sbG93aW5nIHJlcXVlc3QuXG4gICAqIEBwYXJhbSBib2R5IE9wdGlvbmFsIGJvZHkgdG8gYmUgcmV0dXJuZWQgaW4gdGhlIHJlc3BvbnNlXG4gICAqIEBwYXJhbSBzdGF0dXMgSFRUUCBTdGF0dXMgY29kZTsgZGVmYXVsdCBpcyAyMDBcbiAgICogQHBhcmFtIHN0YXR1c1RleHQgT3B0aW9uYWwgc3RhdHVzIHRleHRcbiAgICogQHBhcmFtIGhlYWRlcnMgT3B0aW9uYWwgaGVhZGVycyB0byBiZSByZXR1cm5lZCBpbiB0aGUgcmVzcG9uc2VcbiAgICovXG4gIHJlc3BvbnNlKGJvZHk6IGFueSA9IHt9LCBzdGF0dXM6IG51bWJlciA9IDIwMCwgc3RhdHVzVGV4dD86IHN0cmluZywgaGVhZGVycz86IFN0cmluZ01hcCkge1xuICAgIHRoaXMuX3Jlc3BvbnNlT3B0aW9ucyA9IHsgYm9keSwgc3RhdHVzLCBzdGF0dXNUZXh0LCBlcnJvcjogbnVsbCwgaGVhZGVycywgY2FsbGJhY2s6IG51bGwgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyB0aGUgZm9sbG93aW5nIHJlcXVlc3QgdGhyb3cgYSBnaXZlbiBjbGllbnQtc2lkZSBlcnJvci5cbiAgICogQHBhcmFtIGVycm9yIFRoZSBFdmVudCBvYmplY3QgdG8gYmUgcmV0dXJuZWQgaW4gdGhlIEh0dHBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBjbGllbnRFcnJvcihlcnJvcjogRXZlbnQpIHtcbiAgICB0aGlzLl9yZXNwb25zZU9wdGlvbnMgPSB7IHN0YXR1czogMCwgYm9keTogbnVsbCwgaGVhZGVyczogdW5kZWZpbmVkLCBlcnJvciB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbXVsYXRlcyBuZXR3b3JrIG9mZmxpbmUgZXJyb3IuXG4gICAqL1xuICBvZmZsaW5lKCkge1xuICAgIHRoaXMuX3Jlc3BvbnNlT3B0aW9ucyA9IHtcbiAgICAgIGJvZHk6IG51bGwsXG4gICAgICBlcnJvcjogbmV3IFByb2dyZXNzRXZlbnQoJ2Vycm9yJywgeyBsb2FkZWQ6IDAsIGxlbmd0aENvbXB1dGFibGU6IGZhbHNlLCB0b3RhbDogMCB9KSxcbiAgICAgIHN0YXR1czogMCxcbiAgICAgIHN0YXR1c1RleHQ6ICdVbmtub3duIEVycm9yJyxcbiAgICB9O1xuICB9XG5cbiAgcmVxdWVzdChvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJlcXVlc3QgZGF0YScpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlcXVlc3RPcHRpb25zID0gb3B0aW9ucztcblxuICAgIGNvbnN0IHsgc3RhdHVzLCBzdGF0dXNUZXh0LCBib2R5LCBlcnJvciwgaGVhZGVycywgY2FsbGJhY2sgfSA9IHRoaXMuX3Jlc3BvbnNlT3B0aW9ucztcblxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG9mKGNhbGxiYWNrKG9wdGlvbnMpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDQwMCkge1xuICAgICAgcmV0dXJuIG9mKGJvZHkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7XG4gICAgICBlcnJvcjogYm9keSB8fCBlcnJvcixcbiAgICAgIGhlYWRlcnMsXG4gICAgICBzdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0LFxuICAgICAgdXJsOiB0aGlzLl9yZXF1ZXN0T3B0aW9ucy51cmwsXG4gICAgfSkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vY2tIdHRwU2VydmljZVxuIl19