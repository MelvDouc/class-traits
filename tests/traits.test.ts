import { useTrait, useTraits } from "$src/index.js";
import { expect } from "chai";
import { test } from "node:test";
import { SwimTrait, MammalTrait, GenderTrait } from "./sample-traits.js";

test("A prototype should have all expected properties.", () => {
  class _Fish { public readonly hasScales = true; }
  const Fish = useTrait(_Fish, SwimTrait);

  expect(new Fish().hasScales).to.be.true;
  expect(typeof Fish.prototype.canSwim).to.equal("function");
  expect(new Fish().canSwim()).to.be.true;
});

test("Multiple traits should be possible.", () => {
  class _Shark {
    public constructor(public readonly isMale: boolean) { }
  }
  const Shark = useTraits(_Shark, [SwimTrait, MammalTrait]);
  expect(typeof Shark.prototype.canSwim).to.equal("function");
  expect(new Shark(true).producesMilk()).to.be.false;
  expect(new Shark(false).producesMilk()).to.be.true;
});

test("Getters and setters should be preserved.", () => {
  class _Frog {
    public constructor(public isMale: boolean) { }
  }
  const Frog = useTraits(_Frog, [GenderTrait]);
  const frog1 = new Frog(true);
  expect(frog1.gender === "male");
  frog1.gender = "female";
  expect(frog1.gender === "female");
});