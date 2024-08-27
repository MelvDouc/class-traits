export class SwimTrait {
  canSwim() {
    return true;
  }
}

export class MammalTrait {
  declare public isMale: boolean;

  producesMilk() {
    return !this.isMale;
  }
}

export class MilkProducingTrait {
  producesMilk() {
    return true;
  }
}

export class GenderTrait {
  declare public isMale: boolean;

  get gender() {
    return this.isMale ? "male" : "female";
  }

  set gender(value: "male" | "female") {
    this.isMale = (value === "male");
  }
}