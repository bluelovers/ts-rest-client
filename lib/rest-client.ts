
// tslint:disable:ban-types
import { HttpMethod, HttpRequestOptions } from './http-request-options';
import { HttpService } from './http-service';
import { NamedValues, StringMap } from './named-values';
import "reflect-metadata";
import { resolve as url_resolve } from 'url';

interface Parameter {
  key: string;
  parameterIndex: number;
}

/**
 * An interceptor is a function that takes the prepared HTTP request data and returns them modified.
 */
export type HttpRequestInterceptor = <T extends HttpRequestOptions, U>(request: T) => U;

/**
 * Abstract base class for the REST clients.
 */
export abstract class RestClient {
  protected httpClient: HttpService;

  constructor(httpClient: HttpService) {
    this.httpClient = httpClient;
    this.requestInterceptor = null;
  }

  /**
   * Request interceptor allowing to modifiy the collected request data before sending it.
   * Typical use is the insertion of an authorization token to the request headers.
   * Leave null if you don't want to use it.
   */
  protected requestInterceptor: HttpRequestInterceptor | null;

  /**
   * Returns the base of the REST API URL.
   */
  protected getBaseUrl(): string | null {
    return null;
  }

  /**
   * Returns the default HTTP headers attached to each request.
   */
  protected getDefaultHeaders(): StringMap | null {
    return null;
  }
}

/**
 * Sets the default HTTP headers attached to each request to the REST API.
 * Intended to use as a decorator: @DefaultHeaders({'Header': 'value', 'Header2': 'value'}
 * @param headers   The headers in key-value pairs.
 */
export function DefaultHeaders(headers: StringMap): any {
  return function <TFunc extends Function>(Target: TFunc): TFunc {
    Target.prototype.getDefaultHeaders = function(): StringMap {
      return headers;
    };

    return Target;
  };
}

/**
 * Sets the base URL of the REST API.
 * Intended to use as a decorator: @BaseUrl("http://...")
 * @param url   the base URL.
 */
export function BaseUrl(url: string): any {
  return function <TFunc extends Function>(Target: TFunc): TFunc {
    Target.prototype.getBaseUrl = function(): any {
      return url;
    };
    return Target;
  };
}

export const enum EnumRestClientMetadata
{
  PARAM_PATH = 'Path',
  PARAM_QUERY = 'Query',
  PARAM_BODY = 'Body',
  PARAM_HEADER = 'Header',

  METHOD = 'METHOD',

  METHOD_GET = 'GET',
  METHOD_POST = 'POST',
  METHOD_PUT = 'PUT',
  METHOD_PATCH = 'PATCH',
  METHOD_DELETE = 'DELETE',
  METHOD_HEAD = 'HEAD',

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
}

export function getRestClientMethodMetadata<K extends IEnumRestClientMetadataParam, RC extends RestClient = RestClient>(metadataKey: K, target: RC, propertyKey: symbol | string): IRestClientMethodMetadataReturn[K]
export function getRestClientMethodMetadata<T extends any, RC extends RestClient = RestClient>(metadataKey: IEnumRestClientMetadataExclude, target: RC, propertyKey: symbol | string): T
export function getRestClientMethodMetadata<T extends any, RC extends RestClient = RestClient>(metadataKey: EnumRestClientMetadata, target: RC, propertyKey: symbol | string): T
{
  return Reflect.getMetadata(metadataKey, target, propertyKey as any);
}

export function setRestClientMethodMetadata<K extends IEnumRestClientMetadataParam, RC extends RestClient>(metadataKey: K, target: RC, propertyKey: symbol | string, metadataValue: IRestClientMethodMetadataReturn[K]): void
export function setRestClientMethodMetadata<RC extends RestClient>(metadataKey: IEnumRestClientMetadataExclude, target: RC, propertyKey: symbol | string, metadataValue): void
export function setRestClientMethodMetadata<RC extends RestClient>(metadataKey: EnumRestClientMetadata, target: RC, propertyKey: symbol | string, metadataValue)
{
  return Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey as any);
}

function paramBuilder(paramName: IEnumRestClientMetadataParam) {
  return function(key: string) {
    return function<RC extends RestClient>(target: RC, propertyKey: symbol | string, parameterIndex: number) {
      //const metadataKey = `${String(propertyKey)}_${paramName}_parameters`;
      const paramObj: Parameter = {
        key,
        parameterIndex,
      };

      let arr = getRestClientMethodMetadata(paramName, target, propertyKey);
      if (Array.isArray(arr)) {
        arr.push(paramObj);
      } else {
        arr = [paramObj];
      }
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

        let resUrl: string = url;
        if (pPath) {
          for (const k in pPath) {
            if (pPath.hasOwnProperty(k)) {
              resUrl = resUrl.replace('{' + pPath[k].key + '}', args[pPath[k].parameterIndex]);
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

        const headers = new NamedValues(this.getDefaultHeaders());
        for (const k in descriptor.headers) {
          if (descriptor.headers.hasOwnProperty(k)) {
            headers.set(k, descriptor.headers[k]);
          }
        }
        if (pHeader) {
          for (const k in pHeader) {
            if (pHeader.hasOwnProperty(k)) {
              headers.set(pHeader[k].key, args[pHeader[k].parameterIndex]);
            }
          }
        }

        const finalUrl = url_resolve(this.getBaseUrl(), resUrl);
        let request = new HttpRequestOptions(finalUrl, method, body, headers, params);
        if (this.requestInterceptor) {
          request = this.requestInterceptor(request);
        }

        // @ts-ignore
        const oldTransformResponse = request.transformResponse;

        // @ts-ignore
        request.transformResponse = function (data)
        {
          let ret = oldFn(oldTransformResponse ? oldTransformResponse.call(this, data) : data);
          if (ret == null)
          {
            return data;
          }
          return ret;
        };

        return (this.httpClient as HttpService).request(request);
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
