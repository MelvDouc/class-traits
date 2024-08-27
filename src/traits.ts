import type { Constructor } from "$src/types.js";

function useTrait<O extends object, Args extends unknown[], T extends Function>(constructor: Constructor<O, Args>, trait: T) {
  const descriptors = Object.getOwnPropertyDescriptors(trait.prototype);
  Object.entries(descriptors).forEach(([propertyName, descriptor]) => {
    if (propertyName !== "constructor")
      Object.defineProperty(constructor.prototype, propertyName, descriptor);
  });
}

export {
  useTrait
};