import { NamedValues, StringMap } from './named-values';
import { IEnumRestClientMetadataMethod } from './rest-client';
import { standardQueryEncoding } from './util';
import { IAxiosRequestConfig } from './axios';

/** HTTP Method to be used in the request. */
export type HttpMethod = IEnumRestClientMetadataMethod;

export interface IHttpRequestHeaders extends StringMap<any>
{
	Accepts?: string | 'application/json',
	'Accept-Language'?: string,
	'Accept-Encoding'?: string,
	'Referer'?: string,
	'Connection'?: string,
	'Upgrade-Insecure-Requests'?: string,
	'If-Modified-Since'?: string,
	'If-None-Match'?: string,
	'Content-Type'?: string | 'application/json',
	'User-Agent'?: string,
	'Cache-Control'?: string,
	'Authorization'?: string,
	'Cookie'?: string,
	'Content-Length'?: string,
	'Date'?: string,
	'Max-Forwards'?: number,
	'Origin'?: string,
	'Proxy-Authorization'?: string,
	'Range'?: string,
	'X-Requested-With'?: string,
	'X-Forwarded-For'?: string,
	'X-Forwarded-Host'?: string,
	'X-HTTP-Method-Override'?: string,
	'X-Att-Deviceid'?: string,
	'X-Wap-Profile'?: string,
	'Access-Control-Allow-Origin'?: string | '*',
	'Allow'?: string,
}

export interface IHttpRequestOptions
{
	url: string;
	method: IEnumRestClientMetadataMethod;
	body: any;
	headers: IHttpRequestHeaders;
	params: Record<string, any>;
}

/**
 * HTTP Request options.
 *  - url: required request URL
 *  - method: required request method (e.g. GET)
 *  - body: optional content to be sent as the request body
 *  - headers: optional HTTP headers to be added to the request
 *  - params: optional query parameters to be sent along with the request
 */
export class HttpRequestOptions
{
	constructor(
		readonly url: string,
		readonly method: HttpMethod,
		readonly body: any = null,
		readonly headers: NamedValues<IHttpRequestHeaders> = null,
		readonly params: NamedValues<Record<string, any>> = null,
	)
	{
		const empty = new NamedValues();
		this.headers = new NamedValues((headers || empty as any).values);
		this.params = new NamedValues((params || empty).values);

		if (!this.headers.contains('Content-Type'))
		{
			this.headers.set('Content-Type', this.getContentType());
		}

		if (!this.headers.contains('Accepts'))
		{
			this.headers.set('Accepts', 'application/json, text/plain, */*');
		}
	}

	toValue(): IHttpRequestOptions
	{
		return {
			url: this.url,
			method: this.method,
			body: this.body,
			headers: this.headers.toValue(),
			params: this.params.toValue(),
		}
	}

	/**
	 * Detects the content type from the request body.
	 */
	getContentType(): string
	{
		const specifiedType = this.headers.get('Content-Type');
		if (specifiedType)
		{
			return specifiedType;
		}

		if (!this.body || typeof this.body === 'object')
		{
			return 'application/json';
		}

		return 'text/plain';
	}

	/**
	 * Returns the body serialized into a string.
	 */
	getSerializedBody(): string
	{
		if (!this.body)
		{
			return null;
		}

		if (this.getContentType() === 'application/json')
		{
			return JSON.stringify(this.body);
		}

		return this.body.toString();
	}

	/**
	 * Gets the request URL including eventual query string.
	 */
	getUrl(): string
	{
		if (!this.params.length)
		{
			return this.url;
		}

		const paramsString = Object
			.keys(this.params.values)
			.map(p => `${standardQueryEncoding(p)}=${standardQueryEncoding(this.params.values[p])}`)
			.join('&');

		const queryIndex = this.url.indexOf('?');
		const separator = queryIndex < 0 ? '?' : (queryIndex < this.url.length - 1 ? '&' : '');

		return `${this.url}${separator}${paramsString}`;
	}

	static toValue(options: IAxiosRequestConfig | HttpRequestOptions | IHttpRequestOptions)
	{
		if (options instanceof HttpRequestOptions)
		{
			// @ts-ignore
			options = options.toValue()
		}

		return options
	}
}

export default HttpRequestOptions
