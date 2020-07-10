var compileShape = require('../dist/compileShape').default;
var compileShapeAssertion = require('../dist/compileShape').compileShapeAssertion;

describe('compileShape() function', () => {
    it ('Creates a function which does a hasShape() check', () => {
        var objA = { username: 'someone', password: 'RealBadPassword' };
        var objB = { someone: 'username', password: '********' };

        var isValid = compileShape({ username: 'string', password: 'string' });

        expect(isValid(objA)).toBe(true);
        expect(isValid(objB)).toBe(false);
    });
});

describe('compileShapeAssertion() function', () => {
    it ('Creates a function which performs assertShape()', () => {
        var objA = { username: 'someone', password: 'RealBadPassword' };
        var objB = { someone: 'username', password: '********' };

        var assertValidity = compileShapeAssertion({ username: 'string', password: 'string' });

        expect(() => assertValidity(objA)).not.toThrow();
        expect(() => assertValidity(objB)).toThrow();
    });
});