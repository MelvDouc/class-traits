/**
 * The class type of object `O`.
 * This is essentially the reverse of `InstanceType<SomeClass>`.
 */
type Constructor<O extends object, Args extends unknown[]> = new (...args: Args) => O;

/**
 * Convert a union type to an intersection type.
 * It makes it possible to get the type of an object resulting from merging multiple objects.
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
  ? I
  : never;

export type {
  Constructor,
  UnionToIntersection
};