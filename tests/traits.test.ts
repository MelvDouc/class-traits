import { UseTraits } from "$src/index.js";
import { expect } from "chai";
import { test } from "node:test";
import { SwimTrait, MammalTrait, GenderTrait, MilkProducingTrait } from "./sample-traits.js";

test("A prototype should have all expected properties.", () => {
  @UseTraits(SwimTrait)
  class Fish {
    public readonly hasScales = true;
  }
  interface Fish extends SwimTrait { }

  expect(new Fish().hasScales).to.be.true;
  expect(typeof Fish.prototype.canSwim).to.equal("function");
  expect(new Fish().canSwim()).to.be.true;
});

test("Multiple traits should be possible.", () => {
  @UseTraits(SwimTrait, MammalTrait)
  class Dolphin {
    public constructor(public readonly isMale: boolean) { }
  }
  interface Dolphin extends SwimTrait, MammalTrait { }

  expect(typeof Dolphin.prototype.canSwim).to.equal("function");
  expect(new Dolphin(true).producesMilk()).to.be.false;
  expect(new Dolphin(false).producesMilk()).to.be.true;
});

test("Getters and setters should be preserved.", () => {
  @UseTraits(GenderTrait)
  class Frog {
    public constructor(public isMale: boolean) { }
  }
  interface Frog extends GenderTrait { }

  const frog1 = new Frog(true);
  expect(frog1.gender).to.equal("male");
  frog1.gender = "female";
  expect(frog1.gender).to.equal("female");
});

test("Conflicting tokens", () => {
  @UseTraits(MammalTrait, MilkProducingTrait)
  class Cow { }
  interface Cow extends MammalTrait, MilkProducingTrait { }

  expect(new Cow().producesMilk()).to.be.true;
});