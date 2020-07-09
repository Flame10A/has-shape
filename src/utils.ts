import assertionContext from "./assertionContext";

export const isValidInput = (obj: unknown): obj is Object | Function => {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function');
};

export const assertionError = (message: string) => new Error(`Assertion error at ${assertionContext.getString()}: ${message}`);