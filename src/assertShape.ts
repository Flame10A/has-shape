import { RealTypeOfShape, Shape, ShapeObject } from "./shapeTypes";
import context from "./context";

/**
 * Asserts that `target` matches the given `shape`.
 * @see `hasShape()`
 */
function assertShape <T extends Shape>(target: unknown, shape: T): asserts target is RealTypeOfShape<T> {
    context.runInLayer(() => {
        switch (typeof shape) {
            case 'string':
                if (shape === 'any' || shape === 'unknown') {
                    break;
                }

                if (typeof target !== shape) {
                    throw `Expected type to be '${shape}'; received ${typeof target}`;
                }

                break;
            case 'function':
                let result;

                try { result = (shape as Function)(target); }
                catch (error) { throw `Error running predicate: ${error}`; }

                if (typeof result === 'boolean') {
                    if (!result) {
                        throw `Value did not pass predicate. Received: ${target}`;
                    }
                }
                else if (typeof result !== 'undefined') {
                    console.warn(`Unexpected return value. Functions should return a boolean (predicates), or undefined (assertions). Received: ${result}`);
                }

                break;
            case 'object':
                if (shape === null) {
                    if (target !== null) {
                        throw `Expected value to be null; received: ${target}`;
                    }
                }
                else if (shape instanceof RegExp) {
                    if (typeof target !== 'string') {
                        throw `Could not test value with regular expression, as it is not a string. Received ${target}`;
                    }
                    else if (!shape.test(target)) {
                        throw `Value failed to match regular expression ${shape}. Received: ${target}`;
                    }
                }
                else {
                    assertObjectShape(target, shape as ShapeObject);
                }

                break;
            default:
                throw `Invalid shape: ${shape}`;
        }
    });
}

const isValidObjectShape = (obj: unknown): obj is Object | Function => {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function');
};

function assertObjectShape<T extends ShapeObject>(target: unknown, shape: T): asserts target is RealTypeOfShape<T> {
    context.runInLayer(() => {
        if (!isValidObjectShape(target)) {
            throw `Invalid object shape: ${target}`;
        }

        for (const key in shape) {
            context.runInLayer(key, () => {
                const specifier = shape[key];
                const value = (target as any)[key] as unknown;

                assertShape(value, specifier);
            });
        }
    });
}

export default assertShape;