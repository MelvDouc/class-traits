import type { Constructor, UnionToIntersection } from "$src/types.js";

function useTrait<O extends object, Args extends unknown[], T extends object>(constructor: Constructor<O, Args>, trait: T) {
  const descriptors = Object.getOwnPropertyDescriptors(trait);
  Object.entries(descriptors).forEach(([propertyName, descriptor]) => {
    Object.defineProperty(constructor.prototype, propertyName, { ...descriptor });
  });
  return constructor as Constructor<O & T, Args>;
}

function useTraits<O extends object, Args extends unknown[], T extends object>(constructor: Constructor<O, Args>, traits: T[]) {
  const trait = mergeTraits(traits);
  return useTrait(constructor, trait as object) as Constructor<O & UnionToIntersection<T>, Args>;
}

function mergeTraits<T extends object>(objects: T[]): UnionToIntersection<T> {
  return objects.reduce((acc, obj) => Object.assign(acc, obj), {}) as any;
}

export {
  useTrait,
  useTraits
};