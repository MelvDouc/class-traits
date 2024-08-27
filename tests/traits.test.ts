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
  class _Dolphin {
    public constructor(public readonly isMale: boolean) { }
  }
  const Dolphin = useTraits(_Dolphin, [SwimTrait, MammalTrait]);
  expect(typeof Dolphin.prototype.canSwim).to.equal("function");
  expect(new Dolphin(true).producesMilk()).to.be.false;
  expect(new Dolphin(false).producesMilk()).to.be.true;
});

test("Getters and setters should be preserved.", () => {
  class _Frog {
    public constructor(public isMale: boolean) { }
  }
  const Frog = useTraits(_Frog, [GenderTrait]);
  const frog1 = new Frog(true);
  expect(frog1.gender).to.equal("male");
  frog1.gender = "female";
  expect(frog1.gender).to.equal("female");
});