# tiny-js-bug-prevention-utils

A small collection of plain JavaScript utilities that prevent common bugs caused by missing values, unsafe object checks, invalid JSON, bad numbers, unresolved promises, and unknown states.

## Why this repo exists

Medium readers should be able to grab the exact utilities from the article in one place. These helpers are intentionally small, readable, and ready to copy into real code without extra dependencies.

## Installation

```bash
npm install --save-dev tiny-js-bug-prevention-utils
```

> This package is written as ES modules and has no runtime dependencies.

## Quick usage

```js
import {
  required,
  isPlainObject,
  hasOwn,
  toArray,
  safeJsonParse,
  assertFiniteNumber,
  withTimeout,
  assertOneOf,
} from 'tiny-js-bug-prevention-utils';

const data = required(parsedBody, 'parsedBody');
const safeArray = toArray(data.items);
const userInput = assertOneOf(color, ['red', 'blue', 'green']);
```

## Full list of utilities

- `required`
- `isPlainObject`
- `hasOwn`
- `toArray`
- `safeJsonParse`
- `assertFiniteNumber`
- `withTimeout`
- `assertOneOf`

## Utility reference

### `required`

#### What it solves

Missing values are a common source of crashy runtime bugs. `required` makes it explicit when a value must be present.

#### Example

```js
import { required } from 'tiny-js-bug-prevention-utils';

const value = required(config.apiKey, 'config.apiKey');
```

#### When to use it

- When a value must exist before continuing.
- When you want a clear error message instead of a later `undefined` failure.

#### When not to use it

- When a missing value is valid and should be handled gracefully.

### `isPlainObject`

#### What it solves

Some values look like objects but are arrays, `null`, or other non-plain objects. This helper keeps the check strict.

#### Example

```js
import { isPlainObject } from 'tiny-js-bug-prevention-utils';

if (isPlainObject(payload)) {
  // safe to read keys from payload
}
```

#### When to use it

- When you need to verify a configuration or request body is a plain object.

#### When not to use it

- When arrays or class instances are also valid inputs.

### `hasOwn`

#### What it solves

Direct property checks can be fooled by inherited keys. `hasOwn` safely checks whether the object itself owns a property.

#### Example

```js
import { hasOwn } from 'tiny-js-bug-prevention-utils';

if (hasOwn(user, 'name')) {
  console.log(user.name);
}
```

#### When to use it

- When you want a robust property check on user data or API results.

#### When not to use it

- When you only need truthiness or a loose property check.

### `toArray`

#### What it solves

APIs and values can be `null`, `undefined`, a single item, or an array. `toArray` normalizes these cases into a safe array.

#### Example

```js
import { toArray } from 'tiny-js-bug-prevention-utils';

const items = toArray(maybeItems);
```

#### When to use it

- When you want consistent array handling for optional or single values.

#### When not to use it

- When `null` and `undefined` must remain distinct from an empty list.

### `safeJsonParse`

#### What it solves

JSON parsing can throw and crash execution. `safeJsonParse` returns a fallback value on invalid JSON.

#### Example

```js
import { safeJsonParse } from 'tiny-js-bug-prevention-utils';

const settings = safeJsonParse(rawSettings, {});
```

#### When to use it

- When parsing incoming strings that may not always be valid JSON.

#### When not to use it

- When you need to know exactly why parsing failed.

### `assertFiniteNumber`

#### What it solves

`NaN`, `Infinity`, and non-number values can leak into numeric code paths and cause hard-to-debug issues. This helper enforces a real number.

#### Example

```js
import { assertFiniteNumber } from 'tiny-js-bug-prevention-utils';

const count = assertFiniteNumber(parsedCount, 'parsedCount');
```

#### When to use it

- When a numeric value is required and must be finite.

#### When not to use it

- When you want to accept strings or numeric-like values.

### `withTimeout`

#### What it solves

Promises can hang indefinitely when a remote service fails or a timer never resolves. `withTimeout` rejects after a fixed delay.

#### Example

```js
import { withTimeout } from 'tiny-js-bug-prevention-utils';

await withTimeout(fetch(url), 5000);
```

#### When to use it

- When you need to guard slow or unreliable async operations.

#### When not to use it

- When the operation must be allowed to run to completion.

### `assertOneOf`

#### What it solves

Unknown values often creep into enum-style inputs. `assertOneOf` verifies a value belongs to an explicit list.

#### Example

```js
import { assertOneOf } from 'tiny-js-bug-prevention-utils';

const theme = assertOneOf(userTheme, ['light', 'dark']);
```

#### When to use it

- When a value must match a known set of allowed options.

#### When not to use it

- When open-ended values are acceptable.

## Use With the Article

This repository was created as a companion resource for the Medium article:

"8 Tiny JavaScript Utilities That Prevent Big Bugs"

The article explains the thinking behind each utility, the kind of bug it prevents, and when the utility should or should not be used.

## Testing

Run the tests with:

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

## Copy-paste usage

If you do not want to install a package, copy the helper files directly from the `src/` folder into your project. Each utility is intentionally small and can be reused as a standalone function.

```js
import { required } from './src/required.js';
```

## Interactive Playground

You can also open the visual playground to test each utility with real inputs and see the result immediately.

Open:

playground/index.html

The playground includes examples for:

- missing values
- object checks
- owned properties
- array normalization
- safe JSON parsing
- finite number validation
- promise timeout handling
- allowed state validation


## Contribution

If you want to improve this companion repo, feel free to open a PR or add a suggestion. The goal is to keep these helpers practical, readable, and easy to use.

## License

MIT

## Article placeholder

This repository is intended as a companion resource for the Medium article.
