import { useTrait } from "$src/traits.js";
import type { Constructor } from "$src/types.js";

export function UseTraitsDecorator(...traits: Function[]) {
  return <O extends object, Args extends unknown[]>(target: Constructor<O, Args>, _ctx: ClassDecoratorContext) => {
    traits.forEach((trait) => useTrait(target, trait));
  };
}