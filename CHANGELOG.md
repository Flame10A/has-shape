# 2.0.1

## 🔧 Fixes
- Fix `arrayShape()` typings.

## 💻 Development changes
- Remove unused import in `index.ts`.

# 2.0.0

## 😱 Breaking
- Removed `compileShape()`.
- Replaced `compileShapeAssertion()` with `shape()`.
- `arrayShape()` is now an assertion function rather than a predicate.
    - Returns undefined on success, throws on failure.

## ✨ New
- `hasShape()` and `assertShape()` now support all valid type specifiers,
    rather than objects only.

## 🔧 Fixes
- Removed type conversions for class specifiers.

# 1.2.2

No code changes.

## 💻 Development changes
- Added repository to `package.json`.

# 1.2.1

## ✨ New
- `compileShapeAssertion(shape)` compiles an assertion in the same way as you
  would use `compileShape(shape)`.

## 🔧 Fixes
- `assertShape` is correctly exported.

# 1.2.0

## ✨ New
- `assertShape(value, shape)` will do a check as an 'assertion', throwing
  a descriptive error if the value does not match the shape.

## 💻 Development changes
- Removed unused `isClass` util.
- Removed unused `safeStringify` util.

# 1.1.0

## 😱 Breaking
- Removed ability to use a class as a type specifier.
    - Determining whether a function is a class was too unstable.
    - If needed, replace with `property: v => v instanceof YourClass`.

## 🔧 Fixes
- Fixed predicates failing where they shouldn't have.
    - Fixed by the above removal of class specifiers.

## 💻 Development changes
- Fix acorn dev-dependency
- Update dev dependencies

## 📚 Documentation
- Remove documentation for assertShape() function which was not included in
  public release.

# 1.0.0
First public release.