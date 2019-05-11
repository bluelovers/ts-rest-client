"use strict";
/**
 * Created by user on 2019/5/12.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const axios_cache_adapter_1 = require("axios-cache-adapter");
exports.setupCache = axios_cache_adapter_1.setupCache;
const axios_observable_1 = require("axios-observable");
exports.Axios = axios_observable_1.Axios;
const rest_client_1 = require("../rest-client");
class RestClientAxios extends rest_client_1.RestClient {
    constructor(opts = {}) {
        // @ts-ignore
        opts.httpClient = opts.httpClient || createAxios(opts.config);
        super(opts);
    }
}
exports.RestClientAxios = RestClientAxios;
function createAxios(config = {}) {
    let { cache } = {
        ...config,
    };
    if (cache) {
        let t = typeof cache;
        if (t === 'boolean') {
            cache = axios_cache_adapter_1.setupCache({
                maxAge: 15 * 60 * 1000
            });
        }
        else if (t === 'number') {
            cache = axios_cache_adapter_1.setupCache({
                maxAge: t
            });
        }
        else if (!('adapter' in cache && 'config' in cache && 'store' in cache)) {
            throw new TypeError(`cache: ${cache}`);
        }
        if (config.adapter) {
            throw new TypeError(`config.adapter already exists`);
        }
        config.adapter = cache.adapter;
    }
    delete config.cache;
    return axios_observable_1.Axios.create(config);
}
exports.createAxios = createAxios;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsYUFBYTtBQUNiLDZEQUFpRDtBQWFNLHFCQWI5QyxnQ0FBVSxDQWE4QztBQVpqRSx1REFBeUM7QUFZTyxnQkFadkMsd0JBQUssQ0FZdUM7QUFUckQsZ0RBQWdFO0FBZWhFLE1BQXNCLGVBQXlDLFNBQVEsd0JBQWE7SUFFbkYsWUFBWSxPQUE0QyxFQUFFO1FBRXpELGFBQWE7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5RCxLQUFLLENBQUMsSUFBa0MsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRDtBQVRELDBDQVNDO0FBT0QsU0FBZ0IsV0FBVyxDQUFDLFNBQXlCLEVBQUU7SUFFdEQsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHO1FBQ2YsR0FBRyxNQUFNO0tBQ1QsQ0FBQztJQUVGLElBQUksS0FBSyxFQUNUO1FBQ0MsSUFBSSxDQUFDLEdBQUcsT0FBTyxLQUFLLENBQUM7UUFFckIsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUNuQjtZQUNDLEtBQUssR0FBRyxnQ0FBVSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJO2FBQ3RCLENBQUMsQ0FBQTtTQUNGO2FBQ0ksSUFBSSxDQUFDLEtBQUssUUFBUSxFQUN2QjtZQUNDLEtBQUssR0FBRyxnQ0FBVSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQTtTQUNGO2FBQ0ksSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsRUFDdkU7WUFDQyxNQUFNLElBQUksU0FBUyxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUN0QztRQUVELElBQUksTUFBTSxDQUFDLE9BQU8sRUFDbEI7WUFDQyxNQUFNLElBQUksU0FBUyxDQUFDLCtCQUErQixDQUFDLENBQUE7U0FDcEQ7UUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7S0FDL0I7SUFFRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFFcEIsT0FBTyx3QkFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixDQUFDO0FBdENELGtDQXNDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNS8xMi5cbiAqL1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyBzZXR1cENhY2hlIH0gZnJvbSAnYXhpb3MtY2FjaGUtYWRhcHRlcic7XG5pbXBvcnQgeyBBeGlvcyB9IGZyb20gJ2F4aW9zLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgQXhpb3NPYnNlcnZhYmxlIGFzIElBeGlvc09ic2VydmFibGUgfSBmcm9tICdheGlvcy1vYnNlcnZhYmxlL2Rpc3QvYXhpb3Mtb2JzZXJ2YWJsZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXhpb3NSZXF1ZXN0Q29uZmlnIGFzIElBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBJUmVzdENsaWVudE9wdGlvbnMsIFJlc3RDbGllbnQgfSBmcm9tICcuLi9yZXN0LWNsaWVudCc7XG5cbmV4cG9ydCB0eXBlIElBeGlvcyA9IHR5cGVvZiBBeGlvcztcblxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdENvbmZpZyBleHRlbmRzIElBeGlvc1JlcXVlc3RDb25maWdcbntcblx0Y2FjaGU/OiBudW1iZXIgfCBib29sZWFuIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2V0dXBDYWNoZT5cbn1cblxuZXhwb3J0IHsgSUF4aW9zT2JzZXJ2YWJsZSwgSUF4aW9zUmVxdWVzdENvbmZpZywgQXhpb3MsIHNldHVwQ2FjaGUgfVxuXG5leHBvcnQgdHlwZSBJUmVzdENsaWVudEF4aW9zT3B0aW9uczxUIGV4dGVuZHMgQXhpb3MgPSBBeGlvcz4gPSBJUmVzdENsaWVudE9wdGlvbnM8VD4gJiB7XG5cdGNvbmZpZz86IElSZXF1ZXN0Q29uZmlnLFxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc3RDbGllbnRBeGlvczxUIGV4dGVuZHMgQXhpb3MgPSBBeGlvcz4gZXh0ZW5kcyBSZXN0Q2xpZW50PFQ+XG57XG5cdGNvbnN0cnVjdG9yKG9wdHM6IFBhcnRpYWw8SVJlc3RDbGllbnRBeGlvc09wdGlvbnM8VD4+ID0ge30pXG5cdHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0b3B0cy5odHRwQ2xpZW50ID0gb3B0cy5odHRwQ2xpZW50IHx8IGNyZWF0ZUF4aW9zKG9wdHMuY29uZmlnKTtcblxuXHRcdHN1cGVyKG9wdHMgYXMgSVJlc3RDbGllbnRBeGlvc09wdGlvbnM8VD4pO1xuXHR9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVzdENsaWVudEF4aW9zXG57XG5cdGV4cG9ydCB0eXBlIE9ic2VydmFibGU8VD4gPSBJQXhpb3NPYnNlcnZhYmxlPFQ+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBeGlvcyhjb25maWc6IElSZXF1ZXN0Q29uZmlnID0ge30pXG57XG5cdGxldCB7IGNhY2hlIH0gPSB7XG5cdFx0Li4uY29uZmlnLFxuXHR9O1xuXG5cdGlmIChjYWNoZSlcblx0e1xuXHRcdGxldCB0ID0gdHlwZW9mIGNhY2hlO1xuXG5cdFx0aWYgKHQgPT09ICdib29sZWFuJylcblx0XHR7XG5cdFx0XHRjYWNoZSA9IHNldHVwQ2FjaGUoe1xuXHRcdFx0XHRtYXhBZ2U6IDE1ICogNjAgKiAxMDAwXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRlbHNlIGlmICh0ID09PSAnbnVtYmVyJylcblx0XHR7XG5cdFx0XHRjYWNoZSA9IHNldHVwQ2FjaGUoe1xuXHRcdFx0XHRtYXhBZ2U6IHRcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGVsc2UgaWYgKCEoJ2FkYXB0ZXInIGluIGNhY2hlICYmICdjb25maWcnIGluIGNhY2hlICYmICdzdG9yZScgaW4gY2FjaGUpKVxuXHRcdHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGNhY2hlOiAke2NhY2hlfWApXG5cdFx0fVxuXG5cdFx0aWYgKGNvbmZpZy5hZGFwdGVyKVxuXHRcdHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGNvbmZpZy5hZGFwdGVyIGFscmVhZHkgZXhpc3RzYClcblx0XHR9XG5cblx0XHRjb25maWcuYWRhcHRlciA9IGNhY2hlLmFkYXB0ZXI7XG5cdH1cblxuXHRkZWxldGUgY29uZmlnLmNhY2hlO1xuXG5cdHJldHVybiBBeGlvcy5jcmVhdGUoY29uZmlnKVxufVxuIl19