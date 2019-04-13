import { ISealable } from '../interfaces'
import { Exception } from './exception'

/**
 * An exception raised when a sealable instance is sealed and something attempted to modify it
 */
export class SealedAccessException extends Exception<[string]> {

  /**
   * A static helper method for checking a sealable sealed state and raising the exception if the object is sealed
   * @param sealable The sealable to check
   */
  public static check (sealable: ISealable) {
    if (sealable.sealed) throw new SealedAccessException(sealable)
  }

  public constructor (sealable: ISealable) {
    super('Attempted to modify sealed instance of $s', sealable.constructor.name)
  }

}
