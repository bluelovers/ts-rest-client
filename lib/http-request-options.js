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
exports.default = HttpRequestOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1yZXF1ZXN0LW9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLXJlcXVlc3Qtb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE2QztBQUU3QyxpQ0FBK0M7QUFLL0M7Ozs7Ozs7R0FPRztBQUNILE1BQWEsa0JBQWtCO0lBRTlCLFlBQ1UsR0FBVyxFQUNYLE1BQWtCLEVBQ2xCLE9BQVksSUFBSSxFQUNoQixVQUF1QixJQUFJLEVBQzNCLFNBQTJDLElBQUk7UUFKL0MsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUF5QztRQUd4RCxNQUFNLEtBQUssR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksMEJBQVcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksMEJBQVcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQzFDO1lBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNyQztZQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0YsQ0FBQztJQUVELE9BQU87UUFFTixPQUFPO1lBQ04sR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7U0FDN0IsQ0FBQTtJQUNGLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFFYixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RCxJQUFJLGFBQWEsRUFDakI7WUFDQyxPQUFPLGFBQWEsQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQy9DO1lBQ0MsT0FBTyxrQkFBa0IsQ0FBQztTQUMxQjtRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNILGlCQUFpQjtRQUVoQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDZDtZQUNDLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxrQkFBa0IsRUFDaEQ7WUFDQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFFTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQ3ZCO1lBQ0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2hCO1FBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyw0QkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSw0QkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDdkYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVosTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkYsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQ2pELENBQUM7Q0FDRDtBQTdGRCxnREE2RkM7QUFFRCxrQkFBZSxrQkFBa0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hbWVkVmFsdWVzIH0gZnJvbSAnLi9uYW1lZC12YWx1ZXMnO1xuaW1wb3J0IHsgSUVudW1SZXN0Q2xpZW50TWV0YWRhdGFNZXRob2QgfSBmcm9tICcuL3Jlc3QtY2xpZW50JztcbmltcG9ydCB7IHN0YW5kYXJkUXVlcnlFbmNvZGluZyB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKiBIVFRQIE1ldGhvZCB0byBiZSB1c2VkIGluIHRoZSByZXF1ZXN0LiAqL1xuZXhwb3J0IHR5cGUgSHR0cE1ldGhvZCA9IElFbnVtUmVzdENsaWVudE1ldGFkYXRhTWV0aG9kO1xuXG4vKipcbiAqIEhUVFAgUmVxdWVzdCBvcHRpb25zLlxuICogIC0gdXJsOiByZXF1aXJlZCByZXF1ZXN0IFVSTFxuICogIC0gbWV0aG9kOiByZXF1aXJlZCByZXF1ZXN0IG1ldGhvZCAoZS5nLiBHRVQpXG4gKiAgLSBib2R5OiBvcHRpb25hbCBjb250ZW50IHRvIGJlIHNlbnQgYXMgdGhlIHJlcXVlc3QgYm9keVxuICogIC0gaGVhZGVyczogb3B0aW9uYWwgSFRUUCBoZWFkZXJzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXF1ZXN0XG4gKiAgLSBwYXJhbXM6IG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSByZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwUmVxdWVzdE9wdGlvbnNcbntcblx0Y29uc3RydWN0b3IoXG5cdFx0cmVhZG9ubHkgdXJsOiBzdHJpbmcsXG5cdFx0cmVhZG9ubHkgbWV0aG9kOiBIdHRwTWV0aG9kLFxuXHRcdHJlYWRvbmx5IGJvZHk6IGFueSA9IG51bGwsXG5cdFx0cmVhZG9ubHkgaGVhZGVyczogTmFtZWRWYWx1ZXMgPSBudWxsLFxuXHRcdHJlYWRvbmx5IHBhcmFtczogTmFtZWRWYWx1ZXM8UmVjb3JkPHN0cmluZywgYW55Pj4gPSBudWxsLFxuXHQpXG5cdHtcblx0XHRjb25zdCBlbXB0eSA9IG5ldyBOYW1lZFZhbHVlcygpO1xuXHRcdHRoaXMuaGVhZGVycyA9IG5ldyBOYW1lZFZhbHVlcygoaGVhZGVycyB8fCBlbXB0eSkudmFsdWVzKTtcblx0XHR0aGlzLnBhcmFtcyA9IG5ldyBOYW1lZFZhbHVlcygocGFyYW1zIHx8IGVtcHR5KS52YWx1ZXMpO1xuXG5cdFx0aWYgKCF0aGlzLmhlYWRlcnMuY29udGFpbnMoJ0NvbnRlbnQtVHlwZScpKVxuXHRcdHtcblx0XHRcdHRoaXMuaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsIHRoaXMuZ2V0Q29udGVudFR5cGUoKSk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmhlYWRlcnMuY29udGFpbnMoJ0FjY2VwdHMnKSlcblx0XHR7XG5cdFx0XHR0aGlzLmhlYWRlcnMuc2V0KCdBY2NlcHRzJywgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicpO1xuXHRcdH1cblx0fVxuXG5cdHRvVmFsdWUoKVxuXHR7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRtZXRob2Q6IHRoaXMubWV0aG9kLFxuXHRcdFx0Ym9keTogdGhpcy5ib2R5LFxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzLnRvVmFsdWUoKSxcblx0XHRcdHBhcmFtczogdGhpcy5wYXJhbXMudG9WYWx1ZSgpLFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlY3RzIHRoZSBjb250ZW50IHR5cGUgZnJvbSB0aGUgcmVxdWVzdCBib2R5LlxuXHQgKi9cblx0Z2V0Q29udGVudFR5cGUoKTogc3RyaW5nXG5cdHtcblx0XHRjb25zdCBzcGVjaWZpZWRUeXBlID0gdGhpcy5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG5cdFx0aWYgKHNwZWNpZmllZFR5cGUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHNwZWNpZmllZFR5cGU7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmJvZHkgfHwgdHlwZW9mIHRoaXMuYm9keSA9PT0gJ29iamVjdCcpXG5cdFx0e1xuXHRcdFx0cmV0dXJuICdhcHBsaWNhdGlvbi9qc29uJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJ3RleHQvcGxhaW4nO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGJvZHkgc2VyaWFsaXplZCBpbnRvIGEgc3RyaW5nLlxuXHQgKi9cblx0Z2V0U2VyaWFsaXplZEJvZHkoKTogc3RyaW5nXG5cdHtcblx0XHRpZiAoIXRoaXMuYm9keSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5nZXRDb250ZW50VHlwZSgpID09PSAnYXBwbGljYXRpb24vanNvbicpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuYm9keSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuYm9keS50b1N0cmluZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHJlcXVlc3QgVVJMIGluY2x1ZGluZyBldmVudHVhbCBxdWVyeSBzdHJpbmcuXG5cdCAqL1xuXHRnZXRVcmwoKTogc3RyaW5nXG5cdHtcblx0XHRpZiAoIXRoaXMucGFyYW1zLmxlbmd0aClcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy51cmw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGFyYW1zU3RyaW5nID0gT2JqZWN0XG5cdFx0XHQua2V5cyh0aGlzLnBhcmFtcy52YWx1ZXMpXG5cdFx0XHQubWFwKHAgPT4gYCR7c3RhbmRhcmRRdWVyeUVuY29kaW5nKHApfT0ke3N0YW5kYXJkUXVlcnlFbmNvZGluZyh0aGlzLnBhcmFtcy52YWx1ZXNbcF0pfWApXG5cdFx0XHQuam9pbignJicpO1xuXG5cdFx0Y29uc3QgcXVlcnlJbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcblx0XHRjb25zdCBzZXBhcmF0b3IgPSBxdWVyeUluZGV4IDwgMCA/ICc/JyA6IChxdWVyeUluZGV4IDwgdGhpcy51cmwubGVuZ3RoIC0gMSA/ICcmJyA6ICcnKTtcblxuXHRcdHJldHVybiBgJHt0aGlzLnVybH0ke3NlcGFyYXRvcn0ke3BhcmFtc1N0cmluZ31gO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBSZXF1ZXN0T3B0aW9uc1xuIl19