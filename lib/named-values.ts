/**
 * Typed interface for an object holding string values associated to string keys.
 */
export interface StringMap<T extends any = string> {
  [key: string]: T;
}

export type UnpackStringMap<T> = T extends Record<string, infer U> ? U : any;

/**
 * A simple collection of named string values.
 */
export class NamedValues<T extends StringMap<any> = StringMap> {
  values: T;

  get length(): number {
    return Object.keys(this.values).length;
  }

  /**
   * Initializes a new named values collection.
   * @param initializer key-value pairs to initialize the collection with
   */
  constructor(initializer?: T) {
    if (initializer instanceof NamedValues)
    {
      this.values = {
        ...initializer.values
      }
    }
    else
    {
      // @ts-ignore
      this.values = { ...(initializer || {}) };
    }
  }

  /**
   * Indicates whether the collection contains a value for a given key.
   * @param key The tested key
   */
  contains(key: string): boolean {
    return !!this.values[key];
  }

  /**
   * Gets the value associated with a given key.
   * @param key The name of the value that is being looked up.
   */
  get<U extends keyof T>(key: U): T[U];
  get(key: string): UnpackStringMap<T>;
  get(key: string): UnpackStringMap<T> {
    return this.values[key];
  }

  /**
   * Removed the value associated with a given key from the collection.
   * @param key The name of the value to be deleted.
   */
  remove(key: string): void {
    delete this.values[key];
  }

  /**
   * Adds or changes the value associated with key.
   * @param key String key that names the value
   * @param value The value
   */
  set<U extends keyof T>(key: U, value: T[U] | UnpackStringMap<T>): void
  set(key: string, value: UnpackStringMap<T>): void
  set(key: string, value: UnpackStringMap<T>) {
    // @ts-ignore
    this.values[key] = value;
  }

  toValue()
  {
    return this.values
  }

  [Symbol.toPrimitive]()
  {
    return this.values
  }
}

export default NamedValues;
