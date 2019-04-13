import { Exception } from './exception'

/**
 * An exception raised when an operation is not supported for one reason or another
 */
export class UnsupportedOperationException extends Exception<[string]> {
  public constructor (reason: string) {
    super('Operation is not supported: %s', reason)
  }
}
