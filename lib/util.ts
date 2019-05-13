/**
 * Created by user on 2019/5/12.
 */

import 'reflect-metadata';
import { resolve as _url_resolve } from 'url';
import { IAxiosObservable } from './axios';
import { Observer, PartialObserver } from 'rxjs';
import Bluebird = require('bluebird');
import util = require('util');
import Rxjs = require('rxjs');
import { IClassWithPrototype } from './rest-client';

export { Observer, PartialObserver }

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

	return input.href;
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

	return urlNormalize(_url_resolve(urlNormalize(base), input));
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

export function createObserver<T, E extends Error | any = Error>(observer?: PartialObserver<T>,
	log = console,
): Observer<T>
{
	return {
		next(data: T)
		{
			log.debug('Next: %s', util.inspect(data));
		},
		error(err: E)
		{
			log.debug('Error: %s', util.inspect(err));
		},
		complete()
		{
			log.debug('Completed');
		},
		...observer,
	}
}

export type IUnpackObservableData<T extends Rxjs.Observable<any>> =
	T extends Rxjs.Observable<infer U> ? U
		: unknown
	;

export type IUnpackAxiosObservableData<T extends Rxjs.Observable<any>> =
	T extends IAxiosObservable<infer U> ? U
		: T extends Rxjs.Observable<infer U> ? U
		: unknown
	;

export function subscribeObservable<T extends Rxjs.Observable<any>>(ob: T,
	observer?: PartialObserver<IUnpackObservableData<T>>,
)
{
	return ob.subscribe(createObserver<IUnpackObservableData<T>>(observer));
}

export function resolveObservable<T extends Rxjs.Observable<any>>(ob: T,
	observer?: PartialObserver<IUnpackObservableData<T>>,
)
{
	return Bluebird.resolve(ob)
		.then(function (ob)
		{
			return subscribeObservable(ob, observer)
		})
		;
}

export default exports as typeof import('./util');

export function getThisTypeMetadata<T extends any>(metadataKey: any, target: ThisType<any>): T
{
	return Reflect.getMetadata(metadataKey, Reflect.getPrototypeOf(target).constructor)
}

export function setThisTypeMetadata(metadataKey: any, metadataValue: any, target: ThisType<any>)
{
	return Reflect.defineMetadata(metadataKey, metadataValue, Reflect.getPrototypeOf(target).constructor)
}

export function getClassMetadata<T extends any>(metadataKey: any, target: IClassWithPrototype): T
{
	return Reflect.getMetadata(metadataKey, target)
}

export function setClassMetadata(metadataKey: any, metadataValue: any, target: IClassWithPrototype)
{
	return Reflect.defineMetadata(metadataKey, metadataValue, target)
}
