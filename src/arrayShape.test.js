var arrayShape = require('../dist/arrayShape').default;

describe('arrayShape() function', () => {
    it ('Matches correct arrays', () => {
        var arrA = [1, 2, 3];
        var arrB = [1, '2', 3];
        var arrC = ['1', '2', '3'];

        var shape = arrayShape('number');

        expect(() => shape(arrA)).not.toThrow();
        expect(() => shape(arrB)).toThrow();
        expect(() => shape(arrC)).toThrow();
    });

    it ('Matches empty arrays', () => {
        var shape = arrayShape('number');

        expect(() => shape([])).not.toThrow();
    });

    it ('Can optionally disallow empty arrays', () => {
        var arrA = [1, 2];
        var arrB = [];

        var shape = arrayShape('number', { disallowEmpty: true });

        expect(() => shape(arrA)).not.toThrow();
        expect(() => shape(arrB)).toThrow();
    });
});