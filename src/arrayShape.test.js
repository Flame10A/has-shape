var arrayShape = require('../dist/arrayShape').default;
var assertionContext = require('../dist/assertionContext').default;

describe('arrayShape() function', () => {
    it ('Matches correct arrays', () => {
        var arrA = [1, 2, 3];
        var arrB = [1, '2', 3];
        var arrC = ['1', '2', '3'];

        var shape = arrayShape('number');

        expect(shape(arrA)).toBe(true);
        expect(shape(arrB)).toBe(false);
        expect(shape(arrC)).toBe(false);
    });

    it ('Matches empty arrays', () => {
        var shape = arrayShape('number');

        expect(shape([])).toBe(true);
    });

    it ('Can optionally disallow empty arrays', () => {
        var arrA = [1, 2];
        var arrB = [];

        var shape = arrayShape('number', { disallowEmpty: true });

        expect(shape(arrA)).toBe(true);
        expect(shape(arrB)).toBe(false);
    });

    it ('Throws when used in an assertion', () => {
        assertionContext.push(0);

        const arrA = [1, 2];
        const shape = arrayShape('string');

        expect(() => shape(arrA)).toThrow();

        assertionContext.clear();
    });
});