import 'reflect-metadata';
// tslint:disable:ban-types
import { HttpMethod, HttpRequestOptions, IHttpRequestHeaders } from './http-request-options';
import { HttpService } from './http-service';
import { NamedValues, StringMap } from './named-values';

import {
	EnumRestClientMetadata,
	getThisTypeMetadata,
	SymbolBaseUrl,
	SymbolDefaultHeaders,
	SymbolHttpClient,
	SymbolRequestInterceptor,
	urlResolve,
} from './util';
import { IAxiosObservable as Observable, IAxiosRequestConfig } from './axios';

interface Parameter<T = any> {
  key: string;
  parameterIndex: number;
  defaultValue?: T
}

export type UnpackRequestOptions<H extends HttpService> = H extends HttpService<infer U> ? U : IAxiosRequestConfig

/**
 * An interceptor is a function that takes the prepared HTTP request data and returns them modified.
 */
export type HttpRequestInterceptor<H extends HttpService> = <T extends HttpRequestOptions>(request: T) => UnpackRequestOptions<H> | any;

export interface IRestClientOptions<H extends HttpService>
{
  httpClient: H;
  requestInterceptor?: HttpRequestInterceptor<H>;
}

/**
 * Abstract base class for the REST clients.
 */
export abstract class RestClient<H extends HttpService = HttpService> {
  readonly [SymbolHttpClient]: H;

  /**
   * Request interceptor allowing to modifiy the collected request data before sending it.
   * Typical use is the insertion of an authorization token to the request headers.
   * Leave null if you don't want to use it.
   */
  protected [SymbolRequestInterceptor]: HttpRequestInterceptor<H> = null;

  constructor(options: IRestClientOptions<H>) {
    this[SymbolHttpClient] = options.httpClient;
    this[SymbolRequestInterceptor] = options.requestInterceptor || null;
  }

  get $baseURL(): string
  {
    return this[SymbolBaseUrl]()
  }

  get $http()
  {
    return this[SymbolHttpClient]
  }

  $request<T>(options: UnpackRequestOptions<H>): Observable<T>
  {
    return this[SymbolHttpClient].request<T>(options)
  }

  /**
   * Returns the base of the REST API URL.
   */
  [SymbolBaseUrl](): string
  {
    return getThisTypeMetadata(EnumRestClientMetadata.BASE_URL, this) || null;
  }

  /**
   * Returns the default HTTP headers attached to each request.
   */
  [SymbolDefaultHeaders](): IHttpRequestHeaders {
    return getThisTypeMetadata(EnumRestClientMetadata.DEFAULT_HEADERS, this) || null;
  }
}

/**
 * Sets the default HTTP headers attached to each request to the REST API.
 * Intended to use as a decorator: @DefaultHeaders({'Header': 'value', 'Header2': 'value'}
 * @param headers   The headers in key-value pairs.
 */
export function DefaultHeaders(headers: IHttpRequestHeaders) {
  return Reflect.metadata(EnumRestClientMetadata.DEFAULT_HEADERS, headers);
}

/**
 * Sets the base URL of the REST API.
 * Intended to use as a decorator: @BaseUrl("http://...")
 * @param url   the base URL.
 */
export function BaseUrl(url: string | URL) {
	return Reflect.metadata(EnumRestClientMetadata.BASE_URL, url)
}

export type IClassWithPrototype<T extends object = object> = object & {
  prototype: T;
}

export type IEnumRestClientMetadataParam = EnumRestClientMetadata.PARAM_PATH | EnumRestClientMetadata.PARAM_QUERY | EnumRestClientMetadata.PARAM_BODY | EnumRestClientMetadata.PARAM_HEADER
  ;

export type IEnumRestClientMetadataMethod = EnumRestClientMetadata.METHOD_GET | EnumRestClientMetadata.METHOD_POST | EnumRestClientMetadata.METHOD_PUT | EnumRestClientMetadata.METHOD_PATCH | EnumRestClientMetadata.METHOD_DELETE | EnumRestClientMetadata.METHOD_HEAD
  ;

export type IEnumRestClientMetadataExclude = Exclude<EnumRestClientMetadata, IEnumRestClientMetadataParam>;

