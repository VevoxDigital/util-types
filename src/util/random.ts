
/**
 * A Lehmer Seeded Psuedo-Random number generator. Two instances
 * of this generator that were created with the same seed should generate the
 * same sequence of numbers.
 */
export class SeededRandom {

  // see the wiki article on Lehmer number generators for where these numbers came from
  // https://en.wikipedia.org/wiki/Lehmer_random_number_generator

  /** The modulus for the RANF random */
  public static readonly RANF_MODULUS = (2 ** 48) - 1

  /** The multiplier for the RANF random */
  public static readonly RANF_MULTIPLIER = 0x2875A2E7B175

  /** The initial seed this random used */
  public readonly seed: number

  /** This random's modulus */
  public readonly modulus: number

  /** This random's multiplier */
  public readonly multiplier: number

  // current value
  private value: number

  public constructor (seed: number)
  public constructor (seed: number, modulus: number, multiplier: number)
  public constructor (seed: number,
                      modulus: number = SeededRandom.RANF_MODULUS,
                      multiplier: number = SeededRandom.RANF_MULTIPLIER) {
    this.seed = seed
    this.modulus = modulus
    this.multiplier = multiplier

    this.value = this.seed % modulus
  }

  /** This random's current value */
  public get current (): number {
    return this.value
  }

  /**
   * Gets the next value in the random
   */
  public next (): number {
    this.value = this.value * this.multiplier % this.modulus
    return this.value
  }

  /**
   * Gets the next integer in this random
   * @param bound The bound for the integer
   */
  public nextInt (bound: number = this.modulus): number {
    return this.next() % bound
  }

  /**
   * Gets an array of the given length containing the next associated values from this random
   * @param bound The bound for the integers
   */
  public nextFewInts (count: number, bound: number = this.modulus): number[] {
    return Array(count).map(() => this.nextInt(bound))
  }

  /**
   * Gets the next floating-point value (i.e. `[0,1)`) in this random.
   */
  public nextFloat (): number {
    return (this.next() - 1) / (this.modulus - 1)
  }

  /**
   * Gets an array of the given length containing the next associated float values from this random
   * @param bound The bound for the integers
   */
  public nextFewFloats (count: number): number[] {
    return Array(count).map(() => this.nextFloat())
  }
}
