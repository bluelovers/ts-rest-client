"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A simple collection of named string values.
 */
class NamedValues {
    /**
     * Initializes a new named values collection.
     * @param initializer key-value pairs to initialize the collection with
     */
    constructor(initializer) {
        if (initializer instanceof NamedValues) {
            this.values = {
                ...initializer.values
            };
        }
        else {
            // @ts-ignore
            this.values = { ...(initializer || {}) };
        }
    }
    get length() {
        return Object.keys(this.values).length;
    }
    /**
     * Indicates whether the collection contains a value for a given key.
     * @param key The tested key
     */
    contains(key) {
        return !!this.values[key];
    }
    /**
     * Gets the value associated with a given key.
     * @param key The name of the value that is being looked up.
     */
    get(key) {
        return this.values[key];
    }
    /**
     * Removed the value associated with a given key from the collection.
     * @param key The name of the value to be deleted.
     */
    remove(key) {
        delete this.values[key];
    }
    /**
     * Adds or changes the value associated with key.
     * @param key String key that names the value
     * @param value The value
     */
    set(key, value) {
        // @ts-ignore
        this.values[key] = value;
    }
    toValue() {
        return this.values;
    }
    [Symbol.toPrimitive]() {
        return this.values;
    }
}
exports.NamedValues = NamedValues;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZWQtdmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZWQtdmFsdWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0E7O0dBRUc7QUFDSCxNQUFhLFdBQVc7SUFPdEI7OztPQUdHO0lBQ0gsWUFBWSxXQUFlO1FBQ3pCLElBQUksV0FBVyxZQUFZLFdBQVcsRUFDdEM7WUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNaLEdBQUcsV0FBVyxDQUFDLE1BQU07YUFDdEIsQ0FBQTtTQUNGO2FBRUQ7WUFDRSxhQUFhO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUMxQztJQUNILENBQUM7SUFwQkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQW9CRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsR0FBVztRQUNsQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQzVCLGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTztRQUVMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0lBRUQsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRWxCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0NBQ0Y7QUFwRUQsa0NBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUeXBlZCBpbnRlcmZhY2UgZm9yIGFuIG9iamVjdCBob2xkaW5nIHN0cmluZyB2YWx1ZXMgYXNzb2NpYXRlZCB0byBzdHJpbmcga2V5cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdHJpbmdNYXA8VCBleHRlbmRzIGFueSA9IHN0cmluZz4ge1xuICBba2V5OiBzdHJpbmddOiBUO1xufVxuXG4vKipcbiAqIEEgc2ltcGxlIGNvbGxlY3Rpb24gb2YgbmFtZWQgc3RyaW5nIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5hbWVkVmFsdWVzPFQgZXh0ZW5kcyBTdHJpbmdNYXAgPSBTdHJpbmdNYXA+IHtcbiAgdmFsdWVzOiBUO1xuXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy52YWx1ZXMpLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBhIG5ldyBuYW1lZCB2YWx1ZXMgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIGluaXRpYWxpemVyIGtleS12YWx1ZSBwYWlycyB0byBpbml0aWFsaXplIHRoZSBjb2xsZWN0aW9uIHdpdGhcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluaXRpYWxpemVyPzogVCkge1xuICAgIGlmIChpbml0aWFsaXplciBpbnN0YW5jZW9mIE5hbWVkVmFsdWVzKVxuICAgIHtcbiAgICAgIHRoaXMudmFsdWVzID0ge1xuICAgICAgICAuLi5pbml0aWFsaXplci52YWx1ZXNcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMudmFsdWVzID0geyAuLi4oaW5pdGlhbGl6ZXIgfHwge30pIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2xsZWN0aW9uIGNvbnRhaW5zIGEgdmFsdWUgZm9yIGEgZ2l2ZW4ga2V5LlxuICAgKiBAcGFyYW0ga2V5IFRoZSB0ZXN0ZWQga2V5XG4gICAqL1xuICBjb250YWlucyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMudmFsdWVzW2tleV07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4ga2V5LlxuICAgKiBAcGFyYW0ga2V5IFRoZSBuYW1lIG9mIHRoZSB2YWx1ZSB0aGF0IGlzIGJlaW5nIGxvb2tlZCB1cC5cbiAgICovXG4gIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzW2tleV07XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlZCB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4ga2V5IGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSBrZXkgVGhlIG5hbWUgb2YgdGhlIHZhbHVlIHRvIGJlIGRlbGV0ZWQuXG4gICAqL1xuICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy52YWx1ZXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG9yIGNoYW5nZXMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBrZXkuXG4gICAqIEBwYXJhbSBrZXkgU3RyaW5nIGtleSB0aGF0IG5hbWVzIHRoZSB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlXG4gICAqL1xuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy52YWx1ZXNba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgdG9WYWx1ZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNcbiAgfVxuXG4gIFtTeW1ib2wudG9QcmltaXRpdmVdKClcbiAge1xuICAgIHJldHVybiB0aGlzLnZhbHVlc1xuICB9XG59XG4iXX0=