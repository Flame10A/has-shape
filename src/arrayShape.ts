import { Shape, RealTypeOfShape, CompiledShape, ArrayShape } from "./shapeTypes";
import assertShape from "./assertShape";
import context from "./context";

interface ArrayShapeOptions {
    /**
     * If set to true, empty arrays are treated as non-matching.
     */
    disallowEmpty?: boolean
}

/**
 * Creates an assertion function which checks whether a value is an array
 *     of the specified type.
 *
 * By default, empty arrays are valid. This can be overridden
 *     using `options.disallowEmpty`.
 */
export default <T extends Shape>(shape: T, options?: ArrayShapeOptions): CompiledShape<ArrayShape<T>> => {
    const {
        disallowEmpty = false
    } = options ?? {};

    return (target: unknown) => {
        context.runInLayer(() => {
            if (!Array.isArray(target)) {
                throw `Value is not an array. Received: ${target}`;
            }
            else if (disallowEmpty && target.length < 1) {
                throw 'Array cannot be empty.';
            }

            target.forEach((v, i) => {
                context.runInLayer(i, () => {
                    assertShape(v, shape);
                });
            });
        });
    };
};