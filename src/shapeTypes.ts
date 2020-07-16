export type Shape =
    'undefined'
    | 'boolean'
    | 'number'
    | 'bigint'
    | 'string'
    | 'symbol'
    | 'function'
    | 'object'
    | 'unknown'
    | 'any'
    | RegExp
    | ((value: any) => boolean) // Predicate functions
    | ((value: any) => void) // Assertion functions
    | ShapeObject
    | ArrayShape<any>;

export type ShapeObject = { [key: string]: Shape };

export type ArrayShape<T extends Shape> = (value: any) => asserts value is RealTypeOfShape<T>[];

export type RealTypeOfShape<T extends Shape> =
    T extends 'undefined' ? undefined
    : T extends 'boolean' ? boolean
    : T extends 'number' ? number
    : T extends 'bigint' ? bigint
    : T extends 'string' ? string
    : T extends 'symbol' ? symbol
    : T extends 'function' ? Function
    : T extends 'object' ? Object
    : T extends 'unknown' ? unknown
    : T extends 'any' ? any
    : T extends RegExp ? string
    : T extends ((value: any) => value is infer R) ? R // type-check functions
    : T extends ((value: any) => asserts value is infer R) ? R // assertion functions
    : T extends ((value: infer R) => boolean) ? R // Typed predicates
    : T extends ShapeObject ? { [P in keyof T]: RealTypeOfShape<T[P]> }
    : T extends ArrayShape<infer R> ? R[]
    : unknown;

export type CompiledShape<T extends Shape> = (value: unknown) => asserts value is RealTypeOfShape<T>;