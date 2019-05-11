"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const named_values_1 = require("./named-values");
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
            .map(p => `${standardQueryEncoding(p)}=${standardQueryEncoding(this.params.values[p])}`)
            .join('&');
        const queryIndex = this.url.indexOf('?');
        const separator = queryIndex < 0 ? '?' : (queryIndex < this.url.length - 1 ? '&' : '');
        return `${this.url}${separator}${paramsString}`;
    }
}
exports.HttpRequestOptions = HttpRequestOptions;
function standardQueryEncoding(v) {
    return encodeURIComponent(v);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1yZXF1ZXN0LW9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLXJlcXVlc3Qtb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE2QztBQU03Qzs7Ozs7OztHQU9HO0FBQ0gsTUFBYSxrQkFBa0I7SUFFOUIsWUFDVSxHQUFXLEVBQ1gsTUFBa0IsRUFDbEIsT0FBWSxJQUFJLEVBQ2hCLFVBQXVCLElBQUksRUFDM0IsU0FBc0IsSUFBSTtRQUoxQixRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQ1gsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNsQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBR25DLE1BQU0sS0FBSyxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwwQkFBVyxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwwQkFBVyxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFDMUM7WUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ3JDO1lBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7U0FDakU7SUFDRixDQUFDO0lBRUQsT0FBTztRQUVOLE9BQU87WUFDTixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQy9CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtTQUM3QixDQUFBO0lBQ0YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUViLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksYUFBYSxFQUNqQjtZQUNDLE9BQU8sYUFBYSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFDL0M7WUFDQyxPQUFPLGtCQUFrQixDQUFDO1NBQzFCO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCO1FBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNkO1lBQ0MsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLGtCQUFrQixFQUNoRDtZQUNDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUVMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDdkI7WUFDQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDaEI7UUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUN4QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUN2RixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFWixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxNQUFNLFNBQVMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2RixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDakQsQ0FBQztDQUNEO0FBN0ZELGdEQTZGQztBQUVELFNBQVMscUJBQXFCLENBQUMsQ0FBUztJQUV2QyxPQUFPLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYW1lZFZhbHVlcyB9IGZyb20gJy4vbmFtZWQtdmFsdWVzJztcbmltcG9ydCB7IElFbnVtUmVzdENsaWVudE1ldGFkYXRhTWV0aG9kIH0gZnJvbSAnLi9yZXN0LWNsaWVudCc7XG5cbi8qKiBIVFRQIE1ldGhvZCB0byBiZSB1c2VkIGluIHRoZSByZXF1ZXN0LiAqL1xuZXhwb3J0IHR5cGUgSHR0cE1ldGhvZCA9IElFbnVtUmVzdENsaWVudE1ldGFkYXRhTWV0aG9kO1xuXG4vKipcbiAqIEhUVFAgUmVxdWVzdCBvcHRpb25zLlxuICogIC0gdXJsOiByZXF1aXJlZCByZXF1ZXN0IFVSTFxuICogIC0gbWV0aG9kOiByZXF1aXJlZCByZXF1ZXN0IG1ldGhvZCAoZS5nLiBHRVQpXG4gKiAgLSBib2R5OiBvcHRpb25hbCBjb250ZW50IHRvIGJlIHNlbnQgYXMgdGhlIHJlcXVlc3QgYm9keVxuICogIC0gaGVhZGVyczogb3B0aW9uYWwgSFRUUCBoZWFkZXJzIHRvIGJlIGFkZGVkIHRvIHRoZSByZXF1ZXN0XG4gKiAgLSBwYXJhbXM6IG9wdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSByZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwUmVxdWVzdE9wdGlvbnNcbntcblx0Y29uc3RydWN0b3IoXG5cdFx0cmVhZG9ubHkgdXJsOiBzdHJpbmcsXG5cdFx0cmVhZG9ubHkgbWV0aG9kOiBIdHRwTWV0aG9kLFxuXHRcdHJlYWRvbmx5IGJvZHk6IGFueSA9IG51bGwsXG5cdFx0cmVhZG9ubHkgaGVhZGVyczogTmFtZWRWYWx1ZXMgPSBudWxsLFxuXHRcdHJlYWRvbmx5IHBhcmFtczogTmFtZWRWYWx1ZXMgPSBudWxsLFxuXHQpXG5cdHtcblx0XHRjb25zdCBlbXB0eSA9IG5ldyBOYW1lZFZhbHVlcygpO1xuXHRcdHRoaXMuaGVhZGVycyA9IG5ldyBOYW1lZFZhbHVlcygoaGVhZGVycyB8fCBlbXB0eSkudmFsdWVzKTtcblx0XHR0aGlzLnBhcmFtcyA9IG5ldyBOYW1lZFZhbHVlcygocGFyYW1zIHx8IGVtcHR5KS52YWx1ZXMpO1xuXG5cdFx0aWYgKCF0aGlzLmhlYWRlcnMuY29udGFpbnMoJ0NvbnRlbnQtVHlwZScpKVxuXHRcdHtcblx0XHRcdHRoaXMuaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsIHRoaXMuZ2V0Q29udGVudFR5cGUoKSk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmhlYWRlcnMuY29udGFpbnMoJ0FjY2VwdHMnKSlcblx0XHR7XG5cdFx0XHR0aGlzLmhlYWRlcnMuc2V0KCdBY2NlcHRzJywgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicpO1xuXHRcdH1cblx0fVxuXG5cdHRvVmFsdWUoKVxuXHR7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRtZXRob2Q6IHRoaXMubWV0aG9kLFxuXHRcdFx0Ym9keTogdGhpcy5ib2R5LFxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzLnRvVmFsdWUoKSxcblx0XHRcdHBhcmFtczogdGhpcy5wYXJhbXMudG9WYWx1ZSgpLFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlY3RzIHRoZSBjb250ZW50IHR5cGUgZnJvbSB0aGUgcmVxdWVzdCBib2R5LlxuXHQgKi9cblx0Z2V0Q29udGVudFR5cGUoKTogc3RyaW5nXG5cdHtcblx0XHRjb25zdCBzcGVjaWZpZWRUeXBlID0gdGhpcy5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG5cdFx0aWYgKHNwZWNpZmllZFR5cGUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHNwZWNpZmllZFR5cGU7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmJvZHkgfHwgdHlwZW9mIHRoaXMuYm9keSA9PT0gJ29iamVjdCcpXG5cdFx0e1xuXHRcdFx0cmV0dXJuICdhcHBsaWNhdGlvbi9qc29uJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJ3RleHQvcGxhaW4nO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGJvZHkgc2VyaWFsaXplZCBpbnRvIGEgc3RyaW5nLlxuXHQgKi9cblx0Z2V0U2VyaWFsaXplZEJvZHkoKTogc3RyaW5nXG5cdHtcblx0XHRpZiAoIXRoaXMuYm9keSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5nZXRDb250ZW50VHlwZSgpID09PSAnYXBwbGljYXRpb24vanNvbicpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuYm9keSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuYm9keS50b1N0cmluZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHJlcXVlc3QgVVJMIGluY2x1ZGluZyBldmVudHVhbCBxdWVyeSBzdHJpbmcuXG5cdCAqL1xuXHRnZXRVcmwoKTogc3RyaW5nXG5cdHtcblx0XHRpZiAoIXRoaXMucGFyYW1zLmxlbmd0aClcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy51cmw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGFyYW1zU3RyaW5nID0gT2JqZWN0XG5cdFx0XHQua2V5cyh0aGlzLnBhcmFtcy52YWx1ZXMpXG5cdFx0XHQubWFwKHAgPT4gYCR7c3RhbmRhcmRRdWVyeUVuY29kaW5nKHApfT0ke3N0YW5kYXJkUXVlcnlFbmNvZGluZyh0aGlzLnBhcmFtcy52YWx1ZXNbcF0pfWApXG5cdFx0XHQuam9pbignJicpO1xuXG5cdFx0Y29uc3QgcXVlcnlJbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcblx0XHRjb25zdCBzZXBhcmF0b3IgPSBxdWVyeUluZGV4IDwgMCA/ICc/JyA6IChxdWVyeUluZGV4IDwgdGhpcy51cmwubGVuZ3RoIC0gMSA/ICcmJyA6ICcnKTtcblxuXHRcdHJldHVybiBgJHt0aGlzLnVybH0ke3NlcGFyYXRvcn0ke3BhcmFtc1N0cmluZ31gO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHN0YW5kYXJkUXVlcnlFbmNvZGluZyh2OiBzdHJpbmcpOiBzdHJpbmdcbntcblx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2KTtcbn1cbiJdfQ==