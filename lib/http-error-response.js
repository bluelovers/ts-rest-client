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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAtZXJyb3ItcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztHQUlHO0FBQ0gsTUFBYSxpQkFBaUI7SUFVNUIsWUFBWSxJQUErRjtRQU5sRyxTQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFPbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFcEIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1NBQ2pGO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLDZCQUE2QixJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM5RztRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBMUJELDhDQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0cmluZ01hcCB9IGZyb20gJy4vbmFtZWQtdmFsdWVzJztcblxuLyoqXG4gKiBIb2xkcyBpbmZvcm1hdGlvbiBhYm91dCBhIGZhaWxlZCBIVFRQIHJlcXVlc3QuXG4gKiBJZiB0aGUgcmVxdWVzdCBmYWlsZWQgb24gc2VydmVyIHNpZGUsIGVycm9yIGlzIHRvIGJlIGZpbGxlZCB3aXRoIHRoZSByZXNwb25zZSBib2R5LlxuICogSWYgdGhlIHJlcXVlc3QgZmFpbGVkIG9uIGNsaWVudCBzaWRlLCBlcnJvciBpcyB0byBiZSBmaWxsZWQgd2l0aCBhbiBFdmVudCBvYmplY3QgZGVzY3JpYmluZyB3aGF0IGhhcHBlbmVkLlxuICovXG5leHBvcnQgY2xhc3MgSHR0cEVycm9yUmVzcG9uc2UgaW1wbGVtZW50cyBFcnJvciB7XG4gIHJlYWRvbmx5IGVycm9yOiBhbnkgfCBudWxsO1xuICByZWFkb25seSBoZWFkZXJzOiBTdHJpbmdNYXA7XG4gIHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZztcbiAgcmVhZG9ubHkgbmFtZSA9ICdIdHRwRXJyb3JSZXNwb25zZSc7XG4gIHJlYWRvbmx5IHN0YWNrPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSBzdGF0dXM6IG51bWJlcjtcbiAgcmVhZG9ubHkgc3RhdHVzVGV4dDogc3RyaW5nO1xuICByZWFkb25seSB1cmw/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoaW5pdDogeyBlcnJvcj86IGFueTsgaGVhZGVycz86IFN0cmluZ01hcDsgc3RhdHVzPzogbnVtYmVyOyBzdGF0dXNUZXh0Pzogc3RyaW5nOyB1cmw/OiBzdHJpbmc7IH0pIHtcbiAgICBjb25zdCBkYXRhID0gaW5pdCB8fCB7fTtcblxuICAgIHRoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXMgfHwgMDtcbiAgICB0aGlzLmhlYWRlcnMgPSBkYXRhLmhlYWRlcnMgfHwge307XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gZGF0YS5zdGF0dXNUZXh0IHx8ICcnO1xuICAgIHRoaXMudXJsID0gZGF0YS51cmw7XG5cbiAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDw9IDMwMCkge1xuICAgICAgdGhpcy5tZXNzYWdlID0gYEh0dHAgZmFpbHVyZSBkdXJpbmcgcGFyc2luZyBmb3IgJHt0aGlzLnVybCB8fCAnKHVua25vd24gdXJsKSd9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXNzYWdlID0gYEh0dHAgZmFpbHVyZSByZXNwb25zZSBmb3IgJHt0aGlzLnVybCB8fCAnKHVua25vd24gdXJsKSd9OiAke3RoaXMuc3RhdHVzfSAke3RoaXMuc3RhdHVzVGV4dH1gO1xuICAgIH1cblxuICAgIHRoaXMuZXJyb3IgPSBkYXRhLmVycm9yIHx8IG51bGw7XG4gIH1cbn1cbiJdfQ==