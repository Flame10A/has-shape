import { RealTypeOfProperty, ShapeProperty, RealTypeOfShape, Shape } from "./shapeTypes";
import { isValidInput, assertionError } from "./utils";
import assertionContext from "./assertionContext";

export function assertSpecifier<T extends ShapeProperty>(value: unknown, specifier: T): asserts value is RealTypeOfProperty<T> {
    switch (typeof specifier) {
        case 'string':
            if (specifier === 'any' || specifier === 'unknown') {
                break;
            }

            if (typeof value !== specifier) {
                throw assertionError(`Expected type to be '${specifier}'; received ${typeof value}`);
            }

            break;
        case 'function':
            let result;

            try { result = (specifier as Function)(value); }
            catch (error) { throw assertionError(`Error running predicate: ${error}`) }

            if (typeof result === 'boolean') {
                if (!result) {
                    throw assertionError(`Value did not pass predicate. Received: ${value}`);
                }
            }
            else if (typeof result !== 'undefined') {
                console.warn(`Received an unexpected predicate return value at ${assertionContext.getString()}. Predicates should return a boolean, or undefined. Received: ${result}`);
            }

            break;
        case 'object':
            if (specifier instanceof RegExp) {
                if (typeof value !== 'string') {
                    throw assertionError(`Could not test value with regular expression, as it is not a string. Received ${value}`);
                }
                else if (!specifier.test(value)) {
                    throw assertionError(`Value failed to match regular expression ${specifier}. Received: ${value}`);
                }
            }
            else {
                assertShape(value, specifier as Shape);
            }

            break;
        default:
            throw assertionError(`Invalid specifier: ${specifier}`);
    }
}

function assertShape<T extends Shape>(target: unknown, shape: T): asserts target is RealTypeOfShape<T> {
    if (!isValidInput(target)) {
        throw assertionError(`Invalid target: ${target}`);
    }

    try {
        for (const key in shape) {
            const specifier = shape[key];
            const value = (target as any)[key] as unknown;

            assertionContext.push(key);

            assertSpecifier(value, specifier);

            assertionContext.pop();
        }
    }
    catch (error) { throw error; }
    finally { assertionContext.clear(); }

}

export default assertShape;