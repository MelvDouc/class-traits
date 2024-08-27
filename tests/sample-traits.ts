export const SwimTrait = {
  canSwim() {
    return true;
  }
};
export const MammalTrait = {
  producesMilk(this: { isMale: boolean; }) {
    return !this.isMale;
  }
};
export const GenderTrait = {
  get gender() {
    return (this as unknown as { isMale: boolean; }).isMale ? "male" : "female";
  },
  set gender(value: "male" | "female") {
    (this as unknown as { isMale: boolean; }).isMale = (value === "male");
  }
};
