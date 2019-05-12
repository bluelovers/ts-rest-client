/**
 * Created by user on 2019/5/12.
 */

import { Axios } from 'axios-observable';
// @ts-ignore
import { setupCache } from 'axios-cache-adapter';
import { AxiosObservable as IAxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { AxiosRequestConfig as IAxiosRequestConfig, AxiosResponse } from 'axios';
import { IRestClientOptions, RestClient } from '../rest-client';

export type IAxios = typeof Axios;

export interface IRequestConfig extends IAxiosRequestConfig
{
	cache?: number | boolean | ReturnType<typeof setupCache>
}

export { IAxiosObservable, IAxiosRequestConfig, Axios, setupCache }

export type IRestClientAxiosOptions<T extends Axios = Axios> = IRestClientOptions<T> & {
	configAxios?: IRequestConfig,
};

export abstract class RestClientAxios<T extends Axios = Axios> extends RestClient<T>
{
	constructor(opts: Partial<IRestClientAxiosOptions<T>> = {})
	{
		// @ts-ignore
		opts.httpClient = opts.httpClient || createAxios(opts.configAxios);

		super(opts as IRestClientAxiosOptions<T>);
	}

	static getOptionsFromAxiosResponse = getOptionsFromAxiosResponse;
	static createAxios = createAxios;

}

export declare namespace RestClientAxios
{
	export type Observable<T> = IAxiosObservable<T>
}

export function createAxios(config: IRequestConfig = {})
{
	let { cache } = {
		...config,
	};

	if (cache)
	{
		let t = typeof cache;

		if (t === 'boolean')
		{
			cache = setupCache({
				maxAge: 15 * 60 * 1000,
			})
		}
		else if (t === 'number')
		{
			cache = setupCache({
				maxAge: t,
			})
		}
		else if (!('adapter' in cache && 'config' in cache && 'store' in cache))
		{
			throw new TypeError(`cache: ${cache}`)
		}

		if (config.adapter)
		{
			throw new TypeError(`config.adapter already exists`)
		}

		const fs = require('fs');

		const cacheFile = [process.cwd(), './temp.cache.json'].join('/');

		if (fs.existsSync(cacheFile))
		{
			let data = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));

			Object.entries(data)
				.forEach(([k, v]) =>
				{
					cache.store.setItem(k, v);

					//console.log('[setCache]', k);
				});
		}

		process.on('exit', function ()
		{
			//console.dir(argv);

			let ls: {
				[k: string]: any
			} = {};

			cache.store
				// @ts-ignore
				.iterate(function (value: any | string, key: string)
				{

					if (typeof value === 'string')
					{
						try
						{
							value = JSON.parse(value);
						}
						catch (e)
						{

						}
					}

					ls[key] = value

				})
				.then(function ()
				{
					fs.writeFileSync(cacheFile, JSON.stringify(ls, null, '\t'));

					console.debug(`[Cache]`, `saved`, cacheFile);
				})
			;
		});

		config.adapter = cache.adapter;
	}

	delete config.cache;

	return Axios.create(config)
}

export function getOptionsFromAxiosResponse<T extends AxiosResponse<any>>(ret: T): IAxiosRequestConfig
{
	try
	{
		return ret.request.res.connection._httpMessage.res.req._redirectable._options
	}
	catch (e)
	{

	}
	return null;
}

export function infoFromAxiosResponse<T extends AxiosResponse<any>>(ret: T)
{
	let path: string = ret.request.path;
	let responseUrl: string = ret.request.res.responseUrl;
	let redirects: string = ret.request.res.redirects;

	let status = ret.status;
	let statusText = ret.statusText;
	let headers: Record<string, string> = ret.headers;

	let options = getOptionsFromAxiosResponse(ret);

	return {
		status,
		statusText,

		path,
		responseUrl,
		redirects,

		headers,

		options,
	}
}

export default RestClientAxios
