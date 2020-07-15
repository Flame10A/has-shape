[![hasShape() on NPM](https://img.shields.io/npm/v/has-shape)](https://www.npmjs.com/package/has-shape)
![typings: included](https://img.shields.io/badge/typings-included-brightgreen)
![dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen)

Super simple runtime type-checking for Javascript objects.

Also provides relevant typing for Typescript and type-aware IDEs (e.g. VS Code).

# Installation
```sh
npm install has-shape
```

# Basic usage
`hasShape()` receives a value, and a shape specifier. It then determines
    whether the value matches the shape.

```javascript
import hasShape from 'has-shape';

// ...

if (hasShape(formData, { name: 'string', password: isValidPassword })) {
    // ...
}
```

In this example, `formData` must pass the following conditions:
- It is an object.
- It has a `name` property, which is a string.
- It has a `password` property, which passes the `isValidPassword` predicate.

# Supported shapes

- Object shapes, e.g. `{ name: 'string', age: 'number' }`
- `typeof` strings
    - 'number', 'string', etc.
    - Also includes 'any' and 'unknown'. These match any type, and the typings
        map to the matching TS type.
- Nested object shapes
- Regular Expressions
- Predicate functions
- Assertion functions
- Array shapes (via `arrayShape()`)

# Additional functions

### `arrayShape()`

Creates a shape which matches arrays containing elements of the given specifier.

```javascript
if (hasShape(value, arrayShape('number'))) { // True if value is an array of numbers
```

By default, empty arrays are allowed. This can be overridden by passing an
    options object with `disallowEmpty: true`.

```javascript
const teamShape = {
    name: 'string',
    members: arrayShape({
        name: 'string',
        age: 'number'
    }, { disallowEmpty: true })
};

if (hasShape(obj, teamShape)) {
```

## `assertShape()`

The same as `hasShape()`, but rather than returning a boolean, instead throws
    a descriptive error if the value does not match the shape.

```javascript
assertShape(person, personShape); // Throws if person does not match personShape
```

## `shape()`

Creates an assertion function for the given shape.

```javascript
const personShape = shape({ name: 'string', age: 'number' });

personShape(person); // Throws if person does not match personShape
```