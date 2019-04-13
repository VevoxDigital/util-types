
/** A type that can either be something or undefined */
declare type Optional<T> = T | undefined

/** A type that can either be something or null */
declare type Nullable<T> = T | null

/** A type that can either be something, null, or undefined */
declare type Maybe<T> = T | null | undefined

/** Removes `undefined` and `null` from a given type */
declare type Known<T> = Exclude<T, undefined | null>

/** A type that could be a promise or its base value */
declare type Awaitable<T> = T | Promise<T>

/** A generic mapping of string keys to a given value type */
declare type Dictionary<T = any> = { [key: string]: Optional<T> }

/** A generic mapping of string keys to a certain given value type */
declare type KnownDictionary<T = any> = { [key: string]: T }

/** An object that can be instanced (i.e. new'ed) into a given type, accepting the given arguments to do so */
declare interface Instanciable<T, A extends any[] = []> extends Function { new(...args: A): T } // tslint:disable-line callable-types

/** A type with private/protected members stripped */
declare type InterfaceOf<T> = { [P in keyof T]: T[P] }

/** All fields in `U` removed from `T` */
declare type ExcludeFrom<T, U extends keyof T> = { [K in Exclude<keyof T, U>]: T[K] }

/** Only fields in `U` from `T` */
declare type ExtractFrom<T, U extends keyof T> = { [K in Extract<keyof T, U>]: T[K] }

/** `T`, but with all fields `U` marked required (and others untouched) */
declare type RequiredIn<T, U extends keyof T> = T & ExtractFrom<Required<T>, U>

/** An object who extends `T`, where keys `U` are required and others are optional */
declare type Options<T, U extends keyof T = never> = RequiredIn<Partial<T>, U>

/** A pair of a given type */
declare type Pair<T> = [ T, T ]

/** A triple of a given type */
declare type Triple<T> = [ T, T, T ]

/** Functional types */
declare namespace Functional {
  // generic functionals

  /** A functional type that creates values from no input */
  type Producer<V> = Operator<[], V>

  /** A functional type that consumes data and returns a void value */
  type Consumer<T extends any[]> = Operator<T>

  /** A functional type that returns a boolean from input */
  type Predicate<T extends any[]> = Operator<T, boolean>

  /** A functional that *can* a given input and *can* process it to an output */
  type Operator<T extends any[] = [], V = void> = (...args: T) => V
}

declare namespace FunctionalAsync {
  // generic async functinals

  /** An async functional type that creates values from no input */
  type Producer<V> = Operator<[], V>

  /** An async functional type that consumes data and returns a void value */
  type Consumer<T extends any[]> = Operator<T>

  /** An async functional type that returns a boolean from input */
  type Predicate<T extends any[]> = Operator<T, boolean>

  /** An async functional that *can* a given input and *can* process it to an output */
  type Operator<T extends any[] = [], V = void> = Functional.Operator<T, Promise<V>>
}



declare namespace JSON {
  /** Valid value types for JSON */
  type Value = string | number | boolean | null | ValueArray | ValueDictionary

  /** An array of JSON values */
  interface ValueArray extends Array<Value> { }

  /** A dictionary of JSON values */
  interface ValueDictionary extends Dictionary<Value> { }
}

declare interface JSON {
  parse (text: string): JSON.Value
}



/** Interfaces related to `npm`/`yarn`. */
declare namespace NPM {
  interface IPackageJSON extends JSON.ValueDictionary {

    /** The package's internal name */
    readonly name: string

    /** The semver-compatable version of the package */
    readonly version: string

    /** A non-localized description of the package */
    readonly description?: string

    /** The non-localized product name of this pacakge */
    readonly productName?: string

    /** Any package keysworks for NPM search */
    readonly keywords?: string[]

    /** The package's homepage, if it has one */
    readonly homepage?: string

    /** A tracker to report bugs too */
    readonly bugs?: string | NPM.IPackageBugs

    /** The license that this package is available under */
    readonly license?: string

    /** The author of the package */
    readonly author?: string | NPM.IPackageAuthor

    /** Any additional contributors to the package */
    readonly contributors?: string[] | NPM.IPackageAuthor[]

    /** An array of files to include in publishing */
    readonly files?: string[]

    /** The main execution script for the package */
    readonly main?: string

    /** Any binary commands available to the package */
    readonly bin?: string | Dictionary<string>

    /** Documentation for this pacakage */
    readonly man?: string | string[]

    /** The location of certain package directories */
    readonly directories?: NPM.IPackageDirectories

    /** The version control repository for this package */
    readonly repository?: string | IPackageRepository

    /** The scripts for the package */
    readonly scripts?: Dictionary<string>

    /** The package's configuration data */
    readonly config?: NPM.IPackageConfig

    /** A mapping of the package dependencies to their versions */
    readonly dependencies?: Dictionary<string>

    /** A mapping of the package development-only dependencies to their versions */
    readonly devDependencies?: Dictionary<string>

    /** A mapping of the package peer dependencies to their versions */
    readonly peerDependencies?: Dictionary<string>

    /** A mapping of the package optional dependencies to their versions */
    readonly optionalDependencies?: Dictionary<string>

    /** An array of dependencies that come bundled */
    readonly bundledDependencies?: string[]

    /** The engines this package runs on */
    readonly engines?: NPM.IPackageEngines

    /** The list of OSes this package runs on */
    readonly os?: string[]

    /** THe list of CPU architectures this pacakge runs on */
    readonly cpu?: string[]

    /** Whether or not this package prefers a global install */
    readonly preferGlobal?: boolean

    /** Whether or not this pacakge is private */
    readonly private?: boolean

    /** Speciallized configuration for publishing */
    readonly publishConfig?: NPM.IPackagePublishConfig

    /** Any yarn workspaces for this package */
    readonly workspaces?: string[]
  }

  export interface IPackageAuthor extends JSON.ValueDictionary {
    /** The author's name */
    name: string

    /** The author's primary contact email */
    email?: string

    /** The author's homepage URL */
    homepage?: string
  }

  export interface IPackageBugs extends JSON.ValueDictionary {
    /** An email to send bugs to */
    email: string

    /** The URL to report bugs to */
    url: string
  }

  /** The location of certain package directories */
  export interface IPackageDirectories extends JSON.ValueDictionary {
    lib?: string
    bin?: string
    man?: string
    doc?: string
    example?: string
  }

  /** The engines this package is designed for */
  export interface IPackageEngines extends JSON.ValueDictionary {
    node?: string
    npm?: string
  }

  /** The configuration data managed by NPM */
  export interface IPackageConfig extends JSON.ValueDictionary {
    /** The NPM namespace for the config command */
    name?: string

    /** The configuration data */
    config?: JSON.ValueDictionary
  }

  /** The publishing configuration this package */
  export interface IPackagePublishConfig extends JSON.ValueDictionary {
    registry?: string
  }

  /** A project repository */
  export interface IPackageRepository extends JSON.ValueDictionary {
    /** The type of repository */
    type: string

    /** The URL of the repository */
    url: string
  }
}

declare module '*/package.json' {
  const packageJson: NPM.IPackageJSON
  export = packageJson
}
