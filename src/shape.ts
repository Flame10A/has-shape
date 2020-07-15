import { Shape, CompiledShape } from "./shapeTypes";
import assertShape from "./assertShape";

/**
 * Compiles a shape which can be used with other functions in the package, or
 *     as a standalone assertion function.
 */
export default <T extends Shape>(shape: T): CompiledShape<T> => {
    return (target: unknown) => assertShape(target, shape);
};