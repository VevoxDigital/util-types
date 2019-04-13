import { Exception } from './exception'

/**
 * An exception raised on operations or actions that are not yet implemented
 */
export class NotImplementedException extends Exception<[]> {
  public constructor () {
    super('Operation not yet implemented')
  }
}
