import { Exception } from './exception'

/**
 * An exception that occurs when file system access fails for one reason or another
 */
export class FileSystemException extends Exception<[number, string, string, string]> {
  public static from (err: NodeJS.ErrnoException) {
    return new FileSystemException(err.errno || -1, err.code || 'EUNKNOWN',
      err.path || 'unknown path', err.syscall || 'unknown')
  }

  public constructor (errno: number, code: string, path: string, syscall: string) {
    super('[%d]%s: %s (syscall: %s)', errno, code, path, syscall)
  }
}
