var isValidInput = require('../dist/utils').isValidInput;

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