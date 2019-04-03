
import { IComparable, ISealable, ISerializeable } from '../interfaces'

export interface IComparableMapOptions {
    /** Allows this map to be cleared */
    allowClear: boolean,

    /** Allows values to be deleted from this map, including "updates" to existing keys */
    allowDelete: boolean,

    /** Allows the putting of empty values to keys */
    allowEmpty: boolean
}

/**
 * An implementation of the ES {@link Map} that uses the {@link IComparable} interface to compare objects rather than
 * using the ES equality operator.
 */
export class ComparableMap<K extends IComparable<K>, V>
implements Map<K, V>, ISealable, ISerializeable<Dictionary<V>> {

  public readonly [Symbol.toStringTag] = ComparableMap.name

  private _sealed: boolean = false
  private readonly pairs: Array<[K, V]> = [ ]

  public constructor (...values: Array<[K, V]>) {
    this.add(values)
  }

  public get sealed (): boolean {
    return this._sealed
  }

  /** The number of key/value pairs in this map */
  public get size (): number {
    return this.pairs.length
  }

  public [Symbol.iterator] (): IterableIterator<[K, V]> {
    return this.pairs[Symbol.iterator]()
  }

  /**
   * Add multiple values to this map
   * @param pairs The pairs to add
   */
  public add (pairs: Array<[K, V]>) {
    for (const p of pairs) this.set(...p)
  }

  /**
   * Clear all values from this map
   */
  public clear (): void {
    if (!this._sealed) this.pairs.length = 0
  }

  /**
   * Delete a specific key from this map, returning whether or not a key was removed
   * @param key The key to delete
   */
  public delete (key: K): boolean {
    if (this._sealed) return false

    const index = this._get(key)
    if (index) {
      this.pairs.splice(index[0], 1)
      return true
    } else return false
  }

  /**
   * Get an iterator of entries in this map
   */
  public entries (): IterableIterator<[K, V]> {
    return this[Symbol.iterator]()
  }

  /**
   * Execute a callback function for each entry in this map
   * @param func The function to call
   * @param thisArg The binding of `this` for the function
   */
  public forEach (func: Functional.Consumer<[V, K, this]>, thisArg?: any): void {
    for (const [k, v] of this) func.call(thisArg, v, k, this)
  }

  /**
   * Gets a value by key
   * @param key The key to fetch
   */
  public get (key: K): Optional<V> {
    const index = this._get(key)
    return index && index[2]
  }

  /**
   * Gets an iterator of all keys in this map
   */
  public *keys (): IterableIterator<K> {
    for (const [k] of this) yield k
  }

  /**
   * Sets a value to the given key
   * @param key The key to set at
   * @param val The value to set
   */
  public set (key: K, val: V): this {
    if (this._sealed) return this // TODO exception???

    const i = this._get(key)
    if (i) this.pairs[i[0]] = [ key, val ]
    else this.pairs.push([ key, val ])

    return this
  }

  /**
   * Gets an iterator of all values in this map
   */
  public *values (): IterableIterator<V> {
    for (const [, v] of this) yield v
  }

  /**
   * Determines whether or not this map has a value at the given key
   * @param key The key to check
   */
  public has (key: K): boolean {
    return !!this._get(key)
  }

  public seal () {
    this._sealed = true
  }

  public serialize () {
    const dict: Dictionary<V> = {}
    for (const [k, v] of this) dict[k.toString()] = v
    return dict
  }

  public toJSON () {
    const dict: JSON.ValueDictionary = {}
    for (const [k, v] of this) {
      const val: Dictionary = v
      const jv: JSON.Value = typeof val.toJSON === 'function' ? val.toJSON() as JSON.Value : v.toString()
      dict[k.toString()] = jv
    }
    return dict
  }

  public toString () {
    return JSON.stringify(this.toJSON(), null, 2)
  }

  private _get (key: K): Optional<[number, K, V]> {
    for (let i = 0; i < this.size; i++) {
      if (this.pairs[i][0].equals(key)) return [i, this.pairs[i][0], this.pairs[i][1]]
    }
  }
}
