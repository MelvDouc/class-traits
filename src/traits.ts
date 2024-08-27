import type { Constructor, UnionToIntersection } from "$src/types.js";

function useTrait<O extends object, Args extends unknown[], T extends object>(constructor: Constructor<O, Args>, trait: T) {
  const descriptors = Object.getOwnPropertyDescriptors(trait);
  Object.entries(descriptors).forEach(([propertyName, descriptor]) => {
    Object.defineProperty(constructor.prototype, propertyName, { ...descriptor });
  });
  return constructor as Constructor<O & T, Args>;
}

function useTraits<O extends object, Args extends unknown[], T extends object>(constructor: Constructor<O, Args>, traits: T[]) {
  traits.forEach((trait) => useTrait(constructor, trait));
  return constructor as Constructor<O & UnionToIntersection<T>, Args>;
}

export {
  useTrait,
  useTraits
};