export interface IRestClientMethodMetadataReturn
{
  [EnumRestClientMetadata.PARAM_PATH]: Parameter[],
  [EnumRestClientMetadata.PARAM_QUERY]: Parameter[],
  [EnumRestClientMetadata.PARAM_BODY]: Parameter[],
  [EnumRestClientMetadata.PARAM_HEADER]: Parameter[],

  [EnumRestClientMetadata.METHOD]: IEnumRestClientMetadataMethod,

  [EnumRestClientMetadata.BASE_URL]: string,
  [EnumRestClientMetadata.DEFAULT_HEADERS]: StringMap,
}

export function getRestClientMethodMetadata<K extends IEnumRestClientMetadataParam, RC extends RestClient = RestClient>(metadataKey: K, target: RC, propertyKey: symbol | string): IRestClientMethodMetadataReturn[K]
export function getRestClientMethodMetadata<T extends unknown, RC extends RestClient = RestClient>(metadataKey: IEnumRestClientMetadataExclude, target: RC, propertyKey: symbol | string): T
export function getRestClientMethodMetadata<T extends any, RC extends RestClient = RestClient>(metadataKey: EnumRestClientMetadata, target: RC, propertyKey: symbol | string): T
{
  return Reflect.getMetadata(metadataKey, target, propertyKey as any);
}

export function setRestClientMethodMetadata<K extends IEnumRestClientMetadataParam, RC extends RestClient>(metadataKey: K, target: RC, propertyKey: symbol | string, metadataValue: IRestClientMethodMetadataReturn[K]): void
export function setRestClientMethodMetadata<RC extends RestClient>(metadataKey: IEnumRestClientMetadataExclude, target: RC, propertyKey: symbol | string, metadataValue: any): void
export function setRestClientMethodMetadata<RC extends RestClient>(metadataKey: EnumRestClientMetadata, target: RC, propertyKey: symbol | string, metadataValue: any)
{
  return Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey as any);
}

function paramBuilder(paramName: IEnumRestClientMetadataParam) {
  return function(key: string, defaultValue?: any) {
    return function<RC extends RestClient>(target: RC, propertyKey: any, parameterIndex: number) {
      //const metadataKey = `${String(propertyKey)}_${paramName}_parameters`;
      const paramObj: Parameter = {
        key,
        parameterIndex,
        defaultValue,
      };

      let arr = getRestClientMethodMetadata(paramName, target, propertyKey) || [];
      arr.push(paramObj);
      setRestClientMethodMetadata(paramName, target, propertyKey, arr);
    };
  };
}

/**
 * Path variable of a method's URL, type: string.
 * @param key   path key to bind value.
 */
export const Path = paramBuilder(EnumRestClientMetadata.PARAM_PATH);

/**
 * Query value of a method's URL, type: string.
 * @param key   query key to bind value.
 */
export const Query = paramBuilder(EnumRestClientMetadata.PARAM_QUERY);

/**
 * Body of a REST method, type: key-value pair object.
 * Only one body per method!
 */
export const Body = paramBuilder(EnumRestClientMetadata.PARAM_BODY)('Body');

/**
 * Custom header of a REST method, type: string.
 * @param key   header key to bind value.
 */
export const Header = paramBuilder(EnumRestClientMetadata.PARAM_HEADER);

export interface IRestClientMethodDescriptor<T extends Function, SM extends StringMap = StringMap> extends TypedPropertyDescriptor<T>
{
	headers?: NamedValues<SM>
}

/**
 * Set custom headers for a REST method.
 * @param headersDef    custom headers in key-value pairs.
 */
export function Headers<SM extends StringMap>(headersDef: SM) {
  return function<F extends Function>(_target: RestClient, _propertyKey: string, descriptor: IRestClientMethodDescriptor<F, SM>) {
  	// @ts-ignore
    descriptor.headers = headersDef;
    return descriptor;
  };
}

