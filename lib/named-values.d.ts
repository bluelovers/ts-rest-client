/**
 * Typed interface for an object holding string values associated to string keys.
 */
export interface StringMap<T extends any = string> {
    [key: string]: T;
}
/**
 * A simple collection of named string values.
 */
export declare class NamedValues<T extends StringMap = StringMap> {
    values: T;
    readonly length: number;
    /**
     * Initializes a new named values collection.
     * @param initializer key-value pairs to initialize the collection with
     */
    constructor(initializer?: T);
    /**
     * Indicates whether the collection contains a value for a given key.
     * @param key The tested key
     */
    contains(key: string): boolean;
    /**
     * Gets the value associated with a given key.
     * @param key The name of the value that is being looked up.
     */
    get(key: string): string;
    /**
     * Removed the value associated with a given key from the collection.
     * @param key The name of the value to be deleted.
     */
    remove(key: string): void;
    /**
     * Adds or changes the value associated with key.
     * @param key String key that names the value
     * @param value The value
     */
    set(key: string, value: string): void;
    toValue(): T;
    [Symbol.toPrimitive](): T;
}
