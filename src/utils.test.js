var isClass = require('../dist/utils').isClass;
var isValidInput = require('../dist/utils').isValidInput;
var safeStringify = require('../dist/utils').safeStringify;

describe('isClass() util', () => {
    function DummyClass() {
        this.n = 0;
    }

    it('Returns true when passed a class/constructor function', () => {

        expect(isClass(DummyClass)).toBe(true);
        expect(isClass(() => ({ n: 0 }))).toBe(false);
        expect(isClass({})).toBe(false);
        expect(isClass(null)).toBe(false);
    });

});

describe('isValidInput() util', () => {

    it('Returns true when passed a valid hasShape target', () => {

        expect(isValidInput({ num: 3 })).toBe(true);
        expect(isValidInput({})).toBe(true);
        expect(isValidInput([3])).toBe(true);
        expect(isValidInput([])).toBe(true);
        expect(isValidInput(() => null)).toBe(true);

        expect(isValidInput(3)).toBe(false);
        expect(isValidInput('hello!')).toBe(false);
        expect(isValidInput(null)).toBe(false);
        expect(isValidInput(undefined)).toBe(false);
    });

});

describe('safeStringify() util', () => {

    it('Returns the same output as JSON.stringify() for a safe value', () => {
        var obj = { x: { y: 'z' } };

        expect(safeStringify(obj)).toBe(JSON.stringify(obj, undefined, 1));
    });

    it('Returns a string even if there\'s a circular reference', () => {
        var obj = { x: null };
        obj.x = obj;

        expect(typeof safeStringify(obj)).toBe('string');
    });

});