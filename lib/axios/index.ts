/**
 * Created by user on 2019/5/12.
 */

// @ts-ignore
import { setupCache } from 'axios-cache-adapter';
import { Axios } from 'axios-observable';
import { AxiosObservable as IAxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import { AxiosRequestConfig as IAxiosRequestConfig } from 'axios';
import { IRestClientOptions, RestClient } from '../rest-client';

export type IAxios = typeof Axios;

export interface IRequestConfig extends IAxiosRequestConfig
{
	cache?: number | boolean | ReturnType<typeof setupCache>
}

export { IAxiosObservable, IAxiosRequestConfig, Axios, setupCache }

export type IRestClientAxiosOptions<T extends Axios = Axios> = IRestClientOptions<T> & {
	config?: IRequestConfig,
};

export abstract class RestClientAxios<T extends Axios = Axios> extends RestClient<T>
{
	constructor(opts: Partial<IRestClientAxiosOptions<T>> = {})
	{
		// @ts-ignore
		opts.httpClient = opts.httpClient || createAxios(opts.config);

		super(opts as IRestClientAxiosOptions<T>);
	}
}

export namespace RestClientAxios
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
				maxAge: 15 * 60 * 1000
			})
		}
		else if (t === 'number')
		{
			cache = setupCache({
				maxAge: t
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

		config.adapter = cache.adapter;
	}

	delete config.cache;

	return Axios.create(config)
}
