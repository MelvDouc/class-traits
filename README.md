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

class _Shark {
  public constructor(public readonly isMale: boolean) {}
}
```

Applying the traits:

```typescript
import { useTraits } from "class-traits";

const Fish = useTraits(_Fish, [SwimTrait]);
const Shark = useTraits(_Shark, [SwimTrait, MammalTrait]);

assert(new Fish().canSwim());
assert(new Shark(true).canSwim());
assert(new Shark(false).producesMilk());
```
