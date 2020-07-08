export const isValidInput = (obj: unknown): obj is Object | Function => {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function');
};

export const isClass = (value: unknown): boolean => {
    return typeof value === 'function' && !!value.prototype && typeof value.prototype === 'object';
};

export const safeStringify = (input: unknown): string => {
    try {
        return JSON.stringify(input, undefined, 1);
    }
    catch (err) {
        return String(input);
    }
};