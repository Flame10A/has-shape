var assertionContext = require('../dist/assertionContext').default;

describe('assertionContext', () => {
    beforeEach(() => {
        assertionContext.clear();
    });

    it('Provides accurate string', () => {
        assertionContext.push('players');
        assertionContext.push(0);
        assertionContext.push('name');

        expect(assertionContext.getString()).toBe('players.0.name');
    });
});