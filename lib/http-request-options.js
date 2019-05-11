"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const named_values_1 = require("./named-values");
const util_1 = require("./util");
/**
 * HTTP Request options.
 *  - url: required request URL
 *  - method: required request method (e.g. GET)
 *  - body: optional content to be sent as the request body
 *  - headers: optional HTTP headers to be added to the request
 *  - params: optional query parameters to be sent along with the request
 */
class HttpRequestOptions {
    constructor(url, method, body = null, headers = null, params = null) {
        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = headers;
        this.params = params;
        const empty = new named_values_1.NamedValues();
        this.headers = new named_values_1.NamedValues((headers || empty).values);
        this.params = new named_values_1.NamedValues((params || empty).values);
        if (!this.headers.contains('Content-Type')) {
            this.headers.set('Content-Type', this.getContentType());
        }
        if (!this.headers.contains('Accepts')) {
            this.headers.set('Accepts', 'application/json, text/plain, */*');
        }
    }
    toValue() {
        return {
            url: this.url,
            method: this.method,
            body: this.body,
            headers: this.headers.toValue(),
            params: this.params.toValue(),
        };
    }
    /**
     * Detects the content type from the request body.
     */
    getContentType() {
        const specifiedType = this.headers.get('Content-Type');
        if (specifiedType) {
            return specifiedType;
        }
        if (!this.body || typeof this.body === 'object') {
            return 'application/json';
        }
        return 'text/plain';
    }
    /**
     * Returns the body serialized into a string.
     */
    getSerializedBody() {
        if (!this.body) {
            return null;
        }
        if (this.getContentType() === 'application/json') {
            return JSON.stringify(this.body);
        }
        return this.body.toString();
    }
    /**
     * Gets the request URL including eventual query string.
     */
    getUrl() {
        if (!this.params.length) {
            return this.url;
        }
        const paramsString = Object
            .keys(this.params.values)
            .map(p => `${util_1.standardQueryEncoding(p)}=${util_1.standardQueryEncoding(this.params.values[p])}`)
            .join('&');
        const queryIndex = this.url.indexOf('?');
        const separator = queryIndex < 0 ? '?' : (queryIndex < this.url.length - 1 ? '&' : '');
        return `${this.url}${separator}${paramsString}`;
    }
}
exports.HttpRequestOptions = HttpRequestOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1yZXF1ZXN0LW9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLXJlcXVlc3Qtb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE2QztBQUU3QyxpQ0FBK0M7QUFLL0M7Ozs7Ozs7R0FPRztBQUNILE1BQWEsa0JBQWtCO0lBRTlCLFlBQ1UsR0FBVyxFQUNYLE1BQWtCLEVBQ2xCLE9BQVksSUFBSSxFQUNoQixVQUF1QixJQUFJLEVBQzNCLFNBQTJDLElBQUk7UUFKL0MsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUF5QztRQUd4RCxNQUFNLEtBQUssR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksMEJBQVcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksMEJBQVcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQzFDO1lBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNyQztZQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0YsQ0FBQztJQUVELE9BQU87UUFFTixPQUFPO1lBQ04sR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7U0FDN0IsQ0FBQTtJQUNGLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFFYixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RCxJQUFJLGFBQWEsRUFDakI7WUFDQyxPQUFPLGFBQWEsQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQy9DO1lBQ0MsT0FBTyxrQkFBa0IsQ0FBQztTQUMxQjtRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNILGlCQUFpQjtRQUVoQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDZDtZQUNDLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxrQkFBa0IsRUFDaEQ7WUFDQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFFTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQ3ZCO1lBQ0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2hCO1FBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyw0QkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSw0QkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDdkYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVosTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkYsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQ2pELENBQUM7Q0FDRDtBQTdGRCxnREE2RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYW1lZFZhbHVlcyB9IGZyb20gJy4vbmFtZWQtdmFsdWVzJztcbmltcG9ydCB7IElFbnVtUmVzdENsaWVudE1ldGFkYXRhTWV0aG9kIH0gZnJvbSAnLi9yZXN0LWNsaWVudCc7XG5pbXBvcnQgeyBzdGFuZGFyZFF1ZXJ5RW5jb2RpbmcgfSBmcm9tICcuL3V0aWwnO1xuXG4vKiogSFRUUCBNZXRob2QgdG8gYmUgdXNlZCBpbiB0aGUgcmVxdWVzdC4gKi9cbmV4cG9ydCB0eXBlIEh0dHBNZXRob2QgPSBJRW51bVJlc3RDbGllbnRNZXRhZGF0YU1ldGhvZDtcblxuLyoqXG4gKiBIVFRQIFJlcXVlc3Qgb3B0aW9ucy5cbiAqICAtIHVybDogcmVxdWlyZWQgcmVxdWVzdCBVUkxcbiAqICAtIG1ldGhvZDogcmVxdWlyZWQgcmVxdWVzdCBtZXRob2QgKGUuZy4gR0VUKVxuICogIC0gYm9keTogb3B0aW9uYWwgY29udGVudCB0byBiZSBzZW50IGFzIHRoZSByZXF1ZXN0IGJvZHlcbiAqICAtIGhlYWRlcnM6IG9wdGlvbmFsIEhUVFAgaGVhZGVycyB0byBiZSBhZGRlZCB0byB0aGUgcmVxdWVzdFxuICogIC0gcGFyYW1zOiBvcHRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgcmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgSHR0cFJlcXVlc3RPcHRpb25zXG57XG5cdGNvbnN0cnVjdG9yKFxuXHRcdHJlYWRvbmx5IHVybDogc3RyaW5nLFxuXHRcdHJlYWRvbmx5IG1ldGhvZDogSHR0cE1ldGhvZCxcblx0XHRyZWFkb25seSBib2R5OiBhbnkgPSBudWxsLFxuXHRcdHJlYWRvbmx5IGhlYWRlcnM6IE5hbWVkVmFsdWVzID0gbnVsbCxcblx0XHRyZWFkb25seSBwYXJhbXM6IE5hbWVkVmFsdWVzPFJlY29yZDxzdHJpbmcsIGFueT4+ID0gbnVsbCxcblx0KVxuXHR7XG5cdFx0Y29uc3QgZW1wdHkgPSBuZXcgTmFtZWRWYWx1ZXMoKTtcblx0XHR0aGlzLmhlYWRlcnMgPSBuZXcgTmFtZWRWYWx1ZXMoKGhlYWRlcnMgfHwgZW1wdHkpLnZhbHVlcyk7XG5cdFx0dGhpcy5wYXJhbXMgPSBuZXcgTmFtZWRWYWx1ZXMoKHBhcmFtcyB8fCBlbXB0eSkudmFsdWVzKTtcblxuXHRcdGlmICghdGhpcy5oZWFkZXJzLmNvbnRhaW5zKCdDb250ZW50LVR5cGUnKSlcblx0XHR7XG5cdFx0XHR0aGlzLmhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCB0aGlzLmdldENvbnRlbnRUeXBlKCkpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5oZWFkZXJzLmNvbnRhaW5zKCdBY2NlcHRzJykpXG5cdFx0e1xuXHRcdFx0dGhpcy5oZWFkZXJzLnNldCgnQWNjZXB0cycsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcblx0XHR9XG5cdH1cblxuXHR0b1ZhbHVlKClcblx0e1xuXHRcdHJldHVybiB7XG5cdFx0XHR1cmw6IHRoaXMudXJsLFxuXHRcdFx0bWV0aG9kOiB0aGlzLm1ldGhvZCxcblx0XHRcdGJvZHk6IHRoaXMuYm9keSxcblx0XHRcdGhlYWRlcnM6IHRoaXMuaGVhZGVycy50b1ZhbHVlKCksXG5cdFx0XHRwYXJhbXM6IHRoaXMucGFyYW1zLnRvVmFsdWUoKSxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZWN0cyB0aGUgY29udGVudCB0eXBlIGZyb20gdGhlIHJlcXVlc3QgYm9keS5cblx0ICovXG5cdGdldENvbnRlbnRUeXBlKCk6IHN0cmluZ1xuXHR7XG5cdFx0Y29uc3Qgc3BlY2lmaWVkVHlwZSA9IHRoaXMuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpO1xuXHRcdGlmIChzcGVjaWZpZWRUeXBlKVxuXHRcdHtcblx0XHRcdHJldHVybiBzcGVjaWZpZWRUeXBlO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5ib2R5IHx8IHR5cGVvZiB0aGlzLmJvZHkgPT09ICdvYmplY3QnKVxuXHRcdHtcblx0XHRcdHJldHVybiAnYXBwbGljYXRpb24vanNvbic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICd0ZXh0L3BsYWluJztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBib2R5IHNlcmlhbGl6ZWQgaW50byBhIHN0cmluZy5cblx0ICovXG5cdGdldFNlcmlhbGl6ZWRCb2R5KCk6IHN0cmluZ1xuXHR7XG5cdFx0aWYgKCF0aGlzLmJvZHkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZ2V0Q29udGVudFR5cGUoKSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nKVxuXHRcdHtcblx0XHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmJvZHkpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmJvZHkudG9TdHJpbmcoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSByZXF1ZXN0IFVSTCBpbmNsdWRpbmcgZXZlbnR1YWwgcXVlcnkgc3RyaW5nLlxuXHQgKi9cblx0Z2V0VXJsKCk6IHN0cmluZ1xuXHR7XG5cdFx0aWYgKCF0aGlzLnBhcmFtcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMudXJsO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhcmFtc1N0cmluZyA9IE9iamVjdFxuXHRcdFx0LmtleXModGhpcy5wYXJhbXMudmFsdWVzKVxuXHRcdFx0Lm1hcChwID0+IGAke3N0YW5kYXJkUXVlcnlFbmNvZGluZyhwKX09JHtzdGFuZGFyZFF1ZXJ5RW5jb2RpbmcodGhpcy5wYXJhbXMudmFsdWVzW3BdKX1gKVxuXHRcdFx0LmpvaW4oJyYnKTtcblxuXHRcdGNvbnN0IHF1ZXJ5SW5kZXggPSB0aGlzLnVybC5pbmRleE9mKCc/Jyk7XG5cdFx0Y29uc3Qgc2VwYXJhdG9yID0gcXVlcnlJbmRleCA8IDAgPyAnPycgOiAocXVlcnlJbmRleCA8IHRoaXMudXJsLmxlbmd0aCAtIDEgPyAnJicgOiAnJyk7XG5cblx0XHRyZXR1cm4gYCR7dGhpcy51cmx9JHtzZXBhcmF0b3J9JHtwYXJhbXNTdHJpbmd9YDtcblx0fVxufVxuXG4iXX0=