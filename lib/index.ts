import 'reflect-metadata';
export * from './rest-client';
export * from './http-service';
export * from './http-error-response';
export * from './http-request-options';
export * from './named-values';
export * from './mock-http-service';
export { IAxiosObservable as Observable } from './axios';
export {
	SymbolRequestInterceptor,
	SymbolHttpClient,
	SymbolDefaultHeaders,
	SymbolBaseUrl,
	EnumRestClientMetadata,
	IBluebird,
	createObserver,
	subscribeObservable,
	resolveObservable,
	IUnpackObservableData,
	IUnpackAxiosObservableData,
	Observer,
	PartialObserver,
} from './util';
export {
	IAxiosRequestConfig,
	IAxiosObservable,
	IRestClientAxiosOptions,
	IRequestConfig,
	IAxios,
} from './axios';

export default exports as typeof import('./index');

