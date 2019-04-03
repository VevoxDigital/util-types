import { ICloneable, ISerializeable } from '../interfaces'

/**
 * A generic ordered value of a specific tuple type
 */
export class Ordered<T extends any[] = any[]>
implements ICloneable<Ordered<T>>, ISerializeable<T> {
  [index: number]: T[number]

  private readonly values: T

  public constructor (...values: T) {
    this.values = values
    for (let i = 0; i < values.length; i++) this[i] = values[i]
  }

  /**
   * Gets the value at the given index, if any
   * @param i The index
   */
  public get <N extends number> (i: N): T[N] {
    return this[i]
  }

  public clone () {
    return new Ordered<T>(...this.values)
  }

  public serialize () {
    return this.values
  }

  public toJSON () {
    return this.values
  }

  public toString () {
      return `(${this.values.join(',')})`
  }
}