export function methodBuilder(method: HttpMethod) {
  return function(url: string) {
    return function<RC extends RestClient = RestClient>(target: RC, propertyKey: symbol | string, descriptor: IRestClientMethodDescriptor<Function>) {
      //const pPath = target[`${propertyKey}_Path_parameters`] as Parameter[];
      //const pQuery = target[`${propertyKey}_Query_parameters`] as Parameter[];
      //const pBody = target[`${propertyKey}_Body_parameters`] as Parameter[];
      //const pHeader = target[`${propertyKey}_Header_parameters`] as Parameter[];

      const pPath = getRestClientMethodMetadata(EnumRestClientMetadata.PARAM_PATH, target, propertyKey);
      const pQuery = getRestClientMethodMetadata(EnumRestClientMetadata.PARAM_QUERY, target, propertyKey);
      const pBody = getRestClientMethodMetadata(EnumRestClientMetadata.PARAM_BODY, target, propertyKey);
      const pHeader = getRestClientMethodMetadata(EnumRestClientMetadata.PARAM_HEADER, target, propertyKey);

      const oldFn = descriptor.value;

      setRestClientMethodMetadata(EnumRestClientMetadata.METHOD, target, propertyKey, method);

      descriptor.value = function(...args: any[]) {
        let body = null;
        if (pBody) {
          body = JSON.stringify(args[pBody[0].parameterIndex]);
        }

        const self: RC = this;

        let resUrl: string = url;
        if (pPath) {
          for (const k in pPath) {
            if (pPath.hasOwnProperty(k)) {

              let value = args[pPath[k].parameterIndex];

              if (typeof value === 'undefined' && typeof pPath[k].defaultValue !== 'undefined')
              {
              	let defaultValue = pPath[k].defaultValue;
              	if (typeof defaultValue === 'function')
								{
									value = defaultValue();
								}
              	else
								{
									value = defaultValue;
								}
              }

              resUrl = resUrl.replace('{' + pPath[k].key + '}', value);
            }
          }
        }

        const params = new NamedValues();
        if (pQuery) {
          pQuery
            .filter(p => args[p.parameterIndex])
            .forEach(p => {
              const key = p.key;
              let value = args[p.parameterIndex];
              if (value instanceof Object) {
                value = JSON.stringify(value);
              }
              params.set(key, value);
            });
        }
        const headers = new NamedValues(self[SymbolDefaultHeaders]());
        if (descriptor.headers) {
          for (const k in descriptor.headers) {
            if (descriptor.headers.hasOwnProperty(k)) {
              // @ts-ignore
              headers.set(k, descriptor.headers[k]);
            }
          }
        }

        if (pHeader) {
          for (const k in pHeader) {
            if (pHeader.hasOwnProperty(k)) {
              headers.set(pHeader[k].key, args[pHeader[k].parameterIndex]);
            }
          }
        }
        const finalUrl = urlResolve( resUrl, self[SymbolBaseUrl]());
        let request: IAxiosRequestConfig | HttpRequestOptions = new HttpRequestOptions(finalUrl, method, body, headers, params);
        if (this[SymbolRequestInterceptor]) {
          request = this[SymbolRequestInterceptor](request);
        }

        if (request instanceof HttpRequestOptions)
        {
          // @ts-ignore
          request = request.toValue() as IAxiosRequestConfig
        }

        const oldTransformResponse = request.transformResponse;

        let newTransformRespons = function (data: any)
        {
          let ret = oldFn.call(self, data);

          if (ret == null)
          {
            return data;
          }

          return ret;
        };

        if (!Array.isArray(oldTransformResponse))
        {
          if (!oldTransformResponse)
          {
            request.transformResponse = [];
          }
          else
          {
            request.transformResponse = [oldTransformResponse];
          }
        }

        (request.transformResponse as any[]).push(newTransformRespons);

        //console.log(request);

        return self.$http.request(request);
      };
    };
  };
}

/**
 * GET method.
 * @param url   resource URL of the method
 */
export const GET = methodBuilder(EnumRestClientMetadata.METHOD_GET);

/**
 * POST method.
 * @param url   resource URL of the method
 */
export const POST = methodBuilder(EnumRestClientMetadata.METHOD_POST);

/**
 * PUT method.
 * @param url   resource URL of the method
 */
export const PUT = methodBuilder(EnumRestClientMetadata.METHOD_PUT);

/**
 * PATCH method.
 * @param url   resource URL of the method
 */
export const PATCH = methodBuilder(EnumRestClientMetadata.METHOD_PATCH);

/**
 * DELETE method.
 * @param url   resource URL of the method
 */
export const DELETE = methodBuilder(EnumRestClientMetadata.METHOD_DELETE);

/**
 * HEAD method.
 * @param url   resource URL of the method
 */
export const HEAD = methodBuilder(EnumRestClientMetadata.METHOD_HEAD);

export default RestClient
