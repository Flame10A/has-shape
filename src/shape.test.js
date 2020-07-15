var shape = require('../dist/shape').default;

describe('shape()', () => {
    it ('Creates a function which performs assertShape()', () => {
        var objA = { username: 'someone', password: 'RealBadPassword' };
        var objB = { someone: 'username', password: '********' };

        var assertValidity = shape({ username: 'string', password: 'string' });

        expect(() => assertValidity(objA)).not.toThrow();
        expect(() => assertValidity(objB)).toThrow();
    });
});