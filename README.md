# Class Traits

A small utility package to apply [PHP-style traits](https://www.php.net/manual/en/language.oop5.traits.php) to JavaScript classes.

## Usage

Traits can be defined as below.

```typescript
class SwimTrait {
  canSwim() {
    return true;
  }
}

class MammalTrait {
  declare public isMale: boolean;

  producesMilk() {
    return !this.isMale;
  }
}
```

Applying the traits:

```typescript
import { UseTraits } from "class-traits";

@UseTraits(SwimTrait)
class Fish {}
interface Fish extends SwimTrait {}

@UseTraits(SwimTrait, MammalTrait)
class Dolphin {
  public constructor(public readonly isMale: boolean) {}
}
interface Dolphin extends SwimTrait, DolphinTrait {}

assert(new Fish().canSwim());
assert(new Dolphin(true).canSwim());
assert(new Dolphin(false).producesMilk());
```

Note how an extra interface declaration is needed in order for the TypeScript interpreter to recognize the type augmentation.
