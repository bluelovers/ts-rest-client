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
exports.default = NamedValues;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZWQtdmFsdWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZWQtdmFsdWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0E7O0dBRUc7QUFDSCxNQUFhLFdBQVc7SUFPdEI7OztPQUdHO0lBQ0gsWUFBWSxXQUFlO1FBQ3pCLElBQUksV0FBVyxZQUFZLFdBQVcsRUFDdEM7WUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNaLEdBQUcsV0FBVyxDQUFDLE1BQU07YUFDdEIsQ0FBQTtTQUNGO2FBRUQ7WUFDRSxhQUFhO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUMxQztJQUNILENBQUM7SUFwQkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQW9CRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsR0FBVztRQUNsQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFRRCxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFTRCxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQXlCO1FBQ3hDLGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTztRQUVMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0lBRUQsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRWxCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0NBQ0Y7QUF4RUQsa0NBd0VDO0FBRUQsa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUeXBlZCBpbnRlcmZhY2UgZm9yIGFuIG9iamVjdCBob2xkaW5nIHN0cmluZyB2YWx1ZXMgYXNzb2NpYXRlZCB0byBzdHJpbmcga2V5cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdHJpbmdNYXA8VCBleHRlbmRzIGFueSA9IHN0cmluZz4ge1xuICBba2V5OiBzdHJpbmddOiBUO1xufVxuXG5leHBvcnQgdHlwZSBVbnBhY2tTdHJpbmdNYXA8VD4gPSBUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgaW5mZXIgVT4gPyBVIDogYW55O1xuXG4vKipcbiAqIEEgc2ltcGxlIGNvbGxlY3Rpb24gb2YgbmFtZWQgc3RyaW5nIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5hbWVkVmFsdWVzPFQgZXh0ZW5kcyBTdHJpbmdNYXA8YW55PiA9IFN0cmluZ01hcD4ge1xuICB2YWx1ZXM6IFQ7XG5cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlcykubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGEgbmV3IG5hbWVkIHZhbHVlcyBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0gaW5pdGlhbGl6ZXIga2V5LXZhbHVlIHBhaXJzIHRvIGluaXRpYWxpemUgdGhlIGNvbGxlY3Rpb24gd2l0aFxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdGlhbGl6ZXI/OiBUKSB7XG4gICAgaWYgKGluaXRpYWxpemVyIGluc3RhbmNlb2YgTmFtZWRWYWx1ZXMpXG4gICAge1xuICAgICAgdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgIC4uLmluaXRpYWxpemVyLnZhbHVlc1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy52YWx1ZXMgPSB7IC4uLihpbml0aWFsaXplciB8fCB7fSkgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvbGxlY3Rpb24gY29udGFpbnMgYSB2YWx1ZSBmb3IgYSBnaXZlbiBrZXkuXG4gICAqIEBwYXJhbSBrZXkgVGhlIHRlc3RlZCBrZXlcbiAgICovXG4gIGNvbnRhaW5zKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy52YWx1ZXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBrZXkuXG4gICAqIEBwYXJhbSBrZXkgVGhlIG5hbWUgb2YgdGhlIHZhbHVlIHRoYXQgaXMgYmVpbmcgbG9va2VkIHVwLlxuICAgKi9cbiAgZ2V0PFUgZXh0ZW5kcyBrZXlvZiBUPihrZXk6IFUpOiBUW1VdO1xuICBnZXQoa2V5OiBzdHJpbmcpOiBVbnBhY2tTdHJpbmdNYXA8VD47XG4gIGdldChrZXk6IHN0cmluZyk6IFVucGFja1N0cmluZ01hcDxUPiB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzW2tleV07XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlZCB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4ga2V5IGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSBrZXkgVGhlIG5hbWUgb2YgdGhlIHZhbHVlIHRvIGJlIGRlbGV0ZWQuXG4gICAqL1xuICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy52YWx1ZXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG9yIGNoYW5nZXMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBrZXkuXG4gICAqIEBwYXJhbSBrZXkgU3RyaW5nIGtleSB0aGF0IG5hbWVzIHRoZSB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlXG4gICAqL1xuICBzZXQ8VSBleHRlbmRzIGtleW9mIFQ+KGtleTogVSwgdmFsdWU6IFRbVV0gfCBVbnBhY2tTdHJpbmdNYXA8VD4pOiB2b2lkXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IFVucGFja1N0cmluZ01hcDxUPik6IHZvaWRcbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogVW5wYWNrU3RyaW5nTWFwPFQ+KSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMudmFsdWVzW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHRvVmFsdWUoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzXG4gIH1cblxuICBbU3ltYm9sLnRvUHJpbWl0aXZlXSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYW1lZFZhbHVlcztcbiJdfQ==