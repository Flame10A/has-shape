var assertShape = require('../dist/assertShape').default;

describe('hasShape() function', () => {

    it('Matches a basic property', () => {
        var objectA = { num: 3 };
        var objectB = { num: 'hello!' };
        var objectC = {};

        var shape = { num: 'number' };

        expect(() => assertShape(objectA, shape)).not.toThrow();
        expect(() => assertShape(objectB, shape)).toThrow();
        expect(() => assertShape(objectC, shape)).toThrow();
    });

    it('Matches multiple basic properties', () => {
        var objectA = { num: 3, str: 'hello!' };
        var objectB = { num: 3, str: 5 };
        var objectC = { num: 3 };

        var shape = { num: 'number', str: 'string' };

        expect(() => assertShape(objectA, shape)).not.toThrow();
        expect(() => assertShape(objectB, shape)).toThrow();
        expect(() => assertShape(objectC, shape)).toThrow();
    });

    it('Matches any-specified properties', () => {
        var objectA = { num: 3, something: 'hello!' };
        var objectB = { num: 3, something: 5 };
        var objectC = { num: 3 };

        var shape = { num: 'number', something: 'any' };

        expect(() => assertShape(objectA, shape)).not.toThrow();
        expect(() => assertShape(objectB, shape)).not.toThrow();
        expect(() => assertShape(objectC, shape)).not.toThrow();
    });

    it('Matches unknown-specified properties', () => {
        /** @type any */
        var objectA = { num: 3, something: 'hello!' };
        var objectB = { num: 3, something: 5 };
        var objectC = { num: 3 };

        var shape = { num: 'number', something: 'unknown' };

        expect(() => assertShape(objectA, shape)).not.toThrow();
        expect(() => assertShape(objectB, shape)).not.toThrow();
        expect(() => assertShape(objectC, shape)).not.toThrow();
    });

    it('Allows extraneous properties', () => {
        var object = { num: 3, func: () => null };
        var shape = { num: 'number' };

        expect(() => assertShape(object, shape)).not.toThrow();
    });

    it('Matches a predicate-specified property', () => {
        var objectA = { num: 3 };
        var objectB = { num: 11 };

        var shape = { num: n => n < 10 };

        expect(() => assertShape(objectA, shape)).not.toThrow();
        expect(() => assertShape(objectB, shape)).toThrow();
    });

    it('Matches a regular expression property', () => {
        var objectA = { email: 'someone@example.com' };
        var objectB = { email: 'example.com' };

        // This is a terrible email regex, don't actually use this kinda thing
        var shape = { email: /[a-z]+@[a-z]+\.[a-z]+/ };

        expect(() => assertShape(objectA, shape)).not.toThrow();
        expect(() => assertShape(objectB, shape)).toThrow();
    });

    it('Matches nested shapes', () => {
        var objectA = { num: 3, obj: { str: 'hello!' } };
        var objectB = { num: 3, obj: { str: null } };
        var objectC = { num: 3, obj: null };

        var shape = { num: 'number', obj: { str: 'string' }};

        expect(() => assertShape(objectA, shape)).not.toThrow();
        expect(() => assertShape(objectB, shape)).toThrow();
        expect(() => assertShape(objectC, shape)).toThrow();
    });

    it('Can run for tuples too', () => {
        var arrA = [3, 'hello!'];
        var arrB = [3, 5];
        var arrC = [3];

        var shape = ['number', 'string'];

        expect(() => assertShape(arrA, shape)).not.toThrow();
        expect(() => assertShape(arrB, shape)).toThrow();
        expect(() => assertShape(arrC, shape)).toThrow();
    });

    it('Can run for functions with properties too', () => {
        var funcA = () => null;
        funcA.onError = () => null;
        var funcB = () => null;
        funcB.onError = 3;
        var funcC = () => null;

        var shape = { onError: 'function' };

        expect(() => assertShape(funcA, shape)).not.toThrow();
        expect(() => assertShape(funcB, shape)).toThrow();
        expect(() => assertShape(funcC, shape)).toThrow();
    });

});