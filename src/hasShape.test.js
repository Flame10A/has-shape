var hasShape = require('../dist/hasShape').default;
var arrayShape = require('../dist/hasShape').arrayShape;

describe('hasShape() function', () => {

    it('Matches a basic property', () => {
        var objectA = { num: 3 };
        var objectB = { num: 'hello!' };
        var objectC = {};

        var shape = { num: 'number' };

        expect(hasShape(objectA, shape)).toBe(true);
        expect(hasShape(objectB, shape)).toBe(false);
        expect(hasShape(objectC, shape)).toBe(false);
    });

    it('Matches multiple basic properties', () => {
        var objectA = { num: 3, str: 'hello!' };
        var objectB = { num: 3, str: 5 };
        var objectC = { num: 3 };

        var shape = { num: 'number', str: 'string' };

        expect(hasShape(objectA, shape)).toBe(true);
        expect(hasShape(objectB, shape)).toBe(false);
        expect(hasShape(objectC, shape)).toBe(false);
    });

    it('Matches any-specified properties', () => {
        var objectA = { num: 3, something: 'hello!' };
        var objectB = { num: 3, something: 5 };
        var objectC = { num: 3 };

        var shape = { num: 'number', something: 'any' };

        expect(hasShape(objectA, shape)).toBe(true);
        expect(hasShape(objectB, shape)).toBe(true);
        expect(hasShape(objectC, shape)).toBe(false);
    });

    it('Matches unknown-specified properties', () => {
        /** @type any */
        var objectA = { num: 3, something: 'hello!' };
        var objectB = { num: 3, something: 5 };
        var objectC = { num: 3 };

        var shape = { num: 'number', something: 'unknown' };

        expect(hasShape(objectA, shape)).toBe(true);
        expect(hasShape(objectB, shape)).toBe(true);
        expect(hasShape(objectC, shape)).toBe(false);
    });

    it('Allows extraneous properties', () => {
        var object = { num: 3, func: () => null };

        var res = hasShape(object, { num: 'number' });
        expect(res).toBe(true);
    });

    it('Matches a predicate-specified property', () => {
        var objectA = { num: 3 };
        var objectB = { num: 11 };

        var shape = { num: n => n < 10 };

        expect(hasShape(objectA, shape)).toBe(true);
        expect(hasShape(objectB, shape)).toBe(false);
    });

    it('Matches a regular expression property', () => {
        var objectA = { email: 'someone@example.com' };
        var objectB = { email: 'example.com' };

        // This is a terrible email regex, don't actually use this kinda thing
        var shape = { email: /[a-z]+@[a-z]+\.[a-z]+/ };

        expect(hasShape(objectA, shape)).toBe(true);
        expect(hasShape(objectB, shape)).toBe(false);
    });

    it('Matches nested shapes', () => {
        var objectA = { num: 3, obj: { str: 'hello!' } };
        var objectB = { num: 3, obj: { str: null } };
        var objectC = { num: 3, obj: null };

        var shape = { num: 'number', obj: { str: 'string' }};

        expect(hasShape(objectA, shape)).toBe(true);
        expect(hasShape(objectB, shape)).toBe(false);
        expect(hasShape(objectC, shape)).toBe(false);
    });

    it('Can run for tuples too', () => {
        var arrA = [3, 'hello!'];
        var arrB = [3, 5];
        var arrC = [3];

        var shape = ['number', 'string'];

        expect(hasShape(arrA, shape)).toBe(true);
        expect(hasShape(arrB, shape)).toBe(false);
        expect(hasShape(arrC, shape)).toBe(false);
    });

    it('Can run for functions with properties too', () => {
        var funcA = () => null;
        funcA.onError = () => null;
        var funcB = () => null;
        funcB.onError = 3;
        var funcC = () => null;

        var shape = { onError: 'function' };

        expect(hasShape(funcA, shape)).toBe(true);
        expect(hasShape(funcB, shape)).toBe(false);
        expect(hasShape(funcC, shape)).toBe(false);
    });

});