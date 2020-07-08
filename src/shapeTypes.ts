export type ShapeProperty =
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
    | (new (...args: any) => any) // Class types
    | ((value: any) => boolean) // Predicate functions
    | Shape;

export type RealTypeOfProperty<T extends ShapeProperty> =
    T extends 'undefined' ? undefined
    : T extends 'boolean' ? boolean
    : T extends 'number' ? number
    : T extends 'bigint' ? bigint
    : T extends 'string' ? string
    : T extends 'symbol' ? symbol
    : T extends 'function' ? Function
    : T extends 'object' ? Object
    : T extends 'unknown' ? unknown
    : T extends RegExp ? string
    : T extends ((value: any) => value is infer R) ? R // type-check functions
    : T extends ((value: infer R) => boolean) ? R // Typed predicates
    : T extends new (...args: any) => infer R ? R // Class/constructor functions
    : T extends Shape ? RealTypeOfShape<T>
    : unknown;

export type Shape = { [key: string]: ShapeProperty };

export type RealTypeOfShape<T extends Shape> = { [P in keyof T]: RealTypeOfProperty<T[P]> };