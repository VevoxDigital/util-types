import { Exception } from './exception'

/**
 * An exception raised when an access goes out of bounds
 */
export class OutOfBoundsException extends Exception<[number, number]> {
  public constructor (index: number, bound: number) {
    super('Attempted to access index %d, which exceeded the bound of %d', index, bound)
  }
}
