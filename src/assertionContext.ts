const _keyStack = [] as (string | number)[];

export default {
    push: (key: string | number) => _keyStack.push(key),
    pop: () => _keyStack.pop(),
    getString: () => {
        if (_keyStack.length < 1) {
            return '(schema root)';
        }

        return _keyStack.join('.');
    },
    isAsserting: () => _keyStack.length > 0,
    clear: () => {
        while (_keyStack.length) {
            _keyStack.pop();
        }
    }
};