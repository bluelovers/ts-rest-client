"use strict";
/**
 * Created by user on 2019/5/12.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const axios_observable_1 = require("axios-observable");
exports.Axios = axios_observable_1.Axios;
// @ts-ignore
const axios_cache_adapter_1 = require("axios-cache-adapter");
exports.setupCache = axios_cache_adapter_1.setupCache;
const rest_client_1 = require("../rest-client");
class RestClientAxios extends rest_client_1.RestClient {
    constructor(opts = {}) {
        // @ts-ignore
        opts.httpClient = opts.httpClient || createAxios(opts.configAxios);
        super(opts);
    }
}
RestClientAxios.getOptionsFromAxiosResponse = getOptionsFromAxiosResponse;
RestClientAxios.createAxios = createAxios;
exports.RestClientAxios = RestClientAxios;
function createAxios(config = {}) {
    let { cache } = {
        ...config,
    };
    if (cache) {
        let t = typeof cache;
        if (t === 'boolean') {
            cache = axios_cache_adapter_1.setupCache({
                maxAge: 15 * 60 * 1000,
            });
        }
        else if (t === 'number') {
            cache = axios_cache_adapter_1.setupCache({
                maxAge: t,
            });
        }
        else if (!('adapter' in cache && 'config' in cache && 'store' in cache)) {
            throw new TypeError(`cache: ${cache}`);
        }
        if (config.adapter) {
            throw new TypeError(`config.adapter already exists`);
        }
        const fs = require('fs');
        const cacheFile = [process.cwd(), './temp.cache.json'].join('/');
        if (fs.existsSync(cacheFile)) {
            let data = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
            Object.entries(data)
                .forEach(([k, v]) => {
                cache.store.setItem(k, v);
                //console.log('[setCache]', k);
            });
        }
        process.on('exit', function () {
            //console.dir(argv);
            let ls = {};
            cache.store
                // @ts-ignore
                .iterate(function (value, key) {
                if (typeof value === 'string') {
                    try {
                        value = JSON.parse(value);
                    }
                    catch (e) {
                    }
                }
                ls[key] = value;
            })
                .then(function () {
                fs.writeFileSync(cacheFile, JSON.stringify(ls, null, '\t'));
                console.debug(`[Cache]`, `saved`, cacheFile);
            });
        });
        config.adapter = cache.adapter;
    }
    delete config.cache;
    return axios_observable_1.Axios.create(config);
}
exports.createAxios = createAxios;
function getOptionsFromAxiosResponse(ret) {
    try {
        return ret.request.res.connection._httpMessage.res.req._redirectable._options;
    }
    catch (e) {
    }
    return null;
}
exports.getOptionsFromAxiosResponse = getOptionsFromAxiosResponse;
function infoFromAxiosResponse(ret) {
    let path = ret.request.path;
    let responseUrl = ret.request.res.responseUrl;
    let redirects = ret.request.res.redirects;
    let status = ret.status;
    let statusText = ret.statusText;
    let headers = ret.headers;
    let options = getOptionsFromAxiosResponse(ret);
    return {
        status,
        statusText,
        path,
        responseUrl,
        redirects,
        headers,
        options,
    };
}
exports.infoFromAxiosResponse = infoFromAxiosResponse;
exports.default = RestClientAxios;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsdURBQXlDO0FBY08sZ0JBZHZDLHdCQUFLLENBY3VDO0FBYnJELGFBQWE7QUFDYiw2REFBaUQ7QUFZTSxxQkFaOUMsZ0NBQVUsQ0FZOEM7QUFUakUsZ0RBQWdFO0FBZWhFLE1BQXNCLGVBQXlDLFNBQVEsd0JBQWE7SUFFbkYsWUFBWSxPQUE0QyxFQUFFO1FBRXpELGFBQWE7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVuRSxLQUFLLENBQUMsSUFBa0MsQ0FBQyxDQUFDO0lBQzNDLENBQUM7O0FBRU0sMkNBQTJCLEdBQUcsMkJBQTJCLENBQUM7QUFDMUQsMkJBQVcsR0FBRyxXQUFXLENBQUM7QUFYbEMsMENBYUM7QUFPRCxTQUFnQixXQUFXLENBQUMsU0FBeUIsRUFBRTtJQUV0RCxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUc7UUFDZixHQUFHLE1BQU07S0FDVCxDQUFDO0lBRUYsSUFBSSxLQUFLLEVBQ1Q7UUFDQyxJQUFJLENBQUMsR0FBRyxPQUFPLEtBQUssQ0FBQztRQUVyQixJQUFJLENBQUMsS0FBSyxTQUFTLEVBQ25CO1lBQ0MsS0FBSyxHQUFHLGdDQUFVLENBQUM7Z0JBQ2xCLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7YUFDdEIsQ0FBQyxDQUFBO1NBQ0Y7YUFDSSxJQUFJLENBQUMsS0FBSyxRQUFRLEVBQ3ZCO1lBQ0MsS0FBSyxHQUFHLGdDQUFVLENBQUM7Z0JBQ2xCLE1BQU0sRUFBRSxDQUFDO2FBQ1QsQ0FBQyxDQUFBO1NBQ0Y7YUFDSSxJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxF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RyxDQUFDLFVBQVUsQ0FBQztJQUNoQyxJQUFJLE9BQU8sR0FBMkIsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUVsRCxJQUFJLE9BQU8sR0FBRywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQyxPQUFPO1FBQ04sTUFBTTtRQUNOLFVBQVU7UUFFVixJQUFJO1FBQ0osV0FBVztRQUNYLFNBQVM7UUFFVCxPQUFPO1FBRVAsT0FBTztLQUNQLENBQUE7QUFDRixDQUFDO0FBeEJELHNEQXdCQztBQUVELGtCQUFlLGVBQWUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNS8xMi5cbiAqL1xuXG5pbXBvcnQgeyBBeGlvcyB9IGZyb20gJ2F4aW9zLW9ic2VydmFibGUnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgc2V0dXBDYWNoZSB9IGZyb20gJ2F4aW9zLWNhY2hlLWFkYXB0ZXInO1xuaW1wb3J0IHsgQXhpb3NPYnNlcnZhYmxlIGFzIElBeGlvc09ic2VydmFibGUgfSBmcm9tICdheGlvcy1vYnNlcnZhYmxlL2Rpc3QvYXhpb3Mtb2JzZXJ2YWJsZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXhpb3NSZXF1ZXN0Q29uZmlnIGFzIElBeGlvc1JlcXVlc3RDb25maWcsIEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBJUmVzdENsaWVudE9wdGlvbnMsIFJlc3RDbGllbnQgfSBmcm9tICcuLi9yZXN0LWNsaWVudCc7XG5cbmV4cG9ydCB0eXBlIElBeGlvcyA9IHR5cGVvZiBBeGlvcztcblxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdENvbmZpZyBleHRlbmRzIElBeGlvc1JlcXVlc3RDb25maWdcbntcblx0Y2FjaGU/OiBudW1iZXIgfCBib29sZWFuIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2V0dXBDYWNoZT5cbn1cblxuZXhwb3J0IHsgSUF4aW9zT2JzZXJ2YWJsZSwgSUF4aW9zUmVxdWVzdENvbmZpZywgQXhpb3MsIHNldHVwQ2FjaGUgfVxuXG5leHBvcnQgdHlwZSBJUmVzdENsaWVudEF4aW9zT3B0aW9uczxUIGV4dGVuZHMgQXhpb3MgPSBBeGlvcz4gPSBJUmVzdENsaWVudE9wdGlvbnM8VD4gJiB7XG5cdGNvbmZpZ0F4aW9zPzogSVJlcXVlc3RDb25maWcsXG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVzdENsaWVudEF4aW9zPFQgZXh0ZW5kcyBBeGlvcyA9IEF4aW9zPiBleHRlbmRzIFJlc3RDbGllbnQ8VD5cbntcblx0Y29uc3RydWN0b3Iob3B0czogUGFydGlhbDxJUmVzdENsaWVudEF4aW9zT3B0aW9uczxUPj4gPSB7fSlcblx0e1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRvcHRzLmh0dHBDbGllbnQgPSBvcHRzLmh0dHBDbGllbnQgfHwgY3JlYXRlQXhpb3Mob3B0cy5jb25maWdBeGlvcyk7XG5cblx0XHRzdXBlcihvcHRzIGFzIElSZXN0Q2xpZW50QXhpb3NPcHRpb25zPFQ+KTtcblx0fVxuXG5cdHN0YXRpYyBnZXRPcHRpb25zRnJvbUF4aW9zUmVzcG9uc2UgPSBnZXRPcHRpb25zRnJvbUF4aW9zUmVzcG9uc2U7XG5cdHN0YXRpYyBjcmVhdGVBeGlvcyA9IGNyZWF0ZUF4aW9zO1xuXG59XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBSZXN0Q2xpZW50QXhpb3Ncbntcblx0ZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZTxUPiA9IElBeGlvc09ic2VydmFibGU8VD5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUF4aW9zKGNvbmZpZzogSVJlcXVlc3RDb25maWcgPSB7fSlcbntcblx0bGV0IHsgY2FjaGUgfSA9IHtcblx0XHQuLi5jb25maWcsXG5cdH07XG5cblx0aWYgKGNhY2hlKVxuXHR7XG5cdFx0bGV0IHQgPSB0eXBlb2YgY2FjaGU7XG5cblx0XHRpZiAodCA9PT0gJ2Jvb2xlYW4nKVxuXHRcdHtcblx0XHRcdGNhY2hlID0gc2V0dXBDYWNoZSh7XG5cdFx0XHRcdG1heEFnZTogMTUgKiA2MCAqIDEwMDAsXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRlbHNlIGlmICh0ID09PSAnbnVtYmVyJylcblx0XHR7XG5cdFx0XHRjYWNoZSA9IHNldHVwQ2FjaGUoe1xuXHRcdFx0XHRtYXhBZ2U6IHQsXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRlbHNlIGlmICghKCdhZGFwdGVyJyBpbiBjYWNoZSAmJiAnY29uZmlnJyBpbiBjYWNoZSAmJiAnc3RvcmUnIGluIGNhY2hlKSlcblx0XHR7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBjYWNoZTogJHtjYWNoZX1gKVxuXHRcdH1cblxuXHRcdGlmIChjb25maWcuYWRhcHRlcilcblx0XHR7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBjb25maWcuYWRhcHRlciBhbHJlYWR5IGV4aXN0c2ApXG5cdFx0fVxuXG5cdFx0Y29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5cdFx0Y29uc3QgY2FjaGVGaWxlID0gW3Byb2Nlc3MuY3dkKCksICcuL3RlbXAuY2FjaGUuanNvbiddLmpvaW4oJy8nKTtcblxuXHRcdGlmIChmcy5leGlzdHNTeW5jKGNhY2hlRmlsZSkpXG5cdFx0e1xuXHRcdFx0bGV0IGRhdGEgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjYWNoZUZpbGUsICd1dGY4JykpO1xuXG5cdFx0XHRPYmplY3QuZW50cmllcyhkYXRhKVxuXHRcdFx0XHQuZm9yRWFjaCgoW2ssIHZdKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2FjaGUuc3RvcmUuc2V0SXRlbShrLCB2KTtcblxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ1tzZXRDYWNoZV0nLCBrKTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cHJvY2Vzcy5vbignZXhpdCcsIGZ1bmN0aW9uICgpXG5cdFx0e1xuXHRcdFx0Ly9jb25zb2xlLmRpcihhcmd2KTtcblxuXHRcdFx0bGV0IGxzOiB7XG5cdFx0XHRcdFtrOiBzdHJpbmddOiBhbnlcblx0XHRcdH0gPSB7fTtcblxuXHRcdFx0Y2FjaGUuc3RvcmVcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHQuaXRlcmF0ZShmdW5jdGlvbiAodmFsdWU6IGFueSB8IHN0cmluZywga2V5OiBzdHJpbmcpXG5cdFx0XHRcdHtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRyeVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHRcdFx0XHR7XG5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsc1trZXldID0gdmFsdWVcblxuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZnMud3JpdGVGaWxlU3luYyhjYWNoZUZpbGUsIEpTT04uc3RyaW5naWZ5KGxzLCBudWxsLCAnXFx0JykpO1xuXG5cdFx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhgW0NhY2hlXWAsIGBzYXZlZGAsIGNhY2hlRmlsZSk7XG5cdFx0XHRcdH0pXG5cdFx0XHQ7XG5cdFx0fSk7XG5cblx0XHRjb25maWcuYWRhcHRlciA9IGNhY2hlLmFkYXB0ZXI7XG5cdH1cblxuXHRkZWxldGUgY29uZmlnLmNhY2hlO1xuXG5cdHJldHVybiBBeGlvcy5jcmVhdGUoY29uZmlnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3B0aW9uc0Zyb21BeGlvc1Jlc3BvbnNlPFQgZXh0ZW5kcyBBeGlvc1Jlc3BvbnNlPGFueT4+KHJldDogVCk6IElBeGlvc1JlcXVlc3RDb25maWdcbntcblx0dHJ5XG5cdHtcblx0XHRyZXR1cm4gcmV0LnJlcXVlc3QucmVzLmNvbm5lY3Rpb24uX2h0dHBNZXNzYWdlLnJlcy5yZXEuX3JlZGlyZWN0YWJsZS5fb3B0aW9uc1xuXHR9XG5cdGNhdGNoIChlKVxuXHR7XG5cblx0fVxuXHRyZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZm9Gcm9tQXhpb3NSZXNwb25zZTxUIGV4dGVuZHMgQXhpb3NSZXNwb25zZTxhbnk+PihyZXQ6IFQpXG57XG5cdGxldCBwYXRoOiBzdHJpbmcgPSByZXQucmVxdWVzdC5wYXRoO1xuXHRsZXQgcmVzcG9uc2VVcmw6IHN0cmluZyA9IHJldC5yZXF1ZXN0LnJlcy5yZXNwb25zZVVybDtcblx0bGV0IHJlZGlyZWN0czogc3RyaW5nID0gcmV0LnJlcXVlc3QucmVzLnJlZGlyZWN0cztcblxuXHRsZXQgc3RhdHVzID0gcmV0LnN0YXR1cztcblx0bGV0IHN0YXR1c1RleHQgPSByZXQuc3RhdHVzVGV4dDtcblx0bGV0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSByZXQuaGVhZGVycztcblxuXHRsZXQgb3B0aW9ucyA9IGdldE9wdGlvbnNGcm9tQXhpb3NSZXNwb25zZShyZXQpO1xuXG5cdHJldHVybiB7XG5cdFx0c3RhdHVzLFxuXHRcdHN0YXR1c1RleHQsXG5cblx0XHRwYXRoLFxuXHRcdHJlc3BvbnNlVXJsLFxuXHRcdHJlZGlyZWN0cyxcblxuXHRcdGhlYWRlcnMsXG5cblx0XHRvcHRpb25zLFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3RDbGllbnRBeGlvc1xuIl19