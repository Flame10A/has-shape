var compileShape = require('../dist/compileShape').default;

describe('compileShape() function', () => {
    it ('Creates a function which does a hasShape() check', () => {
        var objA = { username: 'someone', password: 'RealBadPassword' };
        var objB = { someone: 'username', password: '********' };

        var isValid = compileShape({ username: 'string', password: 'string' });

        expect(isValid(objA)).toBe(true);
        expect(isValid(objB)).toBe(false);
    });
});