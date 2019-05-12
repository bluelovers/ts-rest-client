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
    static toValue(options) {
        if (options instanceof HttpRequestOptions) {
            // @ts-ignore
            options = options.toValue();
        }
        return options;
    }
}
exports.HttpRequestOptions = HttpRequestOptions;
exports.default = HttpRequestOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1yZXF1ZXN0LW9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLXJlcXVlc3Qtb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUF3RDtBQUV4RCxpQ0FBK0M7QUE4Qy9DOzs7Ozs7O0dBT0c7QUFDSCxNQUFhLGtCQUFrQjtJQUU5QixZQUNVLEdBQVcsRUFDWCxNQUFrQixFQUNsQixPQUFZLElBQUksRUFDaEIsVUFBNEMsSUFBSSxFQUNoRCxTQUEyQyxJQUFJO1FBSi9DLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFDWCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBeUM7UUFDaEQsV0FBTSxHQUFOLE1BQU0sQ0FBeUM7UUFHeEQsTUFBTSxLQUFLLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLDBCQUFXLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDBCQUFXLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUMxQztZQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDckM7WUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztTQUNqRTtJQUNGLENBQUM7SUFFRCxPQUFPO1FBRU4sT0FBTztZQUNOLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1NBQzdCLENBQUE7SUFDRixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBRWIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkQsSUFBSSxhQUFhLEVBQ2pCO1lBQ0MsT0FBTyxhQUFhLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUMvQztZQUNDLE9BQU8sa0JBQWtCLENBQUM7U0FDMUI7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUI7UUFFaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQ2Q7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssa0JBQWtCLEVBQ2hEO1lBQ0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBRUwsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUN2QjtZQUNDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNoQjtRQUVELE1BQU0sWUFBWSxHQUFHLE1BQU07YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3hCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsNEJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksNEJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3ZGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVaLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZGLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUF1RTtRQUVyRixJQUFJLE9BQU8sWUFBWSxrQkFBa0IsRUFDekM7WUFDQyxhQUFhO1lBQ2IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUMzQjtRQUVELE9BQU8sT0FBTyxDQUFBO0lBQ2YsQ0FBQztDQUNEO0FBeEdELGdEQXdHQztBQUVELGtCQUFlLGtCQUFrQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmFtZWRWYWx1ZXMsIFN0cmluZ01hcCB9IGZyb20gJy4vbmFtZWQtdmFsdWVzJztcbmltcG9ydCB7IElFbnVtUmVzdENsaWVudE1ldGFkYXRhTWV0aG9kIH0gZnJvbSAnLi9yZXN0LWNsaWVudCc7XG5pbXBvcnQgeyBzdGFuZGFyZFF1ZXJ5RW5jb2RpbmcgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgSUF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gJy4vYXhpb3MnO1xuXG4vKiogSFRUUCBNZXRob2QgdG8gYmUgdXNlZCBpbiB0aGUgcmVxdWVzdC4gKi9cbmV4cG9ydCB0eXBlIEh0dHBNZXRob2QgPSBJRW51bVJlc3RDbGllbnRNZXRhZGF0YU1ldGhvZDtcblxuZXhwb3J0IGludGVyZmFjZSBJSHR0cFJlcXVlc3RIZWFkZXJzIGV4dGVuZHMgU3RyaW5nTWFwPGFueT5cbntcblx0QWNjZXB0cz86IHN0cmluZyB8ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0J0FjY2VwdC1MYW5ndWFnZSc/OiBzdHJpbmcsXG5cdCdBY2NlcHQtRW5jb2RpbmcnPzogc3RyaW5nLFxuXHQnUmVmZXJlcic/OiBzdHJpbmcsXG5cdCdDb25uZWN0aW9uJz86IHN0cmluZyxcblx0J1VwZ3JhZGUtSW5zZWN1cmUtUmVxdWVzdHMnPzogc3RyaW5nLFxuXHQnSWYtTW9kaWZpZWQtU2luY2UnPzogc3RyaW5nLFxuXHQnSWYtTm9uZS1NYXRjaCc/OiBzdHJpbmcsXG5cdCdDb250ZW50LVR5cGUnPzogc3RyaW5nIHwgJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHQnVXNlci1BZ2VudCc/OiBzdHJpbmcsXG5cdCdDYWNoZS1Db250cm9sJz86IHN0cmluZyxcblx0J0F1dGhvcml6YXRpb24nPzogc3RyaW5nLFxuXHQnQ29va2llJz86IHN0cmluZyxcblx0J0NvbnRlbnQtTGVuZ3RoJz86IHN0cmluZyxcblx0J0RhdGUnPzogc3RyaW5nLFxuXHQnTWF4LUZvcndhcmRzJz86IG51bWJlcixcblx0J09yaWdpbic/OiBzdHJpbmcsXG5cdCdQcm94eS1BdXRob3JpemF0aW9uJz86IHN0cmluZyxcblx0J1JhbmdlJz86IHN0cmluZyxcblx0J1gtUmVxdWVzdGVkLVdpdGgnPzogc3RyaW5nLFxuXHQnWC1Gb3J3YXJkZWQtRm9yJz86IHN0cmluZyxcblx0J1gtRm9yd2FyZGVkLUhvc3QnPzogc3RyaW5nLFxuXHQnWC1IVFRQLU1ldGhvZC1PdmVycmlkZSc/OiBzdHJpbmcsXG5cdCdYLUF0dC1EZXZpY2VpZCc/OiBzdHJpbmcsXG5cdCdYLVdhcC1Qcm9maWxlJz86IHN0cmluZyxcblx0J0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic/OiBzdHJpbmcgfCAnKicsXG5cdCdBbGxvdyc/OiBzdHJpbmcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUh0dHBSZXF1ZXN0T3B0aW9uc1xue1xuXHR1cmw6IHN0cmluZztcblx0bWV0aG9kOiBJRW51bVJlc3RDbGllbnRNZXRhZGF0YU1ldGhvZDtcblx0Ym9keTogYW55O1xuXHRoZWFkZXJzOiBJSHR0cFJlcXVlc3RIZWFkZXJzO1xuXHRwYXJhbXM6IFJlY29yZDxzdHJpbmcsIGFueT47XG59XG5cbi8qKlxuICogSFRUUCBSZXF1ZXN0IG9wdGlvbnMuXG4gKiAgLSB1cmw6IHJlcXVpcmVkIHJlcXVlc3QgVVJMXG4gKiAgLSBtZXRob2Q6IHJlcXVpcmVkIHJlcXVlc3QgbWV0aG9kIChlLmcuIEdFVClcbiAqICAtIGJvZHk6IG9wdGlvbmFsIGNvbnRlbnQgdG8gYmUgc2VudCBhcyB0aGUgcmVxdWVzdCBib2R5XG4gKiAgLSBoZWFkZXJzOiBvcHRpb25hbCBIVFRQIGhlYWRlcnMgdG8gYmUgYWRkZWQgdG8gdGhlIHJlcXVlc3RcbiAqICAtIHBhcmFtczogb3B0aW9uYWwgcXVlcnkgcGFyYW1ldGVycyB0byBiZSBzZW50IGFsb25nIHdpdGggdGhlIHJlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBSZXF1ZXN0T3B0aW9uc1xue1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRyZWFkb25seSB1cmw6IHN0cmluZyxcblx0XHRyZWFkb25seSBtZXRob2Q6IEh0dHBNZXRob2QsXG5cdFx0cmVhZG9ubHkgYm9keTogYW55ID0gbnVsbCxcblx0XHRyZWFkb25seSBoZWFkZXJzOiBOYW1lZFZhbHVlczxJSHR0cFJlcXVlc3RIZWFkZXJzPiA9IG51bGwsXG5cdFx0cmVhZG9ubHkgcGFyYW1zOiBOYW1lZFZhbHVlczxSZWNvcmQ8c3RyaW5nLCBhbnk+PiA9IG51bGwsXG5cdClcblx0e1xuXHRcdGNvbnN0IGVtcHR5ID0gbmV3IE5hbWVkVmFsdWVzKCk7XG5cdFx0dGhpcy5oZWFkZXJzID0gbmV3IE5hbWVkVmFsdWVzKChoZWFkZXJzIHx8IGVtcHR5IGFzIGFueSkudmFsdWVzKTtcblx0XHR0aGlzLnBhcmFtcyA9IG5ldyBOYW1lZFZhbHVlcygocGFyYW1zIHx8IGVtcHR5KS52YWx1ZXMpO1xuXG5cdFx0aWYgKCF0aGlzLmhlYWRlcnMuY29udGFpbnMoJ0NvbnRlbnQtVHlwZScpKVxuXHRcdHtcblx0XHRcdHRoaXMuaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsIHRoaXMuZ2V0Q29udGVudFR5cGUoKSk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmhlYWRlcnMuY29udGFpbnMoJ0FjY2VwdHMnKSlcblx0XHR7XG5cdFx0XHR0aGlzLmhlYWRlcnMuc2V0KCdBY2NlcHRzJywgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicpO1xuXHRcdH1cblx0fVxuXG5cdHRvVmFsdWUoKTogSUh0dHBSZXF1ZXN0T3B0aW9uc1xuXHR7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRtZXRob2Q6IHRoaXMubWV0aG9kLFxuXHRcdFx0Ym9keTogdGhpcy5ib2R5LFxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzLnRvVmFsdWUoKSxcblx0XHRcdHBhcmFtczogdGhpcy5wYXJhbXMudG9WYWx1ZSgpLFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlY3RzIHRoZSBjb250ZW50IHR5cGUgZnJvbSB0aGUgcmVxdWVzdCBib2R5LlxuXHQgKi9cblx0Z2V0Q29udGVudFR5cGUoKTogc3RyaW5nXG5cdHtcblx0XHRjb25zdCBzcGVjaWZpZWRUeXBlID0gdGhpcy5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG5cdFx0aWYgKHNwZWNpZmllZFR5cGUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHNwZWNpZmllZFR5cGU7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmJvZHkgfHwgdHlwZW9mIHRoaXMuYm9keSA9PT0gJ29iamVjdCcpXG5cdFx0e1xuXHRcdFx0cmV0dXJuICdhcHBsaWNhdGlvbi9qc29uJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJ3RleHQvcGxhaW4nO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGJvZHkgc2VyaWFsaXplZCBpbnRvIGEgc3RyaW5nLlxuXHQgKi9cblx0Z2V0U2VyaWFsaXplZEJvZHkoKTogc3RyaW5nXG5cdHtcblx0XHRpZiAoIXRoaXMuYm9keSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5nZXRDb250ZW50VHlwZSgpID09PSAnYXBwbGljYXRpb24vanNvbicpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuYm9keSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuYm9keS50b1N0cmluZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHJlcXVlc3QgVVJMIGluY2x1ZGluZyBldmVudHVhbCBxdWVyeSBzdHJpbmcuXG5cdCAqL1xuXHRnZXRVcmwoKTogc3RyaW5nXG5cdHtcblx0XHRpZiAoIXRoaXMucGFyYW1zLmxlbmd0aClcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy51cmw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGFyYW1zU3RyaW5nID0gT2JqZWN0XG5cdFx0XHQua2V5cyh0aGlzLnBhcmFtcy52YWx1ZXMpXG5cdFx0XHQubWFwKHAgPT4gYCR7c3RhbmRhcmRRdWVyeUVuY29kaW5nKHApfT0ke3N0YW5kYXJkUXVlcnlFbmNvZGluZyh0aGlzLnBhcmFtcy52YWx1ZXNbcF0pfWApXG5cdFx0XHQuam9pbignJicpO1xuXG5cdFx0Y29uc3QgcXVlcnlJbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcblx0XHRjb25zdCBzZXBhcmF0b3IgPSBxdWVyeUluZGV4IDwgMCA/ICc/JyA6IChxdWVyeUluZGV4IDwgdGhpcy51cmwubGVuZ3RoIC0gMSA/ICcmJyA6ICcnKTtcblxuXHRcdHJldHVybiBgJHt0aGlzLnVybH0ke3NlcGFyYXRvcn0ke3BhcmFtc1N0cmluZ31gO1xuXHR9XG5cblx0c3RhdGljIHRvVmFsdWUob3B0aW9uczogSUF4aW9zUmVxdWVzdENvbmZpZyB8IEh0dHBSZXF1ZXN0T3B0aW9ucyB8IElIdHRwUmVxdWVzdE9wdGlvbnMpXG5cdHtcblx0XHRpZiAob3B0aW9ucyBpbnN0YW5jZW9mIEh0dHBSZXF1ZXN0T3B0aW9ucylcblx0XHR7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucy50b1ZhbHVlKClcblx0XHR9XG5cblx0XHRyZXR1cm4gb3B0aW9uc1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBSZXF1ZXN0T3B0aW9uc1xuIl19