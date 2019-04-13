import { Exception } from './exception'

/**
 * An exception raised when an illegal access is attempted
 */
export class IllegalAccessException extends Exception<[string]> {
  public constructor (what: string) {
    super('Illegal access attempted: %s', what)
  }
}
