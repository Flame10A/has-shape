import { ShapeProperty, RealTypeOfProperty } from "./shapeTypes";
import { matchesSpecifier } from "./hasShape";

interface ArrayShapeOptions {
    /**
     * If set to true, empty arrays are treated as non-matching.
     */
    disallowEmpty?: boolean
}

/**
 * Creates a predicate function which checks whether a value is an array
 *     of the specified type.
 *
 * By default, empty arrays are valid. This can be overridden
 *     using `options.disallowEmpty`.
 */
export default <T extends ShapeProperty>(type: T, options?: ArrayShapeOptions) => {
    const {
        disallowEmpty = false
    } = options ?? {};

    return (target: unknown): target is RealTypeOfProperty<T>[] => {
        if (!Array.isArray(target)) {
            return false
        }
        else if (disallowEmpty && target.length < 1) {
            return false;
        }

        return Array.isArray(target) && target.every(v => matchesSpecifier(v, type));
    };
};