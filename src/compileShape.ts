import { Shape, RealTypeOfShape } from "./shapeTypes";
import hasShape from "./hasShape";
import assertShape from "./assertShape";

/**
 * Creates a predicate function which performs a `hasShape()` check,
 *     using the given shape.
 */
export default <T extends Shape>(shape: T) => {
    return (target: unknown): target is RealTypeOfShape<T> => {
        return hasShape<T>(target, shape);
    };
};

export function compileShapeAssertion<T extends Shape>(shape: T) {
    return function (target: unknown): asserts target is RealTypeOfShape<T> {
        assertShape(target, shape);
    };
};