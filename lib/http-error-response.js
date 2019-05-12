"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Holds information about a failed HTTP request.
 * If the request failed on server side, error is to be filled with the response body.
 * If the request failed on client side, error is to be filled with an Event object describing what happened.
 */
class HttpErrorResponse {
    constructor(init) {
        this.name = 'HttpErrorResponse';
        const data = init || {};
        this.status = data.status || 0;
        this.headers = data.headers || {};
        this.statusText = data.statusText || '';
        this.url = data.url;
        if (this.status >= 200 && this.status <= 300) {
            this.message = `Http failure during parsing for ${this.url || '(unknown url)'}`;
        }
        else {
            this.message = `Http failure response for ${this.url || '(unknown url)'}: ${this.status} ${this.statusText}`;
        }
        this.error = data.error || null;
    }
}
exports.HttpErrorResponse = HttpErrorResponse;
exports.default = HttpErrorResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAtZXJyb3ItcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztHQUlHO0FBQ0gsTUFBYSxpQkFBaUI7SUFVNUIsWUFBWSxJQUErRjtRQU5sRyxTQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFPbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFcEIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1NBQ2pGO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLDZCQUE2QixJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM5RztRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBMUJELDhDQTBCQztBQUVELGtCQUFlLGlCQUFpQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RyaW5nTWFwIH0gZnJvbSAnLi9uYW1lZC12YWx1ZXMnO1xuXG4vKipcbiAqIEhvbGRzIGluZm9ybWF0aW9uIGFib3V0IGEgZmFpbGVkIEhUVFAgcmVxdWVzdC5cbiAqIElmIHRoZSByZXF1ZXN0IGZhaWxlZCBvbiBzZXJ2ZXIgc2lkZSwgZXJyb3IgaXMgdG8gYmUgZmlsbGVkIHdpdGggdGhlIHJlc3BvbnNlIGJvZHkuXG4gKiBJZiB0aGUgcmVxdWVzdCBmYWlsZWQgb24gY2xpZW50IHNpZGUsIGVycm9yIGlzIHRvIGJlIGZpbGxlZCB3aXRoIGFuIEV2ZW50IG9iamVjdCBkZXNjcmliaW5nIHdoYXQgaGFwcGVuZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JSZXNwb25zZSBpbXBsZW1lbnRzIEVycm9yIHtcbiAgcmVhZG9ubHkgZXJyb3I6IGFueSB8IG51bGwgfCBFcnJvcjtcbiAgcmVhZG9ubHkgaGVhZGVyczogU3RyaW5nTWFwO1xuICByZWFkb25seSBtZXNzYWdlOiBzdHJpbmc7XG4gIHJlYWRvbmx5IG5hbWUgPSAnSHR0cEVycm9yUmVzcG9uc2UnO1xuICByZWFkb25seSBzdGFjaz86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgc3RhdHVzOiBudW1iZXI7XG4gIHJlYWRvbmx5IHN0YXR1c1RleHQ6IHN0cmluZztcbiAgcmVhZG9ubHkgdXJsPzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGluaXQ6IHsgZXJyb3I/OiBhbnk7IGhlYWRlcnM/OiBTdHJpbmdNYXA7IHN0YXR1cz86IG51bWJlcjsgc3RhdHVzVGV4dD86IHN0cmluZzsgdXJsPzogc3RyaW5nOyB9KSB7XG4gICAgY29uc3QgZGF0YSA9IGluaXQgfHwge307XG5cbiAgICB0aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzIHx8IDA7XG4gICAgdGhpcy5oZWFkZXJzID0gZGF0YS5oZWFkZXJzIHx8IHt9O1xuICAgIHRoaXMuc3RhdHVzVGV4dCA9IGRhdGEuc3RhdHVzVGV4dCB8fCAnJztcbiAgICB0aGlzLnVybCA9IGRhdGEudXJsO1xuXG4gICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8PSAzMDApIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IGBIdHRwIGZhaWx1cmUgZHVyaW5nIHBhcnNpbmcgZm9yICR7dGhpcy51cmwgfHwgJyh1bmtub3duIHVybCknfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IGBIdHRwIGZhaWx1cmUgcmVzcG9uc2UgZm9yICR7dGhpcy51cmwgfHwgJyh1bmtub3duIHVybCknfTogJHt0aGlzLnN0YXR1c30gJHt0aGlzLnN0YXR1c1RleHR9YDtcbiAgICB9XG5cbiAgICB0aGlzLmVycm9yID0gZGF0YS5lcnJvciB8fCBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBFcnJvclJlc3BvbnNlXG4iXX0=