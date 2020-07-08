import { Shape, RealTypeOfShape } from "./shapeTypes";
import hasShape from "./hasShape";

/**
 * Creates a predicate function which performs a `hasShape()` check,
 *     using the given shape.
 */
export default <T extends Shape>(shape: T) => {
    return (target: unknown): target is RealTypeOfShape<T> => {
        return hasShape<T>(target, shape);
    };
};