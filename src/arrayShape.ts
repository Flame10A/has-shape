import { ShapeProperty, RealTypeOfProperty } from "./shapeTypes";
import { matchesSpecifier } from "./hasShape";
import assertionContext from "./assertionContext";
import { assertionError } from "./utils";
import { assertSpecifier } from "./assertShape";

interface ArrayShapeOptions {
    /**
     * If set to true, empty arrays are treated as non-matching.
     */
    disallowEmpty?: boolean
}

const fail = (message: string) => {
    if (assertionContext.isAsserting()) {
        throw assertionError(message);
    }

    return false;
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
            return fail(`Value is not an array. Received: ${target}`);
        }
        else if (disallowEmpty && target.length < 1) {
            return fail('Array cannot be empty.');
        }

        if (assertionContext.isAsserting()) {
            target.forEach((v, i) => {
                assertionContext.push(i);

                assertSpecifier(v, type);

                assertionContext.pop();
            });

            return true;
        }

        return target.every(v => matchesSpecifier(v, type));
    };
};