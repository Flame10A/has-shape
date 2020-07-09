import {
    Shape,
    ShapeProperty,
    RealTypeOfShape,
    RealTypeOfProperty
} from './shapeTypes';
import assertShape, { assertSpecifier } from './assertShape';

/**
 * Checks whether the given value matches a specifier.
 *
 * Only intended to be used internally.
 */
export const matchesSpecifier = <T extends ShapeProperty>(value: unknown, specifier: T): value is RealTypeOfProperty<T> => {
    try { assertSpecifier(value, specifier); }
    catch { return false; }
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
    try { assertShape(target, shape); }
    catch { return false; }
    return true;
};

export default hasShape;