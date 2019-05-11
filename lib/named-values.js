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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZWQtdmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZWQtdmFsdWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0E7O0dBRUc7QUFDSCxNQUFhLFdBQVc7SUFPdEI7OztPQUdHO0lBQ0gsWUFBWSxXQUFlO1FBQ3pCLElBQUksV0FBVyxZQUFZLFdBQVcsRUFDdEM7WUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNaLEdBQUcsV0FBVyxDQUFDLE1BQU07YUFDdEIsQ0FBQTtTQUNGO2FBRUQ7WUFDRSxhQUFhO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUMxQztJQUNILENBQUM7SUFwQkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQW9CRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsR0FBVztRQUNsQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQzVCLGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTztRQUVMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0lBRUQsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRWxCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0NBQ0Y7QUFwRUQsa0NBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUeXBlZCBpbnRlcmZhY2UgZm9yIGFuIG9iamVjdCBob2xkaW5nIHN0cmluZyB2YWx1ZXMgYXNzb2NpYXRlZCB0byBzdHJpbmcga2V5cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdHJpbmdNYXAge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBzaW1wbGUgY29sbGVjdGlvbiBvZiBuYW1lZCBzdHJpbmcgdmFsdWVzLlxuICovXG5leHBvcnQgY2xhc3MgTmFtZWRWYWx1ZXM8VCBleHRlbmRzIFN0cmluZ01hcCA9IFN0cmluZ01hcD4ge1xuICB2YWx1ZXM6IFQ7XG5cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlcykubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGEgbmV3IG5hbWVkIHZhbHVlcyBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0gaW5pdGlhbGl6ZXIga2V5LXZhbHVlIHBhaXJzIHRvIGluaXRpYWxpemUgdGhlIGNvbGxlY3Rpb24gd2l0aFxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdGlhbGl6ZXI/OiBUKSB7XG4gICAgaWYgKGluaXRpYWxpemVyIGluc3RhbmNlb2YgTmFtZWRWYWx1ZXMpXG4gICAge1xuICAgICAgdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgIC4uLmluaXRpYWxpemVyLnZhbHVlc1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy52YWx1ZXMgPSB7IC4uLihpbml0aWFsaXplciB8fCB7fSkgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvbGxlY3Rpb24gY29udGFpbnMgYSB2YWx1ZSBmb3IgYSBnaXZlbiBrZXkuXG4gICAqIEBwYXJhbSBrZXkgVGhlIHRlc3RlZCBrZXlcbiAgICovXG4gIGNvbnRhaW5zKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy52YWx1ZXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBrZXkuXG4gICAqIEBwYXJhbSBrZXkgVGhlIG5hbWUgb2YgdGhlIHZhbHVlIHRoYXQgaXMgYmVpbmcgbG9va2VkIHVwLlxuICAgKi9cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVkIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBrZXkgZnJvbSB0aGUgY29sbGVjdGlvbi5cbiAgICogQHBhcmFtIGtleSBUaGUgbmFtZSBvZiB0aGUgdmFsdWUgdG8gYmUgZGVsZXRlZC5cbiAgICovXG4gIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLnZhbHVlc1trZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgb3IgY2hhbmdlcyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGtleS5cbiAgICogQHBhcmFtIGtleSBTdHJpbmcga2V5IHRoYXQgbmFtZXMgdGhlIHZhbHVlXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWVcbiAgICovXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLnZhbHVlc1trZXldID0gdmFsdWU7XG4gIH1cblxuICB0b1ZhbHVlKClcbiAge1xuICAgIHJldHVybiB0aGlzLnZhbHVlc1xuICB9XG5cbiAgW1N5bWJvbC50b1ByaW1pdGl2ZV0oKVxuICB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzXG4gIH1cbn1cbiJdfQ==