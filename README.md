# Class Traits

A small utility package to apply [PHP-style traits](https://www.php.net/manual/en/language.oop5.traits.php) to JavaScript classes.

## Usage

Traits can be defined as below.

```typescript
const SwimTrait = {
  canSwim() {
    return true;
  }
};

const MammalTrait = {
  producesMilk(this: { isMale: boolean; }) {
    return !this.isMale;
  }
};
```

Sample classes:

```typescript
class _Fish {
  public readonly hasScales = true;
}

class _Dolphin {
  public constructor(public readonly isMale: boolean) {}
}
```

Applying the traits:

```typescript
import { useTraits } from "class-traits";

const Fish = useTraits(_Fish, [SwimTrait]);
const Dolphin = useTraits(_Dolphin, [SwimTrait, MammalTrait]);

assert(new Fish().canSwim());
assert(new Dolphin(true).canSwim());
assert(new Dolphin(false).producesMilk());
```

## Gotchas

- When two or more traits share a common property or method, it is the rightmost trait in the array passed into `useTraits` that will take precedence. A shared property with conflicting types will evaluate to `never` but a shared method may be **incorrectly** treated it as an overload.

```typescript
const DocumentTrait1 = {
  defaultId: 0,
  getDatabase() {
    return null;
  }
};

const DocumentTrait2 = {
  defaultId: "0000",
  getDatabase() {
    return "local db";
  }
};

class _Doc { }
const Doc = useTraits(_Doc, [DocumentTrait1, DocumentTrait2]);

const doc1 = new Doc();
doc1.defaultId; // Expression evaluates to `never`.
doc1.getDatabase(); // Overloaded as returning `null | string` but it will always return a string.
```
