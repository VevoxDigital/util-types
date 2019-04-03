
/**
 * An object that is normally mutable, but can be sealed to make it immutable
 */
export interface ISealable {

  /**
   * Whether or not this object is sealed
   */
  sealed: boolean

  /**
   * Seals this object, preventing further modification
   */
  seal (): void
}

/**
 * An object that can be compared to another object
 */
export interface IComparable<T = any> {
  /**
   * Compares this object to another, returning a corresponding number. A positive number
   * represents this object is "greater" by some means, zero is equal, and a negative represents
   * that this object is "lesser".
   * @param other The other object
   */
  compare (other: T): number

  /**
   * Determines if this object is equal to another in some fashion. The implementation here
   * should not necessary compare direct equality (don't use `==`) but rather that the
   * value of {@link #compare} is zero. The implementation can (and probably should) be
   * simply `this.compare(other) === 0`.
   * @param other
   */
  equals (other: T): boolean
}

/**
 * A object that can be cloned
 */
export interface ICloneable<T> {
  /**
   * Clones this object, creating a practically identical but entirely different object
   */
  clone (): T
}

/**
 * An object that can be serialized to JSON
 */
export interface ISerializeable<T = any> {
  /**
   * Serializes this object to a type
   */
  serialize (): InterfaceOf<T>

  /**
   * Gets this object as a JSON value
   */
  toJSON (): JSON.Value

  /**
   * Gets a string representation of this object
   */
  toString (): string
}
