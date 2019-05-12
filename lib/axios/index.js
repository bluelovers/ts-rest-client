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
        opts.httpClient = opts.httpClient || createAxios(opts.configAxios);
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
exports.default = RestClientAxios;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsYUFBYTtBQUNiLDZEQUFpRDtBQWFNLHFCQWI5QyxnQ0FBVSxDQWE4QztBQVpqRSx1REFBeUM7QUFZTyxnQkFadkMsd0JBQUssQ0FZdUM7QUFUckQsZ0RBQWdFO0FBZWhFLE1BQXNCLGVBQXlDLFNBQVEsd0JBQWE7SUFFbkYsWUFBWSxPQUE0QyxFQUFFO1FBRXpELGFBQWE7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuRSxLQUFLLENBQUMsSUFBa0MsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRDtBQVRELDBDQVNDO0FBT0QsU0FBZ0IsV0FBVyxDQUFDLFNBQXlCLEVBQUU7SUFFdEQsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHO1FBQ2YsR0FBRyxNQUFNO0tBQ1QsQ0FBQztJQUVGLElBQUksS0FBSyxFQUNUO1FBQ0MsSUFBSSxDQUFDLEdBQUcsT0FBTyxLQUFLLENBQUM7UUFFckIsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUNuQjtZQUNDLEtBQUssR0FBRyxnQ0FBVSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJO2FBQ3RCLENBQUMsQ0FBQTtTQUNGO2FBQ0ksSUFBSSxDQUFDLEtBQUssUUFBUSxFQUN2QjtZQUNDLEtBQUssR0FBRyxnQ0FBVSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQTtTQUNGO2FBQ0ksSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsRUFDdkU7WUFDQyxNQUFNLElBQUksU0FBUyxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUN0QztRQUVELElBQUksTUFBTSxDQUFDLE9BQU8sRUFDbEI7WUFDQyxNQUFNLElBQUksU0FBUyxDQUFDLCtCQUErQixDQUFDLENBQUE7U0FDcEQ7UUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7S0FDL0I7SUFFRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFFcEIsT0FBTyx3QkFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixDQUFDO0FBdENELGtDQXNDQztBQUVELGtCQUFlLGVBQWUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNS8xMi5cbiAqL1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyBzZXR1cENhY2hlIH0gZnJvbSAnYXhpb3MtY2FjaGUtYWRhcHRlcic7XG5pbXBvcnQgeyBBeGlvcyB9IGZyb20gJ2F4aW9zLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgQXhpb3NPYnNlcnZhYmxlIGFzIElBeGlvc09ic2VydmFibGUgfSBmcm9tICdheGlvcy1vYnNlcnZhYmxlL2Rpc3QvYXhpb3Mtb2JzZXJ2YWJsZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXhpb3NSZXF1ZXN0Q29uZmlnIGFzIElBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBJUmVzdENsaWVudE9wdGlvbnMsIFJlc3RDbGllbnQgfSBmcm9tICcuLi9yZXN0LWNsaWVudCc7XG5cbmV4cG9ydCB0eXBlIElBeGlvcyA9IHR5cGVvZiBBeGlvcztcblxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdENvbmZpZyBleHRlbmRzIElBeGlvc1JlcXVlc3RDb25maWdcbntcblx0Y2FjaGU/OiBudW1iZXIgfCBib29sZWFuIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2V0dXBDYWNoZT5cbn1cblxuZXhwb3J0IHsgSUF4aW9zT2JzZXJ2YWJsZSwgSUF4aW9zUmVxdWVzdENvbmZpZywgQXhpb3MsIHNldHVwQ2FjaGUgfVxuXG5leHBvcnQgdHlwZSBJUmVzdENsaWVudEF4aW9zT3B0aW9uczxUIGV4dGVuZHMgQXhpb3MgPSBBeGlvcz4gPSBJUmVzdENsaWVudE9wdGlvbnM8VD4gJiB7XG5cdGNvbmZpZ0F4aW9zPzogSVJlcXVlc3RDb25maWcsXG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVzdENsaWVudEF4aW9zPFQgZXh0ZW5kcyBBeGlvcyA9IEF4aW9zPiBleHRlbmRzIFJlc3RDbGllbnQ8VD5cbntcblx0Y29uc3RydWN0b3Iob3B0czogUGFydGlhbDxJUmVzdENsaWVudEF4aW9zT3B0aW9uczxUPj4gPSB7fSlcblx0e1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRvcHRzLmh0dHBDbGllbnQgPSBvcHRzLmh0dHBDbGllbnQgfHwgY3JlYXRlQXhpb3Mob3B0cy5jb25maWdBeGlvcyk7XG5cblx0XHRzdXBlcihvcHRzIGFzIElSZXN0Q2xpZW50QXhpb3NPcHRpb25zPFQ+KTtcblx0fVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlc3RDbGllbnRBeGlvc1xue1xuXHRleHBvcnQgdHlwZSBPYnNlcnZhYmxlPFQ+ID0gSUF4aW9zT2JzZXJ2YWJsZTxUPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXhpb3MoY29uZmlnOiBJUmVxdWVzdENvbmZpZyA9IHt9KVxue1xuXHRsZXQgeyBjYWNoZSB9ID0ge1xuXHRcdC4uLmNvbmZpZyxcblx0fTtcblxuXHRpZiAoY2FjaGUpXG5cdHtcblx0XHRsZXQgdCA9IHR5cGVvZiBjYWNoZTtcblxuXHRcdGlmICh0ID09PSAnYm9vbGVhbicpXG5cdFx0e1xuXHRcdFx0Y2FjaGUgPSBzZXR1cENhY2hlKHtcblx0XHRcdFx0bWF4QWdlOiAxNSAqIDYwICogMTAwMFxuXHRcdFx0fSlcblx0XHR9XG5cdFx0ZWxzZSBpZiAodCA9PT0gJ251bWJlcicpXG5cdFx0e1xuXHRcdFx0Y2FjaGUgPSBzZXR1cENhY2hlKHtcblx0XHRcdFx0bWF4QWdlOiB0XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRlbHNlIGlmICghKCdhZGFwdGVyJyBpbiBjYWNoZSAmJiAnY29uZmlnJyBpbiBjYWNoZSAmJiAnc3RvcmUnIGluIGNhY2hlKSlcblx0XHR7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBjYWNoZTogJHtjYWNoZX1gKVxuXHRcdH1cblxuXHRcdGlmIChjb25maWcuYWRhcHRlcilcblx0XHR7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBjb25maWcuYWRhcHRlciBhbHJlYWR5IGV4aXN0c2ApXG5cdFx0fVxuXG5cdFx0Y29uZmlnLmFkYXB0ZXIgPSBjYWNoZS5hZGFwdGVyO1xuXHR9XG5cblx0ZGVsZXRlIGNvbmZpZy5jYWNoZTtcblxuXHRyZXR1cm4gQXhpb3MuY3JlYXRlKGNvbmZpZylcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzdENsaWVudEF4aW9zXG4iXX0=