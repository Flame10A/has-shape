import { Shape, RealTypeOfShape } from './shapeTypes';
import assertShape from './assertShape';

/**
 * Given a `target` value and a `shape`, the target is checked to ensure
 *     it has the specified 'shape'.
 *
 * A shape may be any of the following:
 * - An object acting as a dictionary of other shapes,
 *     e.g. `{ name: 'string', age: 'number }`
 * - A `typeof` string (`'boolean'`, `'number'`, `'string'`, etc.)
 * - One of the strings `'any'` or `'unknown'` to specify any type,
 *     with matching TS types.
 * - A regular expression ('Regex').
 * - A predicate function.
 * - An assertion function.
 * - A shape created through the `shape()` or `arrayShape()` functions.
 */
const hasShape = <T extends Shape>(target: unknown, shape: T): target is RealTypeOfShape<T> => {
    try { assertShape(target, shape); }
    catch { return false; }
    return true;
};

export default hasShape;