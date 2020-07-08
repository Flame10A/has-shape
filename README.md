Super simple runtime type-checking for Javascript objects.

![npm](https://img.shields.io/npm/v/has-shape)
![typings: included](https://img.shields.io/badge/typings-included-brightgreen)
![dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen)

```javascript
if (hasShape(formData, { name: 'string', password: isValidPassword })) {
    // Yep, formData has valid 'name' and 'password' fields
}
```

## Features
- Runtime type-checking of objects and tuples
    - Functions with properties can be checked too
- Check object properties by:
    - `typeof` strings (`'boolean'`, `'number'`, `'string'`, etc.)
        - Additionally allows 'any' and 'unknown'
    - Classes/constructor functions
    - Nested object shapes
    - Regular expressions
    - Predicate functions
- Type hints for Typescript and type-aware IDEs (such as VS Code)

## Installation
```sh
npm install has-shape
```

## Usage

### Basics
`hasShape(target, shape) => boolean`

hasShape receives two parameters:
- **target** - the value you wish to check
- **shape** - an object which specifies the properties you wish to check on
    the target. Example: `{ propertyA: 'number', propertyB: 'string'}

The target object will be checked against the shape, to see if it has all the
    required properties, with the correct types/specifications:


```javascript
import hasShape from 'has-shape';

// ...

if (hasShape(person, { name: 'string', age: 'number' })) {
    // True if person has 'name' of type string, and 'age' of type number
}
```

### Type specifiers

#### `typeof` strings

Strings are interpreted as `typeof` strings - the property will have its
    `typeof` result compared with the string.

As well as Javascript's built-in primitive types, `'any'` and `'unknown'` are
    also valid specifiers. Properties with these two are always valid, the only
    difference being the type interpreted by Typescript or the IDE.

```javascript
if (hasShape(obj, { a: 'string', b: 'number', c: 'any' })) {
```

#### Classes/constructor functions

If a class or constructor function is passed, the property is checked using
    `instanceof`, to see if it is an instance of the class.

```javascript
if (hasShape(obj, { request: Promise })) {
```

#### Nested shapes

Shapes can be nested, to, well, check nested properties.

```javascript
if (hasShape(obj, { nestedObject: { nestedProperty: 'number' } })) {
```

#### Regular expressions

A regular expression specifier will check that the property is a string, and
    that it matches the regular expression.

```javascript
if (hasShape(obj, { username: /^[a-z]{3,16}$/i })) {
```

#### Predicate functions

Any other function is treated as a predicate - it will receive the property's
    value, and the boolean result determines whether it's valid or not.

```javascript
if (hasShape(obj, { password: isValidPassword })) {
```

## Additional Functions

### `compileShape()`

Creates a predicate function for the given shape, for convenience.

```javascript
const isValid = compileShape({ username: /^[a-z]{3,16}$/i, password: isValidPassword });

if (isValid(credentials)) {
```

### `arrayShape()`

Creates a predicate which matches arrays containing elements of
    the given specifier.

```javascript
const isNumberArray = arrayShape('number');

if (isNumberArray(value)) {
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

### `assertShape()`

This is an additional function which is the assertion equivelent of
    `hasShape()`.

It receives the same parameters, and will return nothing if the check succeeds,
    or throw if it fails.

```javascript
assert(obj, { name: 'string' }); // Throws if obj doesn't have a string name

// Do stuff if obj has a valid name
```