/**
 * Created by user on 2019/5/12.
 */

import 'reflect-metadata';
import { resolve as _url_resolve } from 'url';
import Bluebird = require('bluebird');
import util = require('util');
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
export { AxiosObservable as Observable } from 'axios-observable/dist/axios-observable.interface';

export type IBluebird = typeof Bluebird;

export function urlNormalize(input: string | URL): string
{
	if (typeof input === 'string')
	{
		return new URL(input).href
	}
	else if (typeof input.href !== 'string')
	{
		throw new TypeError(`input not string | URL`)
	}

	return input.href
}

export function urlResolve(input: string, base?: string | URL): string
{
	if (typeof input !== 'string')
	{
		throw new TypeError(`input not string | URL`)
	}

	if (base == null)
	{
		return urlNormalize(input)
	}

	return _url_resolve(urlNormalize(base), input);
}

export const enum EnumRestClientMetadata
{
	PARAM_PATH = 'Path',
	PARAM_QUERY = 'Query',
	PARAM_BODY = 'Body',
	PARAM_HEADER = 'Header',

	METHOD_GET = 'GET',
	METHOD_POST = 'POST',
	METHOD_PUT = 'PUT',
	METHOD_PATCH = 'PATCH',
	METHOD_DELETE = 'DELETE',
	METHOD_HEAD = 'HEAD',

	METHOD = 'METHOD',
	BASE_URL = 'BASE_URL',

	DEFAULT_HEADERS = 'DEFAULT_HEADERS',

	HTTP_CLIENT = 'HTTP_CLIENT',
	REQUEST_INTERCEPTOR = 'REQUEST_INTERCEPTOR',

}

export const SymbolBaseUrl = Symbol(EnumRestClientMetadata.BASE_URL);
export const SymbolDefaultHeaders = Symbol(EnumRestClientMetadata.DEFAULT_HEADERS);
export const SymbolHttpClient = Symbol(EnumRestClientMetadata.HTTP_CLIENT);
export const SymbolRequestInterceptor = Symbol(EnumRestClientMetadata.REQUEST_INTERCEPTOR);

export function standardQueryEncoding(v: string): string
{
	return encodeURIComponent(v);
}

export function subscribeObservable<T extends AxiosObservable<any>>(ob: T)
{
	return Bluebird.resolve(ob)
		//.tap(r => console.dir(r))
		.then(function (ob)
		{
			return ob.subscribe(function (x)
				{
					console.log('Next: %s', util.inspect(x.data));
				},
				function (err)
				{
					console.log('Error: %s', util.inspect(err));
				},
				function ()
				{
					console.log('Completed');
				}
			)
		})
		;
}
