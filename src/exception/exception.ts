
import { format } from 'util'

/**
 * A variant of the base JS {@link Error} class that is type-safe and
 * has a few extra features
 */
export class Exception<T extends any[] = []> extends Error {
  public static readonly STACK_INDENT = '    '
  public static readonly CAUSE_PREFIX = `\n${Exception.STACK_INDENT}Caused By: `

  public readonly causes: any[] = []

  public constructor (message: string, ...args: T) {
    super(format(message, ...args))
    this.name = this.constructor.name
  }

  /**
   * Appends a cause to this exception
   * @param err The cause
   */
  public causedBy (err: any): this {
    if (err instanceof Error) {
      this.stack += Exception.CAUSE_PREFIX + (err.stack || err.message).replace(/\n/g, '\n' + Exception.STACK_INDENT)
    } else this.stack += Exception.CAUSE_PREFIX + String(err)
    this.causes.push(err)
    return this
  }
}
