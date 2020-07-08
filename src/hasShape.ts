import {
    Shape,
    ShapeProperty,
    RealTypeOfShape,
    RealTypeOfProperty
} from './shapeTypes';
import { isValidInput, isClass } from './utils';

/**
 * Checks whether the given value matches a specifier.
 *
 * Only intended to be used internally.
 */
export const matchesSpecifier = <T extends ShapeProperty>(value: unknown, specifier: T): value is RealTypeOfProperty<T> => {
    switch (typeof specifier) {
        case 'string':
            if (specifier === 'any' || specifier === 'unknown') {
                break;
            }
            else if (typeof value !== specifier) {
                return false;
            }
            break;
        case 'function':
            if (isClass(specifier)) {
                if (!(value instanceof (specifier as Function))) {
                    return false;
                }
            }
            else if (!(specifier as Function)(value)) {
                return false;
            }
            break;
        case 'object':
            if (specifier instanceof RegExp) {
                if (typeof value !== 'string' || !specifier.test(value)) {
                    return false;
                }
                break;
            }
        default:
            if (!hasShape(value, specifier as Shape)) {
                return false;
            }
            break;
    }

    return true;
};

/**
 * Given a `target` value and a `shape` object, the target is checked to ensure
 *     it has the specified 'shape'. The shape should be a dictionary of
 *     property keys to type specifiers.
 *
 * Type specifiers may be any of the following:
 * - A `typeof` string (`'boolean'`, `'number'`, `'string'`, etc.)
 * - One of the strings `'any'` or `'unknown'` to specify any type,
 *     with matching TS types.
 * - A class or constructor function
 * - A regular expression ('Regex')
 * - A predicate function
 * - Another shape
 */
const hasShape = <T extends Shape>(target: unknown, shape: T): target is RealTypeOfShape<T> => {
    if (!isValidInput(target)) {
        return false;
    }

    for (const key in shape) {
        if (!(key in target)) {
            return false;
        }

        const specifier = shape[key];
        const value: unknown = (target as any)[key];

        if (!matchesSpecifier(value, specifier)) {
            return false;
        }
    }

    return true;
};

export default hasShape;