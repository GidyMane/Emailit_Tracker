
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Domain
 * 
 */
export type Domain = $Result.DefaultSelection<Prisma.$DomainPayload>
/**
 * Model EmailEvent
 * 
 */
export type EmailEvent = $Result.DefaultSelection<Prisma.$EmailEventPayload>
/**
 * Model EmailSummary
 * 
 */
export type EmailSummary = $Result.DefaultSelection<Prisma.$EmailSummaryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.domain`: Exposes CRUD operations for the **Domain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Domains
    * const domains = await prisma.domain.findMany()
    * ```
    */
  get domain(): Prisma.DomainDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailEvent`: Exposes CRUD operations for the **EmailEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailEvents
    * const emailEvents = await prisma.emailEvent.findMany()
    * ```
    */
  get emailEvent(): Prisma.EmailEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailSummary`: Exposes CRUD operations for the **EmailSummary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailSummaries
    * const emailSummaries = await prisma.emailSummary.findMany()
    * ```
    */
  get emailSummary(): Prisma.EmailSummaryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Domain: 'Domain',
    EmailEvent: 'EmailEvent',
    EmailSummary: 'EmailSummary'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "domain" | "emailEvent" | "emailSummary"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Domain: {
        payload: Prisma.$DomainPayload<ExtArgs>
        fields: Prisma.DomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findFirst: {
            args: Prisma.DomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findMany: {
            args: Prisma.DomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          create: {
            args: Prisma.DomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          createMany: {
            args: Prisma.DomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          delete: {
            args: Prisma.DomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          update: {
            args: Prisma.DomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          deleteMany: {
            args: Prisma.DomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DomainUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          upsert: {
            args: Prisma.DomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          aggregate: {
            args: Prisma.DomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDomain>
          }
          groupBy: {
            args: Prisma.DomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<DomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.DomainCountArgs<ExtArgs>
            result: $Utils.Optional<DomainCountAggregateOutputType> | number
          }
        }
      }
      EmailEvent: {
        payload: Prisma.$EmailEventPayload<ExtArgs>
        fields: Prisma.EmailEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          findFirst: {
            args: Prisma.EmailEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          findMany: {
            args: Prisma.EmailEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          create: {
            args: Prisma.EmailEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          createMany: {
            args: Prisma.EmailEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          delete: {
            args: Prisma.EmailEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          update: {
            args: Prisma.EmailEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          deleteMany: {
            args: Prisma.EmailEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          upsert: {
            args: Prisma.EmailEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          aggregate: {
            args: Prisma.EmailEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailEvent>
          }
          groupBy: {
            args: Prisma.EmailEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailEventCountArgs<ExtArgs>
            result: $Utils.Optional<EmailEventCountAggregateOutputType> | number
          }
        }
      }
      EmailSummary: {
        payload: Prisma.$EmailSummaryPayload<ExtArgs>
        fields: Prisma.EmailSummaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailSummaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailSummaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>
          }
          findFirst: {
            args: Prisma.EmailSummaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailSummaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>
          }
          findMany: {
            args: Prisma.EmailSummaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>[]
          }
          create: {
            args: Prisma.EmailSummaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>
          }
          createMany: {
            args: Prisma.EmailSummaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailSummaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>[]
          }
          delete: {
            args: Prisma.EmailSummaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>
          }
          update: {
            args: Prisma.EmailSummaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>
          }
          deleteMany: {
            args: Prisma.EmailSummaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailSummaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailSummaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>[]
          }
          upsert: {
            args: Prisma.EmailSummaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailSummaryPayload>
          }
          aggregate: {
            args: Prisma.EmailSummaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailSummary>
          }
          groupBy: {
            args: Prisma.EmailSummaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailSummaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailSummaryCountArgs<ExtArgs>
            result: $Utils.Optional<EmailSummaryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    domain?: DomainOmit
    emailEvent?: EmailEventOmit
    emailSummary?: EmailSummaryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    domains: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domains?: boolean | UserCountOutputTypeCountDomainsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDomainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainWhereInput
  }


  /**
   * Count Type DomainCountOutputType
   */

  export type DomainCountOutputType = {
    emails: number
  }

  export type DomainCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emails?: boolean | DomainCountOutputTypeCountEmailsArgs
  }

  // Custom InputTypes
  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainCountOutputType
     */
    select?: DomainCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    kindeId: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    kindeId: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    kindeId: number
    email: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    kindeId?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    kindeId?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    kindeId?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    kindeId: string
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kindeId?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domains?: boolean | User$domainsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kindeId?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kindeId?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    kindeId?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "kindeId" | "email" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domains?: boolean | User$domainsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      domains: Prisma.$DomainPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kindeId: string
      email: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domains<T extends User$domainsArgs<ExtArgs> = {}>(args?: Subset<T, User$domainsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly kindeId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.domains
   */
  export type User$domainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    cursor?: DomainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Domain
   */

  export type AggregateDomain = {
    _count: DomainCountAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  export type DomainMinAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainMaxAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DomainMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domain to aggregate.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Domains
    **/
    _count?: true | DomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainMaxAggregateInputType
  }

  export type GetDomainAggregateType<T extends DomainAggregateArgs> = {
        [P in keyof T & keyof AggregateDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomain[P]>
      : GetScalarType<T[P], AggregateDomain[P]>
  }




  export type DomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainWhereInput
    orderBy?: DomainOrderByWithAggregationInput | DomainOrderByWithAggregationInput[]
    by: DomainScalarFieldEnum[] | DomainScalarFieldEnum
    having?: DomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainCountAggregateInputType | true
    _min?: DomainMinAggregateInputType
    _max?: DomainMaxAggregateInputType
  }

  export type DomainGroupByOutputType = {
    id: string
    name: string
    userId: string | null
    createdAt: Date
    updatedAt: Date
    _count: DomainCountAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  type GetDomainGroupByPayload<T extends DomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainGroupByOutputType[P]>
            : GetScalarType<T[P], DomainGroupByOutputType[P]>
        }
      >
    >


  export type DomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Domain$userArgs<ExtArgs>
    emails?: boolean | Domain$emailsArgs<ExtArgs>
    summary?: boolean | Domain$summaryArgs<ExtArgs>
    _count?: boolean | DomainCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Domain$userArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Domain$userArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DomainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["domain"]>
  export type DomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Domain$userArgs<ExtArgs>
    emails?: boolean | Domain$emailsArgs<ExtArgs>
    summary?: boolean | Domain$summaryArgs<ExtArgs>
    _count?: boolean | DomainCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Domain$userArgs<ExtArgs>
  }
  export type DomainIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Domain$userArgs<ExtArgs>
  }

  export type $DomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Domain"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      emails: Prisma.$EmailEventPayload<ExtArgs>[]
      summary: Prisma.$EmailSummaryPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      userId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["domain"]>
    composites: {}
  }

  type DomainGetPayload<S extends boolean | null | undefined | DomainDefaultArgs> = $Result.GetResult<Prisma.$DomainPayload, S>

  type DomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DomainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DomainCountAggregateInputType | true
    }

  export interface DomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Domain'], meta: { name: 'Domain' } }
    /**
     * Find zero or one Domain that matches the filter.
     * @param {DomainFindUniqueArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DomainFindUniqueArgs>(args: SelectSubset<T, DomainFindUniqueArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Domain that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DomainFindUniqueOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DomainFindUniqueOrThrowArgs>(args: SelectSubset<T, DomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Domain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DomainFindFirstArgs>(args?: SelectSubset<T, DomainFindFirstArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Domain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DomainFindFirstOrThrowArgs>(args?: SelectSubset<T, DomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Domains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Domains
     * const domains = await prisma.domain.findMany()
     * 
     * // Get first 10 Domains
     * const domains = await prisma.domain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const domainWithIdOnly = await prisma.domain.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DomainFindManyArgs>(args?: SelectSubset<T, DomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Domain.
     * @param {DomainCreateArgs} args - Arguments to create a Domain.
     * @example
     * // Create one Domain
     * const Domain = await prisma.domain.create({
     *   data: {
     *     // ... data to create a Domain
     *   }
     * })
     * 
     */
    create<T extends DomainCreateArgs>(args: SelectSubset<T, DomainCreateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Domains.
     * @param {DomainCreateManyArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DomainCreateManyArgs>(args?: SelectSubset<T, DomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Domains and returns the data saved in the database.
     * @param {DomainCreateManyAndReturnArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Domains and only return the `id`
     * const domainWithIdOnly = await prisma.domain.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DomainCreateManyAndReturnArgs>(args?: SelectSubset<T, DomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Domain.
     * @param {DomainDeleteArgs} args - Arguments to delete one Domain.
     * @example
     * // Delete one Domain
     * const Domain = await prisma.domain.delete({
     *   where: {
     *     // ... filter to delete one Domain
     *   }
     * })
     * 
     */
    delete<T extends DomainDeleteArgs>(args: SelectSubset<T, DomainDeleteArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Domain.
     * @param {DomainUpdateArgs} args - Arguments to update one Domain.
     * @example
     * // Update one Domain
     * const domain = await prisma.domain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DomainUpdateArgs>(args: SelectSubset<T, DomainUpdateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Domains.
     * @param {DomainDeleteManyArgs} args - Arguments to filter Domains to delete.
     * @example
     * // Delete a few Domains
     * const { count } = await prisma.domain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DomainDeleteManyArgs>(args?: SelectSubset<T, DomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DomainUpdateManyArgs>(args: SelectSubset<T, DomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains and returns the data updated in the database.
     * @param {DomainUpdateManyAndReturnArgs} args - Arguments to update many Domains.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Domains and only return the `id`
     * const domainWithIdOnly = await prisma.domain.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DomainUpdateManyAndReturnArgs>(args: SelectSubset<T, DomainUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Domain.
     * @param {DomainUpsertArgs} args - Arguments to update or create a Domain.
     * @example
     * // Update or create a Domain
     * const domain = await prisma.domain.upsert({
     *   create: {
     *     // ... data to create a Domain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Domain we want to update
     *   }
     * })
     */
    upsert<T extends DomainUpsertArgs>(args: SelectSubset<T, DomainUpsertArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainCountArgs} args - Arguments to filter Domains to count.
     * @example
     * // Count the number of Domains
     * const count = await prisma.domain.count({
     *   where: {
     *     // ... the filter for the Domains we want to count
     *   }
     * })
    **/
    count<T extends DomainCountArgs>(
      args?: Subset<T, DomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DomainAggregateArgs>(args: Subset<T, DomainAggregateArgs>): Prisma.PrismaPromise<GetDomainAggregateType<T>>

    /**
     * Group by Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainGroupByArgs['orderBy'] }
        : { orderBy?: DomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Domain model
   */
  readonly fields: DomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Domain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Domain$userArgs<ExtArgs> = {}>(args?: Subset<T, Domain$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    emails<T extends Domain$emailsArgs<ExtArgs> = {}>(args?: Subset<T, Domain$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    summary<T extends Domain$summaryArgs<ExtArgs> = {}>(args?: Subset<T, Domain$summaryArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Domain model
   */
  interface DomainFieldRefs {
    readonly id: FieldRef<"Domain", 'String'>
    readonly name: FieldRef<"Domain", 'String'>
    readonly userId: FieldRef<"Domain", 'String'>
    readonly createdAt: FieldRef<"Domain", 'DateTime'>
    readonly updatedAt: FieldRef<"Domain", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Domain findUnique
   */
  export type DomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findUniqueOrThrow
   */
  export type DomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findFirst
   */
  export type DomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findFirstOrThrow
   */
  export type DomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findMany
   */
  export type DomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domains to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain create
   */
  export type DomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to create a Domain.
     */
    data: XOR<DomainCreateInput, DomainUncheckedCreateInput>
  }

  /**
   * Domain createMany
   */
  export type DomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Domain createManyAndReturn
   */
  export type DomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Domain update
   */
  export type DomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to update a Domain.
     */
    data: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
    /**
     * Choose, which Domain to update.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain updateMany
   */
  export type DomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Domains.
     */
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to update.
     */
    limit?: number
  }

  /**
   * Domain updateManyAndReturn
   */
  export type DomainUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * The data used to update Domains.
     */
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Domain upsert
   */
  export type DomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The filter to search for the Domain to update in case it exists.
     */
    where: DomainWhereUniqueInput
    /**
     * In case the Domain found by the `where` argument doesn't exist, create a new Domain with this data.
     */
    create: XOR<DomainCreateInput, DomainUncheckedCreateInput>
    /**
     * In case the Domain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
  }

  /**
   * Domain delete
   */
  export type DomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter which Domain to delete.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain deleteMany
   */
  export type DomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domains to delete
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to delete.
     */
    limit?: number
  }

  /**
   * Domain.user
   */
  export type Domain$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Domain.emails
   */
  export type Domain$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    where?: EmailEventWhereInput
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    cursor?: EmailEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * Domain.summary
   */
  export type Domain$summaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    where?: EmailSummaryWhereInput
  }

  /**
   * Domain without action
   */
  export type DomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
  }


  /**
   * Model EmailEvent
   */

  export type AggregateEmailEvent = {
    _count: EmailEventCountAggregateOutputType | null
    _avg: EmailEventAvgAggregateOutputType | null
    _sum: EmailEventSumAggregateOutputType | null
    _min: EmailEventMinAggregateOutputType | null
    _max: EmailEventMaxAggregateOutputType | null
  }

  export type EmailEventAvgAggregateOutputType = {
    emailId: number | null
    spamStatus: number | null
  }

  export type EmailEventSumAggregateOutputType = {
    emailId: number | null
    spamStatus: number | null
  }

  export type EmailEventMinAggregateOutputType = {
    id: string | null
    emailId: number | null
    token: string | null
    messageId: string | null
    to: string | null
    from: string | null
    subject: string | null
    eventType: string | null
    status: string | null
    spamStatus: number | null
    timestamp: Date | null
    domainId: string | null
    createdAt: Date | null
  }

  export type EmailEventMaxAggregateOutputType = {
    id: string | null
    emailId: number | null
    token: string | null
    messageId: string | null
    to: string | null
    from: string | null
    subject: string | null
    eventType: string | null
    status: string | null
    spamStatus: number | null
    timestamp: Date | null
    domainId: string | null
    createdAt: Date | null
  }

  export type EmailEventCountAggregateOutputType = {
    id: number
    emailId: number
    token: number
    messageId: number
    to: number
    from: number
    subject: number
    eventType: number
    status: number
    spamStatus: number
    timestamp: number
    domainId: number
    createdAt: number
    _all: number
  }


  export type EmailEventAvgAggregateInputType = {
    emailId?: true
    spamStatus?: true
  }

  export type EmailEventSumAggregateInputType = {
    emailId?: true
    spamStatus?: true
  }

  export type EmailEventMinAggregateInputType = {
    id?: true
    emailId?: true
    token?: true
    messageId?: true
    to?: true
    from?: true
    subject?: true
    eventType?: true
    status?: true
    spamStatus?: true
    timestamp?: true
    domainId?: true
    createdAt?: true
  }

  export type EmailEventMaxAggregateInputType = {
    id?: true
    emailId?: true
    token?: true
    messageId?: true
    to?: true
    from?: true
    subject?: true
    eventType?: true
    status?: true
    spamStatus?: true
    timestamp?: true
    domainId?: true
    createdAt?: true
  }

  export type EmailEventCountAggregateInputType = {
    id?: true
    emailId?: true
    token?: true
    messageId?: true
    to?: true
    from?: true
    subject?: true
    eventType?: true
    status?: true
    spamStatus?: true
    timestamp?: true
    domainId?: true
    createdAt?: true
    _all?: true
  }

  export type EmailEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailEvent to aggregate.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailEvents
    **/
    _count?: true | EmailEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailEventMaxAggregateInputType
  }

  export type GetEmailEventAggregateType<T extends EmailEventAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailEvent[P]>
      : GetScalarType<T[P], AggregateEmailEvent[P]>
  }




  export type EmailEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailEventWhereInput
    orderBy?: EmailEventOrderByWithAggregationInput | EmailEventOrderByWithAggregationInput[]
    by: EmailEventScalarFieldEnum[] | EmailEventScalarFieldEnum
    having?: EmailEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailEventCountAggregateInputType | true
    _avg?: EmailEventAvgAggregateInputType
    _sum?: EmailEventSumAggregateInputType
    _min?: EmailEventMinAggregateInputType
    _max?: EmailEventMaxAggregateInputType
  }

  export type EmailEventGroupByOutputType = {
    id: string
    emailId: number
    token: string
    messageId: string
    to: string
    from: string
    subject: string
    eventType: string
    status: string
    spamStatus: number
    timestamp: Date
    domainId: string
    createdAt: Date
    _count: EmailEventCountAggregateOutputType | null
    _avg: EmailEventAvgAggregateOutputType | null
    _sum: EmailEventSumAggregateOutputType | null
    _min: EmailEventMinAggregateOutputType | null
    _max: EmailEventMaxAggregateOutputType | null
  }

  type GetEmailEventGroupByPayload<T extends EmailEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailEventGroupByOutputType[P]>
            : GetScalarType<T[P], EmailEventGroupByOutputType[P]>
        }
      >
    >


  export type EmailEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    token?: boolean
    messageId?: boolean
    to?: boolean
    from?: boolean
    subject?: boolean
    eventType?: boolean
    status?: boolean
    spamStatus?: boolean
    timestamp?: boolean
    domainId?: boolean
    createdAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    token?: boolean
    messageId?: boolean
    to?: boolean
    from?: boolean
    subject?: boolean
    eventType?: boolean
    status?: boolean
    spamStatus?: boolean
    timestamp?: boolean
    domainId?: boolean
    createdAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    token?: boolean
    messageId?: boolean
    to?: boolean
    from?: boolean
    subject?: boolean
    eventType?: boolean
    status?: boolean
    spamStatus?: boolean
    timestamp?: boolean
    domainId?: boolean
    createdAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectScalar = {
    id?: boolean
    emailId?: boolean
    token?: boolean
    messageId?: boolean
    to?: boolean
    from?: boolean
    subject?: boolean
    eventType?: boolean
    status?: boolean
    spamStatus?: boolean
    timestamp?: boolean
    domainId?: boolean
    createdAt?: boolean
  }

  export type EmailEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "emailId" | "token" | "messageId" | "to" | "from" | "subject" | "eventType" | "status" | "spamStatus" | "timestamp" | "domainId" | "createdAt", ExtArgs["result"]["emailEvent"]>
  export type EmailEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }
  export type EmailEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }
  export type EmailEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }

  export type $EmailEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailEvent"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      emailId: number
      token: string
      messageId: string
      to: string
      from: string
      subject: string
      eventType: string
      status: string
      spamStatus: number
      timestamp: Date
      domainId: string
      createdAt: Date
    }, ExtArgs["result"]["emailEvent"]>
    composites: {}
  }

  type EmailEventGetPayload<S extends boolean | null | undefined | EmailEventDefaultArgs> = $Result.GetResult<Prisma.$EmailEventPayload, S>

  type EmailEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailEventCountAggregateInputType | true
    }

  export interface EmailEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailEvent'], meta: { name: 'EmailEvent' } }
    /**
     * Find zero or one EmailEvent that matches the filter.
     * @param {EmailEventFindUniqueArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailEventFindUniqueArgs>(args: SelectSubset<T, EmailEventFindUniqueArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailEventFindUniqueOrThrowArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailEventFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindFirstArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailEventFindFirstArgs>(args?: SelectSubset<T, EmailEventFindFirstArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindFirstOrThrowArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailEventFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailEvents
     * const emailEvents = await prisma.emailEvent.findMany()
     * 
     * // Get first 10 EmailEvents
     * const emailEvents = await prisma.emailEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailEventFindManyArgs>(args?: SelectSubset<T, EmailEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailEvent.
     * @param {EmailEventCreateArgs} args - Arguments to create a EmailEvent.
     * @example
     * // Create one EmailEvent
     * const EmailEvent = await prisma.emailEvent.create({
     *   data: {
     *     // ... data to create a EmailEvent
     *   }
     * })
     * 
     */
    create<T extends EmailEventCreateArgs>(args: SelectSubset<T, EmailEventCreateArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailEvents.
     * @param {EmailEventCreateManyArgs} args - Arguments to create many EmailEvents.
     * @example
     * // Create many EmailEvents
     * const emailEvent = await prisma.emailEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailEventCreateManyArgs>(args?: SelectSubset<T, EmailEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailEvents and returns the data saved in the database.
     * @param {EmailEventCreateManyAndReturnArgs} args - Arguments to create many EmailEvents.
     * @example
     * // Create many EmailEvents
     * const emailEvent = await prisma.emailEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailEvents and only return the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailEventCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailEvent.
     * @param {EmailEventDeleteArgs} args - Arguments to delete one EmailEvent.
     * @example
     * // Delete one EmailEvent
     * const EmailEvent = await prisma.emailEvent.delete({
     *   where: {
     *     // ... filter to delete one EmailEvent
     *   }
     * })
     * 
     */
    delete<T extends EmailEventDeleteArgs>(args: SelectSubset<T, EmailEventDeleteArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailEvent.
     * @param {EmailEventUpdateArgs} args - Arguments to update one EmailEvent.
     * @example
     * // Update one EmailEvent
     * const emailEvent = await prisma.emailEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailEventUpdateArgs>(args: SelectSubset<T, EmailEventUpdateArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailEvents.
     * @param {EmailEventDeleteManyArgs} args - Arguments to filter EmailEvents to delete.
     * @example
     * // Delete a few EmailEvents
     * const { count } = await prisma.emailEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailEventDeleteManyArgs>(args?: SelectSubset<T, EmailEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailEvents
     * const emailEvent = await prisma.emailEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailEventUpdateManyArgs>(args: SelectSubset<T, EmailEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailEvents and returns the data updated in the database.
     * @param {EmailEventUpdateManyAndReturnArgs} args - Arguments to update many EmailEvents.
     * @example
     * // Update many EmailEvents
     * const emailEvent = await prisma.emailEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailEvents and only return the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailEventUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailEvent.
     * @param {EmailEventUpsertArgs} args - Arguments to update or create a EmailEvent.
     * @example
     * // Update or create a EmailEvent
     * const emailEvent = await prisma.emailEvent.upsert({
     *   create: {
     *     // ... data to create a EmailEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailEvent we want to update
     *   }
     * })
     */
    upsert<T extends EmailEventUpsertArgs>(args: SelectSubset<T, EmailEventUpsertArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventCountArgs} args - Arguments to filter EmailEvents to count.
     * @example
     * // Count the number of EmailEvents
     * const count = await prisma.emailEvent.count({
     *   where: {
     *     // ... the filter for the EmailEvents we want to count
     *   }
     * })
    **/
    count<T extends EmailEventCountArgs>(
      args?: Subset<T, EmailEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailEventAggregateArgs>(args: Subset<T, EmailEventAggregateArgs>): Prisma.PrismaPromise<GetEmailEventAggregateType<T>>

    /**
     * Group by EmailEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailEventGroupByArgs['orderBy'] }
        : { orderBy?: EmailEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailEvent model
   */
  readonly fields: EmailEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends DomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainDefaultArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailEvent model
   */
  interface EmailEventFieldRefs {
    readonly id: FieldRef<"EmailEvent", 'String'>
    readonly emailId: FieldRef<"EmailEvent", 'Int'>
    readonly token: FieldRef<"EmailEvent", 'String'>
    readonly messageId: FieldRef<"EmailEvent", 'String'>
    readonly to: FieldRef<"EmailEvent", 'String'>
    readonly from: FieldRef<"EmailEvent", 'String'>
    readonly subject: FieldRef<"EmailEvent", 'String'>
    readonly eventType: FieldRef<"EmailEvent", 'String'>
    readonly status: FieldRef<"EmailEvent", 'String'>
    readonly spamStatus: FieldRef<"EmailEvent", 'Int'>
    readonly timestamp: FieldRef<"EmailEvent", 'DateTime'>
    readonly domainId: FieldRef<"EmailEvent", 'String'>
    readonly createdAt: FieldRef<"EmailEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailEvent findUnique
   */
  export type EmailEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent findUniqueOrThrow
   */
  export type EmailEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent findFirst
   */
  export type EmailEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailEvents.
     */
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent findFirstOrThrow
   */
  export type EmailEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailEvents.
     */
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent findMany
   */
  export type EmailEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvents to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent create
   */
  export type EmailEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailEvent.
     */
    data: XOR<EmailEventCreateInput, EmailEventUncheckedCreateInput>
  }

  /**
   * EmailEvent createMany
   */
  export type EmailEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailEvents.
     */
    data: EmailEventCreateManyInput | EmailEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailEvent createManyAndReturn
   */
  export type EmailEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * The data used to create many EmailEvents.
     */
    data: EmailEventCreateManyInput | EmailEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailEvent update
   */
  export type EmailEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailEvent.
     */
    data: XOR<EmailEventUpdateInput, EmailEventUncheckedUpdateInput>
    /**
     * Choose, which EmailEvent to update.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent updateMany
   */
  export type EmailEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailEvents.
     */
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyInput>
    /**
     * Filter which EmailEvents to update
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to update.
     */
    limit?: number
  }

  /**
   * EmailEvent updateManyAndReturn
   */
  export type EmailEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * The data used to update EmailEvents.
     */
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyInput>
    /**
     * Filter which EmailEvents to update
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailEvent upsert
   */
  export type EmailEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailEvent to update in case it exists.
     */
    where: EmailEventWhereUniqueInput
    /**
     * In case the EmailEvent found by the `where` argument doesn't exist, create a new EmailEvent with this data.
     */
    create: XOR<EmailEventCreateInput, EmailEventUncheckedCreateInput>
    /**
     * In case the EmailEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailEventUpdateInput, EmailEventUncheckedUpdateInput>
  }

  /**
   * EmailEvent delete
   */
  export type EmailEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter which EmailEvent to delete.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent deleteMany
   */
  export type EmailEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailEvents to delete
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to delete.
     */
    limit?: number
  }

  /**
   * EmailEvent without action
   */
  export type EmailEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
  }


  /**
   * Model EmailSummary
   */

  export type AggregateEmailSummary = {
    _count: EmailSummaryCountAggregateOutputType | null
    _avg: EmailSummaryAvgAggregateOutputType | null
    _sum: EmailSummarySumAggregateOutputType | null
    _min: EmailSummaryMinAggregateOutputType | null
    _max: EmailSummaryMaxAggregateOutputType | null
  }

  export type EmailSummaryAvgAggregateOutputType = {
    id: number | null
    totalSent: number | null
    totalDelivered: number | null
    totalFailed: number | null
    totalOpens: number | null
    totalClicks: number | null
    sentCount: number | null
    hardfailCount: number | null
    softfailCount: number | null
    bounceCount: number | null
    errorCount: number | null
    heldCount: number | null
    delayedCount: number | null
  }

  export type EmailSummarySumAggregateOutputType = {
    id: number | null
    totalSent: number | null
    totalDelivered: number | null
    totalFailed: number | null
    totalOpens: number | null
    totalClicks: number | null
    sentCount: number | null
    hardfailCount: number | null
    softfailCount: number | null
    bounceCount: number | null
    errorCount: number | null
    heldCount: number | null
    delayedCount: number | null
  }

  export type EmailSummaryMinAggregateOutputType = {
    id: number | null
    domainId: string | null
    totalSent: number | null
    totalDelivered: number | null
    totalFailed: number | null
    totalOpens: number | null
    totalClicks: number | null
    sentCount: number | null
    hardfailCount: number | null
    softfailCount: number | null
    bounceCount: number | null
    errorCount: number | null
    heldCount: number | null
    delayedCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailSummaryMaxAggregateOutputType = {
    id: number | null
    domainId: string | null
    totalSent: number | null
    totalDelivered: number | null
    totalFailed: number | null
    totalOpens: number | null
    totalClicks: number | null
    sentCount: number | null
    hardfailCount: number | null
    softfailCount: number | null
    bounceCount: number | null
    errorCount: number | null
    heldCount: number | null
    delayedCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailSummaryCountAggregateOutputType = {
    id: number
    domainId: number
    totalSent: number
    totalDelivered: number
    totalFailed: number
    totalOpens: number
    totalClicks: number
    sentCount: number
    hardfailCount: number
    softfailCount: number
    bounceCount: number
    errorCount: number
    heldCount: number
    delayedCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailSummaryAvgAggregateInputType = {
    id?: true
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
    totalOpens?: true
    totalClicks?: true
    sentCount?: true
    hardfailCount?: true
    softfailCount?: true
    bounceCount?: true
    errorCount?: true
    heldCount?: true
    delayedCount?: true
  }

  export type EmailSummarySumAggregateInputType = {
    id?: true
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
    totalOpens?: true
    totalClicks?: true
    sentCount?: true
    hardfailCount?: true
    softfailCount?: true
    bounceCount?: true
    errorCount?: true
    heldCount?: true
    delayedCount?: true
  }

  export type EmailSummaryMinAggregateInputType = {
    id?: true
    domainId?: true
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
    totalOpens?: true
    totalClicks?: true
    sentCount?: true
    hardfailCount?: true
    softfailCount?: true
    bounceCount?: true
    errorCount?: true
    heldCount?: true
    delayedCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailSummaryMaxAggregateInputType = {
    id?: true
    domainId?: true
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
    totalOpens?: true
    totalClicks?: true
    sentCount?: true
    hardfailCount?: true
    softfailCount?: true
    bounceCount?: true
    errorCount?: true
    heldCount?: true
    delayedCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailSummaryCountAggregateInputType = {
    id?: true
    domainId?: true
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
    totalOpens?: true
    totalClicks?: true
    sentCount?: true
    hardfailCount?: true
    softfailCount?: true
    bounceCount?: true
    errorCount?: true
    heldCount?: true
    delayedCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailSummaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailSummary to aggregate.
     */
    where?: EmailSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSummaries to fetch.
     */
    orderBy?: EmailSummaryOrderByWithRelationInput | EmailSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailSummaries
    **/
    _count?: true | EmailSummaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailSummaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailSummarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailSummaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailSummaryMaxAggregateInputType
  }

  export type GetEmailSummaryAggregateType<T extends EmailSummaryAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailSummary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailSummary[P]>
      : GetScalarType<T[P], AggregateEmailSummary[P]>
  }




  export type EmailSummaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailSummaryWhereInput
    orderBy?: EmailSummaryOrderByWithAggregationInput | EmailSummaryOrderByWithAggregationInput[]
    by: EmailSummaryScalarFieldEnum[] | EmailSummaryScalarFieldEnum
    having?: EmailSummaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailSummaryCountAggregateInputType | true
    _avg?: EmailSummaryAvgAggregateInputType
    _sum?: EmailSummarySumAggregateInputType
    _min?: EmailSummaryMinAggregateInputType
    _max?: EmailSummaryMaxAggregateInputType
  }

  export type EmailSummaryGroupByOutputType = {
    id: number
    domainId: string
    totalSent: number
    totalDelivered: number
    totalFailed: number
    totalOpens: number
    totalClicks: number
    sentCount: number
    hardfailCount: number
    softfailCount: number
    bounceCount: number
    errorCount: number
    heldCount: number
    delayedCount: number
    createdAt: Date
    updatedAt: Date
    _count: EmailSummaryCountAggregateOutputType | null
    _avg: EmailSummaryAvgAggregateOutputType | null
    _sum: EmailSummarySumAggregateOutputType | null
    _min: EmailSummaryMinAggregateOutputType | null
    _max: EmailSummaryMaxAggregateOutputType | null
  }

  type GetEmailSummaryGroupByPayload<T extends EmailSummaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailSummaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailSummaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailSummaryGroupByOutputType[P]>
            : GetScalarType<T[P], EmailSummaryGroupByOutputType[P]>
        }
      >
    >


  export type EmailSummarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    totalSent?: boolean
    totalDelivered?: boolean
    totalFailed?: boolean
    totalOpens?: boolean
    totalClicks?: boolean
    sentCount?: boolean
    hardfailCount?: boolean
    softfailCount?: boolean
    bounceCount?: boolean
    errorCount?: boolean
    heldCount?: boolean
    delayedCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailSummary"]>

  export type EmailSummarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    totalSent?: boolean
    totalDelivered?: boolean
    totalFailed?: boolean
    totalOpens?: boolean
    totalClicks?: boolean
    sentCount?: boolean
    hardfailCount?: boolean
    softfailCount?: boolean
    bounceCount?: boolean
    errorCount?: boolean
    heldCount?: boolean
    delayedCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailSummary"]>

  export type EmailSummarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    totalSent?: boolean
    totalDelivered?: boolean
    totalFailed?: boolean
    totalOpens?: boolean
    totalClicks?: boolean
    sentCount?: boolean
    hardfailCount?: boolean
    softfailCount?: boolean
    bounceCount?: boolean
    errorCount?: boolean
    heldCount?: boolean
    delayedCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailSummary"]>

  export type EmailSummarySelectScalar = {
    id?: boolean
    domainId?: boolean
    totalSent?: boolean
    totalDelivered?: boolean
    totalFailed?: boolean
    totalOpens?: boolean
    totalClicks?: boolean
    sentCount?: boolean
    hardfailCount?: boolean
    softfailCount?: boolean
    bounceCount?: boolean
    errorCount?: boolean
    heldCount?: boolean
    delayedCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailSummaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domainId" | "totalSent" | "totalDelivered" | "totalFailed" | "totalOpens" | "totalClicks" | "sentCount" | "hardfailCount" | "softfailCount" | "bounceCount" | "errorCount" | "heldCount" | "delayedCount" | "createdAt" | "updatedAt", ExtArgs["result"]["emailSummary"]>
  export type EmailSummaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }
  export type EmailSummaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }
  export type EmailSummaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }

  export type $EmailSummaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailSummary"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      domainId: string
      totalSent: number
      totalDelivered: number
      totalFailed: number
      totalOpens: number
      totalClicks: number
      sentCount: number
      hardfailCount: number
      softfailCount: number
      bounceCount: number
      errorCount: number
      heldCount: number
      delayedCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["emailSummary"]>
    composites: {}
  }

  type EmailSummaryGetPayload<S extends boolean | null | undefined | EmailSummaryDefaultArgs> = $Result.GetResult<Prisma.$EmailSummaryPayload, S>

  type EmailSummaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailSummaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailSummaryCountAggregateInputType | true
    }

  export interface EmailSummaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailSummary'], meta: { name: 'EmailSummary' } }
    /**
     * Find zero or one EmailSummary that matches the filter.
     * @param {EmailSummaryFindUniqueArgs} args - Arguments to find a EmailSummary
     * @example
     * // Get one EmailSummary
     * const emailSummary = await prisma.emailSummary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailSummaryFindUniqueArgs>(args: SelectSubset<T, EmailSummaryFindUniqueArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailSummary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailSummaryFindUniqueOrThrowArgs} args - Arguments to find a EmailSummary
     * @example
     * // Get one EmailSummary
     * const emailSummary = await prisma.emailSummary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailSummaryFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailSummaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailSummary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSummaryFindFirstArgs} args - Arguments to find a EmailSummary
     * @example
     * // Get one EmailSummary
     * const emailSummary = await prisma.emailSummary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailSummaryFindFirstArgs>(args?: SelectSubset<T, EmailSummaryFindFirstArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailSummary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSummaryFindFirstOrThrowArgs} args - Arguments to find a EmailSummary
     * @example
     * // Get one EmailSummary
     * const emailSummary = await prisma.emailSummary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailSummaryFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailSummaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailSummaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSummaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailSummaries
     * const emailSummaries = await prisma.emailSummary.findMany()
     * 
     * // Get first 10 EmailSummaries
     * const emailSummaries = await prisma.emailSummary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailSummaryWithIdOnly = await prisma.emailSummary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailSummaryFindManyArgs>(args?: SelectSubset<T, EmailSummaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailSummary.
     * @param {EmailSummaryCreateArgs} args - Arguments to create a EmailSummary.
     * @example
     * // Create one EmailSummary
     * const EmailSummary = await prisma.emailSummary.create({
     *   data: {
     *     // ... data to create a EmailSummary
     *   }
     * })
     * 
     */
    create<T extends EmailSummaryCreateArgs>(args: SelectSubset<T, EmailSummaryCreateArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailSummaries.
     * @param {EmailSummaryCreateManyArgs} args - Arguments to create many EmailSummaries.
     * @example
     * // Create many EmailSummaries
     * const emailSummary = await prisma.emailSummary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailSummaryCreateManyArgs>(args?: SelectSubset<T, EmailSummaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailSummaries and returns the data saved in the database.
     * @param {EmailSummaryCreateManyAndReturnArgs} args - Arguments to create many EmailSummaries.
     * @example
     * // Create many EmailSummaries
     * const emailSummary = await prisma.emailSummary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailSummaries and only return the `id`
     * const emailSummaryWithIdOnly = await prisma.emailSummary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailSummaryCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailSummaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailSummary.
     * @param {EmailSummaryDeleteArgs} args - Arguments to delete one EmailSummary.
     * @example
     * // Delete one EmailSummary
     * const EmailSummary = await prisma.emailSummary.delete({
     *   where: {
     *     // ... filter to delete one EmailSummary
     *   }
     * })
     * 
     */
    delete<T extends EmailSummaryDeleteArgs>(args: SelectSubset<T, EmailSummaryDeleteArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailSummary.
     * @param {EmailSummaryUpdateArgs} args - Arguments to update one EmailSummary.
     * @example
     * // Update one EmailSummary
     * const emailSummary = await prisma.emailSummary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailSummaryUpdateArgs>(args: SelectSubset<T, EmailSummaryUpdateArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailSummaries.
     * @param {EmailSummaryDeleteManyArgs} args - Arguments to filter EmailSummaries to delete.
     * @example
     * // Delete a few EmailSummaries
     * const { count } = await prisma.emailSummary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailSummaryDeleteManyArgs>(args?: SelectSubset<T, EmailSummaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSummaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailSummaries
     * const emailSummary = await prisma.emailSummary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailSummaryUpdateManyArgs>(args: SelectSubset<T, EmailSummaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailSummaries and returns the data updated in the database.
     * @param {EmailSummaryUpdateManyAndReturnArgs} args - Arguments to update many EmailSummaries.
     * @example
     * // Update many EmailSummaries
     * const emailSummary = await prisma.emailSummary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailSummaries and only return the `id`
     * const emailSummaryWithIdOnly = await prisma.emailSummary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailSummaryUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailSummaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailSummary.
     * @param {EmailSummaryUpsertArgs} args - Arguments to update or create a EmailSummary.
     * @example
     * // Update or create a EmailSummary
     * const emailSummary = await prisma.emailSummary.upsert({
     *   create: {
     *     // ... data to create a EmailSummary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailSummary we want to update
     *   }
     * })
     */
    upsert<T extends EmailSummaryUpsertArgs>(args: SelectSubset<T, EmailSummaryUpsertArgs<ExtArgs>>): Prisma__EmailSummaryClient<$Result.GetResult<Prisma.$EmailSummaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSummaryCountArgs} args - Arguments to filter EmailSummaries to count.
     * @example
     * // Count the number of EmailSummaries
     * const count = await prisma.emailSummary.count({
     *   where: {
     *     // ... the filter for the EmailSummaries we want to count
     *   }
     * })
    **/
    count<T extends EmailSummaryCountArgs>(
      args?: Subset<T, EmailSummaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailSummaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSummaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailSummaryAggregateArgs>(args: Subset<T, EmailSummaryAggregateArgs>): Prisma.PrismaPromise<GetEmailSummaryAggregateType<T>>

    /**
     * Group by EmailSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailSummaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailSummaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailSummaryGroupByArgs['orderBy'] }
        : { orderBy?: EmailSummaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailSummaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailSummaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailSummary model
   */
  readonly fields: EmailSummaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailSummary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailSummaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends DomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainDefaultArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailSummary model
   */
  interface EmailSummaryFieldRefs {
    readonly id: FieldRef<"EmailSummary", 'Int'>
    readonly domainId: FieldRef<"EmailSummary", 'String'>
    readonly totalSent: FieldRef<"EmailSummary", 'Int'>
    readonly totalDelivered: FieldRef<"EmailSummary", 'Int'>
    readonly totalFailed: FieldRef<"EmailSummary", 'Int'>
    readonly totalOpens: FieldRef<"EmailSummary", 'Int'>
    readonly totalClicks: FieldRef<"EmailSummary", 'Int'>
    readonly sentCount: FieldRef<"EmailSummary", 'Int'>
    readonly hardfailCount: FieldRef<"EmailSummary", 'Int'>
    readonly softfailCount: FieldRef<"EmailSummary", 'Int'>
    readonly bounceCount: FieldRef<"EmailSummary", 'Int'>
    readonly errorCount: FieldRef<"EmailSummary", 'Int'>
    readonly heldCount: FieldRef<"EmailSummary", 'Int'>
    readonly delayedCount: FieldRef<"EmailSummary", 'Int'>
    readonly createdAt: FieldRef<"EmailSummary", 'DateTime'>
    readonly updatedAt: FieldRef<"EmailSummary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailSummary findUnique
   */
  export type EmailSummaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * Filter, which EmailSummary to fetch.
     */
    where: EmailSummaryWhereUniqueInput
  }

  /**
   * EmailSummary findUniqueOrThrow
   */
  export type EmailSummaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * Filter, which EmailSummary to fetch.
     */
    where: EmailSummaryWhereUniqueInput
  }

  /**
   * EmailSummary findFirst
   */
  export type EmailSummaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * Filter, which EmailSummary to fetch.
     */
    where?: EmailSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSummaries to fetch.
     */
    orderBy?: EmailSummaryOrderByWithRelationInput | EmailSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailSummaries.
     */
    cursor?: EmailSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailSummaries.
     */
    distinct?: EmailSummaryScalarFieldEnum | EmailSummaryScalarFieldEnum[]
  }

  /**
   * EmailSummary findFirstOrThrow
   */
  export type EmailSummaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * Filter, which EmailSummary to fetch.
     */
    where?: EmailSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSummaries to fetch.
     */
    orderBy?: EmailSummaryOrderByWithRelationInput | EmailSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailSummaries.
     */
    cursor?: EmailSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailSummaries.
     */
    distinct?: EmailSummaryScalarFieldEnum | EmailSummaryScalarFieldEnum[]
  }

  /**
   * EmailSummary findMany
   */
  export type EmailSummaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * Filter, which EmailSummaries to fetch.
     */
    where?: EmailSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailSummaries to fetch.
     */
    orderBy?: EmailSummaryOrderByWithRelationInput | EmailSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailSummaries.
     */
    cursor?: EmailSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailSummaries.
     */
    skip?: number
    distinct?: EmailSummaryScalarFieldEnum | EmailSummaryScalarFieldEnum[]
  }

  /**
   * EmailSummary create
   */
  export type EmailSummaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailSummary.
     */
    data: XOR<EmailSummaryCreateInput, EmailSummaryUncheckedCreateInput>
  }

  /**
   * EmailSummary createMany
   */
  export type EmailSummaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailSummaries.
     */
    data: EmailSummaryCreateManyInput | EmailSummaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailSummary createManyAndReturn
   */
  export type EmailSummaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * The data used to create many EmailSummaries.
     */
    data: EmailSummaryCreateManyInput | EmailSummaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailSummary update
   */
  export type EmailSummaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailSummary.
     */
    data: XOR<EmailSummaryUpdateInput, EmailSummaryUncheckedUpdateInput>
    /**
     * Choose, which EmailSummary to update.
     */
    where: EmailSummaryWhereUniqueInput
  }

  /**
   * EmailSummary updateMany
   */
  export type EmailSummaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailSummaries.
     */
    data: XOR<EmailSummaryUpdateManyMutationInput, EmailSummaryUncheckedUpdateManyInput>
    /**
     * Filter which EmailSummaries to update
     */
    where?: EmailSummaryWhereInput
    /**
     * Limit how many EmailSummaries to update.
     */
    limit?: number
  }

  /**
   * EmailSummary updateManyAndReturn
   */
  export type EmailSummaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * The data used to update EmailSummaries.
     */
    data: XOR<EmailSummaryUpdateManyMutationInput, EmailSummaryUncheckedUpdateManyInput>
    /**
     * Filter which EmailSummaries to update
     */
    where?: EmailSummaryWhereInput
    /**
     * Limit how many EmailSummaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailSummary upsert
   */
  export type EmailSummaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailSummary to update in case it exists.
     */
    where: EmailSummaryWhereUniqueInput
    /**
     * In case the EmailSummary found by the `where` argument doesn't exist, create a new EmailSummary with this data.
     */
    create: XOR<EmailSummaryCreateInput, EmailSummaryUncheckedCreateInput>
    /**
     * In case the EmailSummary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailSummaryUpdateInput, EmailSummaryUncheckedUpdateInput>
  }

  /**
   * EmailSummary delete
   */
  export type EmailSummaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
    /**
     * Filter which EmailSummary to delete.
     */
    where: EmailSummaryWhereUniqueInput
  }

  /**
   * EmailSummary deleteMany
   */
  export type EmailSummaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailSummaries to delete
     */
    where?: EmailSummaryWhereInput
    /**
     * Limit how many EmailSummaries to delete.
     */
    limit?: number
  }

  /**
   * EmailSummary without action
   */
  export type EmailSummaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailSummary
     */
    select?: EmailSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailSummary
     */
    omit?: EmailSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailSummaryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    kindeId: 'kindeId',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DomainScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DomainScalarFieldEnum = (typeof DomainScalarFieldEnum)[keyof typeof DomainScalarFieldEnum]


  export const EmailEventScalarFieldEnum: {
    id: 'id',
    emailId: 'emailId',
    token: 'token',
    messageId: 'messageId',
    to: 'to',
    from: 'from',
    subject: 'subject',
    eventType: 'eventType',
    status: 'status',
    spamStatus: 'spamStatus',
    timestamp: 'timestamp',
    domainId: 'domainId',
    createdAt: 'createdAt'
  };

  export type EmailEventScalarFieldEnum = (typeof EmailEventScalarFieldEnum)[keyof typeof EmailEventScalarFieldEnum]


  export const EmailSummaryScalarFieldEnum: {
    id: 'id',
    domainId: 'domainId',
    totalSent: 'totalSent',
    totalDelivered: 'totalDelivered',
    totalFailed: 'totalFailed',
    totalOpens: 'totalOpens',
    totalClicks: 'totalClicks',
    sentCount: 'sentCount',
    hardfailCount: 'hardfailCount',
    softfailCount: 'softfailCount',
    bounceCount: 'bounceCount',
    errorCount: 'errorCount',
    heldCount: 'heldCount',
    delayedCount: 'delayedCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailSummaryScalarFieldEnum = (typeof EmailSummaryScalarFieldEnum)[keyof typeof EmailSummaryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    kindeId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    domains?: DomainListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domains?: DomainOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kindeId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    domains?: DomainListRelationFilter
  }, "id" | "kindeId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    kindeId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DomainWhereInput = {
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    id?: StringFilter<"Domain"> | string
    name?: StringFilter<"Domain"> | string
    userId?: StringNullableFilter<"Domain"> | string | null
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    updatedAt?: DateTimeFilter<"Domain"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    emails?: EmailEventListRelationFilter
    summary?: XOR<EmailSummaryNullableScalarRelationFilter, EmailSummaryWhereInput> | null
  }

  export type DomainOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    emails?: EmailEventOrderByRelationAggregateInput
    summary?: EmailSummaryOrderByWithRelationInput
  }

  export type DomainWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    userId?: StringNullableFilter<"Domain"> | string | null
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    updatedAt?: DateTimeFilter<"Domain"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    emails?: EmailEventListRelationFilter
    summary?: XOR<EmailSummaryNullableScalarRelationFilter, EmailSummaryWhereInput> | null
  }, "id" | "name">

  export type DomainOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DomainCountOrderByAggregateInput
    _max?: DomainMaxOrderByAggregateInput
    _min?: DomainMinOrderByAggregateInput
  }

  export type DomainScalarWhereWithAggregatesInput = {
    AND?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    OR?: DomainScalarWhereWithAggregatesInput[]
    NOT?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Domain"> | string
    name?: StringWithAggregatesFilter<"Domain"> | string
    userId?: StringNullableWithAggregatesFilter<"Domain"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Domain"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Domain"> | Date | string
  }

  export type EmailEventWhereInput = {
    AND?: EmailEventWhereInput | EmailEventWhereInput[]
    OR?: EmailEventWhereInput[]
    NOT?: EmailEventWhereInput | EmailEventWhereInput[]
    id?: StringFilter<"EmailEvent"> | string
    emailId?: IntFilter<"EmailEvent"> | number
    token?: StringFilter<"EmailEvent"> | string
    messageId?: StringFilter<"EmailEvent"> | string
    to?: StringFilter<"EmailEvent"> | string
    from?: StringFilter<"EmailEvent"> | string
    subject?: StringFilter<"EmailEvent"> | string
    eventType?: StringFilter<"EmailEvent"> | string
    status?: StringFilter<"EmailEvent"> | string
    spamStatus?: IntFilter<"EmailEvent"> | number
    timestamp?: DateTimeFilter<"EmailEvent"> | Date | string
    domainId?: StringFilter<"EmailEvent"> | string
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
    domain?: XOR<DomainScalarRelationFilter, DomainWhereInput>
  }

  export type EmailEventOrderByWithRelationInput = {
    id?: SortOrder
    emailId?: SortOrder
    token?: SortOrder
    messageId?: SortOrder
    to?: SortOrder
    from?: SortOrder
    subject?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    spamStatus?: SortOrder
    timestamp?: SortOrder
    domainId?: SortOrder
    createdAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
  }

  export type EmailEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailEventWhereInput | EmailEventWhereInput[]
    OR?: EmailEventWhereInput[]
    NOT?: EmailEventWhereInput | EmailEventWhereInput[]
    emailId?: IntFilter<"EmailEvent"> | number
    token?: StringFilter<"EmailEvent"> | string
    messageId?: StringFilter<"EmailEvent"> | string
    to?: StringFilter<"EmailEvent"> | string
    from?: StringFilter<"EmailEvent"> | string
    subject?: StringFilter<"EmailEvent"> | string
    eventType?: StringFilter<"EmailEvent"> | string
    status?: StringFilter<"EmailEvent"> | string
    spamStatus?: IntFilter<"EmailEvent"> | number
    timestamp?: DateTimeFilter<"EmailEvent"> | Date | string
    domainId?: StringFilter<"EmailEvent"> | string
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
    domain?: XOR<DomainScalarRelationFilter, DomainWhereInput>
  }, "id">

  export type EmailEventOrderByWithAggregationInput = {
    id?: SortOrder
    emailId?: SortOrder
    token?: SortOrder
    messageId?: SortOrder
    to?: SortOrder
    from?: SortOrder
    subject?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    spamStatus?: SortOrder
    timestamp?: SortOrder
    domainId?: SortOrder
    createdAt?: SortOrder
    _count?: EmailEventCountOrderByAggregateInput
    _avg?: EmailEventAvgOrderByAggregateInput
    _max?: EmailEventMaxOrderByAggregateInput
    _min?: EmailEventMinOrderByAggregateInput
    _sum?: EmailEventSumOrderByAggregateInput
  }

  export type EmailEventScalarWhereWithAggregatesInput = {
    AND?: EmailEventScalarWhereWithAggregatesInput | EmailEventScalarWhereWithAggregatesInput[]
    OR?: EmailEventScalarWhereWithAggregatesInput[]
    NOT?: EmailEventScalarWhereWithAggregatesInput | EmailEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailEvent"> | string
    emailId?: IntWithAggregatesFilter<"EmailEvent"> | number
    token?: StringWithAggregatesFilter<"EmailEvent"> | string
    messageId?: StringWithAggregatesFilter<"EmailEvent"> | string
    to?: StringWithAggregatesFilter<"EmailEvent"> | string
    from?: StringWithAggregatesFilter<"EmailEvent"> | string
    subject?: StringWithAggregatesFilter<"EmailEvent"> | string
    eventType?: StringWithAggregatesFilter<"EmailEvent"> | string
    status?: StringWithAggregatesFilter<"EmailEvent"> | string
    spamStatus?: IntWithAggregatesFilter<"EmailEvent"> | number
    timestamp?: DateTimeWithAggregatesFilter<"EmailEvent"> | Date | string
    domainId?: StringWithAggregatesFilter<"EmailEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmailEvent"> | Date | string
  }

  export type EmailSummaryWhereInput = {
    AND?: EmailSummaryWhereInput | EmailSummaryWhereInput[]
    OR?: EmailSummaryWhereInput[]
    NOT?: EmailSummaryWhereInput | EmailSummaryWhereInput[]
    id?: IntFilter<"EmailSummary"> | number
    domainId?: StringFilter<"EmailSummary"> | string
    totalSent?: IntFilter<"EmailSummary"> | number
    totalDelivered?: IntFilter<"EmailSummary"> | number
    totalFailed?: IntFilter<"EmailSummary"> | number
    totalOpens?: IntFilter<"EmailSummary"> | number
    totalClicks?: IntFilter<"EmailSummary"> | number
    sentCount?: IntFilter<"EmailSummary"> | number
    hardfailCount?: IntFilter<"EmailSummary"> | number
    softfailCount?: IntFilter<"EmailSummary"> | number
    bounceCount?: IntFilter<"EmailSummary"> | number
    errorCount?: IntFilter<"EmailSummary"> | number
    heldCount?: IntFilter<"EmailSummary"> | number
    delayedCount?: IntFilter<"EmailSummary"> | number
    createdAt?: DateTimeFilter<"EmailSummary"> | Date | string
    updatedAt?: DateTimeFilter<"EmailSummary"> | Date | string
    domain?: XOR<DomainScalarRelationFilter, DomainWhereInput>
  }

  export type EmailSummaryOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    totalOpens?: SortOrder
    totalClicks?: SortOrder
    sentCount?: SortOrder
    hardfailCount?: SortOrder
    softfailCount?: SortOrder
    bounceCount?: SortOrder
    errorCount?: SortOrder
    heldCount?: SortOrder
    delayedCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
  }

  export type EmailSummaryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    domainId?: string
    AND?: EmailSummaryWhereInput | EmailSummaryWhereInput[]
    OR?: EmailSummaryWhereInput[]
    NOT?: EmailSummaryWhereInput | EmailSummaryWhereInput[]
    totalSent?: IntFilter<"EmailSummary"> | number
    totalDelivered?: IntFilter<"EmailSummary"> | number
    totalFailed?: IntFilter<"EmailSummary"> | number
    totalOpens?: IntFilter<"EmailSummary"> | number
    totalClicks?: IntFilter<"EmailSummary"> | number
    sentCount?: IntFilter<"EmailSummary"> | number
    hardfailCount?: IntFilter<"EmailSummary"> | number
    softfailCount?: IntFilter<"EmailSummary"> | number
    bounceCount?: IntFilter<"EmailSummary"> | number
    errorCount?: IntFilter<"EmailSummary"> | number
    heldCount?: IntFilter<"EmailSummary"> | number
    delayedCount?: IntFilter<"EmailSummary"> | number
    createdAt?: DateTimeFilter<"EmailSummary"> | Date | string
    updatedAt?: DateTimeFilter<"EmailSummary"> | Date | string
    domain?: XOR<DomainScalarRelationFilter, DomainWhereInput>
  }, "id" | "domainId">

  export type EmailSummaryOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    totalOpens?: SortOrder
    totalClicks?: SortOrder
    sentCount?: SortOrder
    hardfailCount?: SortOrder
    softfailCount?: SortOrder
    bounceCount?: SortOrder
    errorCount?: SortOrder
    heldCount?: SortOrder
    delayedCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailSummaryCountOrderByAggregateInput
    _avg?: EmailSummaryAvgOrderByAggregateInput
    _max?: EmailSummaryMaxOrderByAggregateInput
    _min?: EmailSummaryMinOrderByAggregateInput
    _sum?: EmailSummarySumOrderByAggregateInput
  }

  export type EmailSummaryScalarWhereWithAggregatesInput = {
    AND?: EmailSummaryScalarWhereWithAggregatesInput | EmailSummaryScalarWhereWithAggregatesInput[]
    OR?: EmailSummaryScalarWhereWithAggregatesInput[]
    NOT?: EmailSummaryScalarWhereWithAggregatesInput | EmailSummaryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EmailSummary"> | number
    domainId?: StringWithAggregatesFilter<"EmailSummary"> | string
    totalSent?: IntWithAggregatesFilter<"EmailSummary"> | number
    totalDelivered?: IntWithAggregatesFilter<"EmailSummary"> | number
    totalFailed?: IntWithAggregatesFilter<"EmailSummary"> | number
    totalOpens?: IntWithAggregatesFilter<"EmailSummary"> | number
    totalClicks?: IntWithAggregatesFilter<"EmailSummary"> | number
    sentCount?: IntWithAggregatesFilter<"EmailSummary"> | number
    hardfailCount?: IntWithAggregatesFilter<"EmailSummary"> | number
    softfailCount?: IntWithAggregatesFilter<"EmailSummary"> | number
    bounceCount?: IntWithAggregatesFilter<"EmailSummary"> | number
    errorCount?: IntWithAggregatesFilter<"EmailSummary"> | number
    heldCount?: IntWithAggregatesFilter<"EmailSummary"> | number
    delayedCount?: IntWithAggregatesFilter<"EmailSummary"> | number
    createdAt?: DateTimeWithAggregatesFilter<"EmailSummary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailSummary"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    kindeId: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domains?: DomainCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    kindeId: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domains?: DomainUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domains?: DomainUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domains?: DomainUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    kindeId: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutDomainsInput
    emails?: EmailEventCreateNestedManyWithoutDomainInput
    summary?: EmailSummaryCreateNestedOneWithoutDomainInput
  }

  export type DomainUncheckedCreateInput = {
    id?: string
    name: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailEventUncheckedCreateNestedManyWithoutDomainInput
    summary?: EmailSummaryUncheckedCreateNestedOneWithoutDomainInput
  }

  export type DomainUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDomainsNestedInput
    emails?: EmailEventUpdateManyWithoutDomainNestedInput
    summary?: EmailSummaryUpdateOneWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailEventUncheckedUpdateManyWithoutDomainNestedInput
    summary?: EmailSummaryUncheckedUpdateOneWithoutDomainNestedInput
  }

  export type DomainCreateManyInput = {
    id?: string
    name: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventCreateInput = {
    id?: string
    emailId: number
    token: string
    messageId: string
    to: string
    from: string
    subject: string
    eventType: string
    status: string
    spamStatus: number
    timestamp: Date | string
    createdAt?: Date | string
    domain: DomainCreateNestedOneWithoutEmailsInput
  }

  export type EmailEventUncheckedCreateInput = {
    id?: string
    emailId: number
    token: string
    messageId: string
    to: string
    from: string
    subject: string
    eventType: string
    status: string
    spamStatus: number
    timestamp: Date | string
    domainId: string
    createdAt?: Date | string
  }

  export type EmailEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    spamStatus?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type EmailEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    spamStatus?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    domainId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventCreateManyInput = {
    id?: string
    emailId: number
    token: string
    messageId: string
    to: string
    from: string
    subject: string
    eventType: string
    status: string
    spamStatus: number
    timestamp: Date | string
    domainId: string
    createdAt?: Date | string
  }

  export type EmailEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    spamStatus?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    spamStatus?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    domainId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSummaryCreateInput = {
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    totalOpens?: number
    totalClicks?: number
    sentCount?: number
    hardfailCount?: number
    softfailCount?: number
    bounceCount?: number
    errorCount?: number
    heldCount?: number
    delayedCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutSummaryInput
  }

  export type EmailSummaryUncheckedCreateInput = {
    id?: number
    domainId: string
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    totalOpens?: number
    totalClicks?: number
    sentCount?: number
    hardfailCount?: number
    softfailCount?: number
    bounceCount?: number
    errorCount?: number
    heldCount?: number
    delayedCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailSummaryUpdateInput = {
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    totalOpens?: IntFieldUpdateOperationsInput | number
    totalClicks?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    hardfailCount?: IntFieldUpdateOperationsInput | number
    softfailCount?: IntFieldUpdateOperationsInput | number
    bounceCount?: IntFieldUpdateOperationsInput | number
    errorCount?: IntFieldUpdateOperationsInput | number
    heldCount?: IntFieldUpdateOperationsInput | number
    delayedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutSummaryNestedInput
  }

  export type EmailSummaryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: StringFieldUpdateOperationsInput | string
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    totalOpens?: IntFieldUpdateOperationsInput | number
    totalClicks?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    hardfailCount?: IntFieldUpdateOperationsInput | number
    softfailCount?: IntFieldUpdateOperationsInput | number
    bounceCount?: IntFieldUpdateOperationsInput | number
    errorCount?: IntFieldUpdateOperationsInput | number
    heldCount?: IntFieldUpdateOperationsInput | number
    delayedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSummaryCreateManyInput = {
    id?: number
    domainId: string
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    totalOpens?: number
    totalClicks?: number
    sentCount?: number
    hardfailCount?: number
    softfailCount?: number
    bounceCount?: number
    errorCount?: number
    heldCount?: number
    delayedCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailSummaryUpdateManyMutationInput = {
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    totalOpens?: IntFieldUpdateOperationsInput | number
    totalClicks?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    hardfailCount?: IntFieldUpdateOperationsInput | number
    softfailCount?: IntFieldUpdateOperationsInput | number
    bounceCount?: IntFieldUpdateOperationsInput | number
    errorCount?: IntFieldUpdateOperationsInput | number
    heldCount?: IntFieldUpdateOperationsInput | number
    delayedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSummaryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: StringFieldUpdateOperationsInput | string
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    totalOpens?: IntFieldUpdateOperationsInput | number
    totalClicks?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    hardfailCount?: IntFieldUpdateOperationsInput | number
    softfailCount?: IntFieldUpdateOperationsInput | number
    bounceCount?: IntFieldUpdateOperationsInput | number
    errorCount?: IntFieldUpdateOperationsInput | number
    heldCount?: IntFieldUpdateOperationsInput | number
    delayedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DomainListRelationFilter = {
    every?: DomainWhereInput
    some?: DomainWhereInput
    none?: DomainWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DomainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type EmailEventListRelationFilter = {
    every?: EmailEventWhereInput
    some?: EmailEventWhereInput
    none?: EmailEventWhereInput
  }

  export type EmailSummaryNullableScalarRelationFilter = {
    is?: EmailSummaryWhereInput | null
    isNot?: EmailSummaryWhereInput | null
  }

  export type EmailEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DomainScalarRelationFilter = {
    is?: DomainWhereInput
    isNot?: DomainWhereInput
  }

  export type EmailEventCountOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    token?: SortOrder
    messageId?: SortOrder
    to?: SortOrder
    from?: SortOrder
    subject?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    spamStatus?: SortOrder
    timestamp?: SortOrder
    domainId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailEventAvgOrderByAggregateInput = {
    emailId?: SortOrder
    spamStatus?: SortOrder
  }

  export type EmailEventMaxOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    token?: SortOrder
    messageId?: SortOrder
    to?: SortOrder
    from?: SortOrder
    subject?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    spamStatus?: SortOrder
    timestamp?: SortOrder
    domainId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailEventMinOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    token?: SortOrder
    messageId?: SortOrder
    to?: SortOrder
    from?: SortOrder
    subject?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    spamStatus?: SortOrder
    timestamp?: SortOrder
    domainId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailEventSumOrderByAggregateInput = {
    emailId?: SortOrder
    spamStatus?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EmailSummaryCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    totalOpens?: SortOrder
    totalClicks?: SortOrder
    sentCount?: SortOrder
    hardfailCount?: SortOrder
    softfailCount?: SortOrder
    bounceCount?: SortOrder
    errorCount?: SortOrder
    heldCount?: SortOrder
    delayedCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailSummaryAvgOrderByAggregateInput = {
    id?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    totalOpens?: SortOrder
    totalClicks?: SortOrder
    sentCount?: SortOrder
    hardfailCount?: SortOrder
    softfailCount?: SortOrder
    bounceCount?: SortOrder
    errorCount?: SortOrder
    heldCount?: SortOrder
    delayedCount?: SortOrder
  }

  export type EmailSummaryMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    totalOpens?: SortOrder
    totalClicks?: SortOrder
    sentCount?: SortOrder
    hardfailCount?: SortOrder
    softfailCount?: SortOrder
    bounceCount?: SortOrder
    errorCount?: SortOrder
    heldCount?: SortOrder
    delayedCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailSummaryMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    totalOpens?: SortOrder
    totalClicks?: SortOrder
    sentCount?: SortOrder
    hardfailCount?: SortOrder
    softfailCount?: SortOrder
    bounceCount?: SortOrder
    errorCount?: SortOrder
    heldCount?: SortOrder
    delayedCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailSummarySumOrderByAggregateInput = {
    id?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    totalOpens?: SortOrder
    totalClicks?: SortOrder
    sentCount?: SortOrder
    hardfailCount?: SortOrder
    softfailCount?: SortOrder
    bounceCount?: SortOrder
    errorCount?: SortOrder
    heldCount?: SortOrder
    delayedCount?: SortOrder
  }

  export type DomainCreateNestedManyWithoutUserInput = {
    create?: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput> | DomainCreateWithoutUserInput[] | DomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutUserInput | DomainCreateOrConnectWithoutUserInput[]
    createMany?: DomainCreateManyUserInputEnvelope
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
  }

  export type DomainUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput> | DomainCreateWithoutUserInput[] | DomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutUserInput | DomainCreateOrConnectWithoutUserInput[]
    createMany?: DomainCreateManyUserInputEnvelope
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DomainUpdateManyWithoutUserNestedInput = {
    create?: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput> | DomainCreateWithoutUserInput[] | DomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutUserInput | DomainCreateOrConnectWithoutUserInput[]
    upsert?: DomainUpsertWithWhereUniqueWithoutUserInput | DomainUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DomainCreateManyUserInputEnvelope
    set?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    disconnect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    delete?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    update?: DomainUpdateWithWhereUniqueWithoutUserInput | DomainUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DomainUpdateManyWithWhereWithoutUserInput | DomainUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DomainScalarWhereInput | DomainScalarWhereInput[]
  }

  export type DomainUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput> | DomainCreateWithoutUserInput[] | DomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutUserInput | DomainCreateOrConnectWithoutUserInput[]
    upsert?: DomainUpsertWithWhereUniqueWithoutUserInput | DomainUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DomainCreateManyUserInputEnvelope
    set?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    disconnect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    delete?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    update?: DomainUpdateWithWhereUniqueWithoutUserInput | DomainUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DomainUpdateManyWithWhereWithoutUserInput | DomainUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DomainScalarWhereInput | DomainScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDomainsInput = {
    create?: XOR<UserCreateWithoutDomainsInput, UserUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDomainsInput
    connect?: UserWhereUniqueInput
  }

  export type EmailEventCreateNestedManyWithoutDomainInput = {
    create?: XOR<EmailEventCreateWithoutDomainInput, EmailEventUncheckedCreateWithoutDomainInput> | EmailEventCreateWithoutDomainInput[] | EmailEventUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutDomainInput | EmailEventCreateOrConnectWithoutDomainInput[]
    createMany?: EmailEventCreateManyDomainInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type EmailSummaryCreateNestedOneWithoutDomainInput = {
    create?: XOR<EmailSummaryCreateWithoutDomainInput, EmailSummaryUncheckedCreateWithoutDomainInput>
    connectOrCreate?: EmailSummaryCreateOrConnectWithoutDomainInput
    connect?: EmailSummaryWhereUniqueInput
  }

  export type EmailEventUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<EmailEventCreateWithoutDomainInput, EmailEventUncheckedCreateWithoutDomainInput> | EmailEventCreateWithoutDomainInput[] | EmailEventUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutDomainInput | EmailEventCreateOrConnectWithoutDomainInput[]
    createMany?: EmailEventCreateManyDomainInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type EmailSummaryUncheckedCreateNestedOneWithoutDomainInput = {
    create?: XOR<EmailSummaryCreateWithoutDomainInput, EmailSummaryUncheckedCreateWithoutDomainInput>
    connectOrCreate?: EmailSummaryCreateOrConnectWithoutDomainInput
    connect?: EmailSummaryWhereUniqueInput
  }

  export type UserUpdateOneWithoutDomainsNestedInput = {
    create?: XOR<UserCreateWithoutDomainsInput, UserUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDomainsInput
    upsert?: UserUpsertWithoutDomainsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDomainsInput, UserUpdateWithoutDomainsInput>, UserUncheckedUpdateWithoutDomainsInput>
  }

  export type EmailEventUpdateManyWithoutDomainNestedInput = {
    create?: XOR<EmailEventCreateWithoutDomainInput, EmailEventUncheckedCreateWithoutDomainInput> | EmailEventCreateWithoutDomainInput[] | EmailEventUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutDomainInput | EmailEventCreateOrConnectWithoutDomainInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutDomainInput | EmailEventUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: EmailEventCreateManyDomainInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutDomainInput | EmailEventUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutDomainInput | EmailEventUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type EmailSummaryUpdateOneWithoutDomainNestedInput = {
    create?: XOR<EmailSummaryCreateWithoutDomainInput, EmailSummaryUncheckedCreateWithoutDomainInput>
    connectOrCreate?: EmailSummaryCreateOrConnectWithoutDomainInput
    upsert?: EmailSummaryUpsertWithoutDomainInput
    disconnect?: EmailSummaryWhereInput | boolean
    delete?: EmailSummaryWhereInput | boolean
    connect?: EmailSummaryWhereUniqueInput
    update?: XOR<XOR<EmailSummaryUpdateToOneWithWhereWithoutDomainInput, EmailSummaryUpdateWithoutDomainInput>, EmailSummaryUncheckedUpdateWithoutDomainInput>
  }

  export type EmailEventUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<EmailEventCreateWithoutDomainInput, EmailEventUncheckedCreateWithoutDomainInput> | EmailEventCreateWithoutDomainInput[] | EmailEventUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutDomainInput | EmailEventCreateOrConnectWithoutDomainInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutDomainInput | EmailEventUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: EmailEventCreateManyDomainInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutDomainInput | EmailEventUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutDomainInput | EmailEventUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type EmailSummaryUncheckedUpdateOneWithoutDomainNestedInput = {
    create?: XOR<EmailSummaryCreateWithoutDomainInput, EmailSummaryUncheckedCreateWithoutDomainInput>
    connectOrCreate?: EmailSummaryCreateOrConnectWithoutDomainInput
    upsert?: EmailSummaryUpsertWithoutDomainInput
    disconnect?: EmailSummaryWhereInput | boolean
    delete?: EmailSummaryWhereInput | boolean
    connect?: EmailSummaryWhereUniqueInput
    update?: XOR<XOR<EmailSummaryUpdateToOneWithWhereWithoutDomainInput, EmailSummaryUpdateWithoutDomainInput>, EmailSummaryUncheckedUpdateWithoutDomainInput>
  }

  export type DomainCreateNestedOneWithoutEmailsInput = {
    create?: XOR<DomainCreateWithoutEmailsInput, DomainUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutEmailsInput
    connect?: DomainWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DomainUpdateOneRequiredWithoutEmailsNestedInput = {
    create?: XOR<DomainCreateWithoutEmailsInput, DomainUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutEmailsInput
    upsert?: DomainUpsertWithoutEmailsInput
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutEmailsInput, DomainUpdateWithoutEmailsInput>, DomainUncheckedUpdateWithoutEmailsInput>
  }

  export type DomainCreateNestedOneWithoutSummaryInput = {
    create?: XOR<DomainCreateWithoutSummaryInput, DomainUncheckedCreateWithoutSummaryInput>
    connectOrCreate?: DomainCreateOrConnectWithoutSummaryInput
    connect?: DomainWhereUniqueInput
  }

  export type DomainUpdateOneRequiredWithoutSummaryNestedInput = {
    create?: XOR<DomainCreateWithoutSummaryInput, DomainUncheckedCreateWithoutSummaryInput>
    connectOrCreate?: DomainCreateOrConnectWithoutSummaryInput
    upsert?: DomainUpsertWithoutSummaryInput
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutSummaryInput, DomainUpdateWithoutSummaryInput>, DomainUncheckedUpdateWithoutSummaryInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DomainCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailEventCreateNestedManyWithoutDomainInput
    summary?: EmailSummaryCreateNestedOneWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailEventUncheckedCreateNestedManyWithoutDomainInput
    summary?: EmailSummaryUncheckedCreateNestedOneWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutUserInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput>
  }

  export type DomainCreateManyUserInputEnvelope = {
    data: DomainCreateManyUserInput | DomainCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DomainUpsertWithWhereUniqueWithoutUserInput = {
    where: DomainWhereUniqueInput
    update: XOR<DomainUpdateWithoutUserInput, DomainUncheckedUpdateWithoutUserInput>
    create: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput>
  }

  export type DomainUpdateWithWhereUniqueWithoutUserInput = {
    where: DomainWhereUniqueInput
    data: XOR<DomainUpdateWithoutUserInput, DomainUncheckedUpdateWithoutUserInput>
  }

  export type DomainUpdateManyWithWhereWithoutUserInput = {
    where: DomainScalarWhereInput
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyWithoutUserInput>
  }

  export type DomainScalarWhereInput = {
    AND?: DomainScalarWhereInput | DomainScalarWhereInput[]
    OR?: DomainScalarWhereInput[]
    NOT?: DomainScalarWhereInput | DomainScalarWhereInput[]
    id?: StringFilter<"Domain"> | string
    name?: StringFilter<"Domain"> | string
    userId?: StringNullableFilter<"Domain"> | string | null
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    updatedAt?: DateTimeFilter<"Domain"> | Date | string
  }

  export type UserCreateWithoutDomainsInput = {
    id?: string
    kindeId: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutDomainsInput = {
    id?: string
    kindeId: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutDomainsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDomainsInput, UserUncheckedCreateWithoutDomainsInput>
  }

  export type EmailEventCreateWithoutDomainInput = {
    id?: string
    emailId: number
    token: string
    messageId: string
    to: string
    from: string
    subject: string
    eventType: string
    status: string
    spamStatus: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type EmailEventUncheckedCreateWithoutDomainInput = {
    id?: string
    emailId: number
    token: string
    messageId: string
    to: string
    from: string
    subject: string
    eventType: string
    status: string
    spamStatus: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type EmailEventCreateOrConnectWithoutDomainInput = {
    where: EmailEventWhereUniqueInput
    create: XOR<EmailEventCreateWithoutDomainInput, EmailEventUncheckedCreateWithoutDomainInput>
  }

  export type EmailEventCreateManyDomainInputEnvelope = {
    data: EmailEventCreateManyDomainInput | EmailEventCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type EmailSummaryCreateWithoutDomainInput = {
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    totalOpens?: number
    totalClicks?: number
    sentCount?: number
    hardfailCount?: number
    softfailCount?: number
    bounceCount?: number
    errorCount?: number
    heldCount?: number
    delayedCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailSummaryUncheckedCreateWithoutDomainInput = {
    id?: number
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    totalOpens?: number
    totalClicks?: number
    sentCount?: number
    hardfailCount?: number
    softfailCount?: number
    bounceCount?: number
    errorCount?: number
    heldCount?: number
    delayedCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailSummaryCreateOrConnectWithoutDomainInput = {
    where: EmailSummaryWhereUniqueInput
    create: XOR<EmailSummaryCreateWithoutDomainInput, EmailSummaryUncheckedCreateWithoutDomainInput>
  }

  export type UserUpsertWithoutDomainsInput = {
    update: XOR<UserUpdateWithoutDomainsInput, UserUncheckedUpdateWithoutDomainsInput>
    create: XOR<UserCreateWithoutDomainsInput, UserUncheckedCreateWithoutDomainsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDomainsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDomainsInput, UserUncheckedUpdateWithoutDomainsInput>
  }

  export type UserUpdateWithoutDomainsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutDomainsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUpsertWithWhereUniqueWithoutDomainInput = {
    where: EmailEventWhereUniqueInput
    update: XOR<EmailEventUpdateWithoutDomainInput, EmailEventUncheckedUpdateWithoutDomainInput>
    create: XOR<EmailEventCreateWithoutDomainInput, EmailEventUncheckedCreateWithoutDomainInput>
  }

  export type EmailEventUpdateWithWhereUniqueWithoutDomainInput = {
    where: EmailEventWhereUniqueInput
    data: XOR<EmailEventUpdateWithoutDomainInput, EmailEventUncheckedUpdateWithoutDomainInput>
  }

  export type EmailEventUpdateManyWithWhereWithoutDomainInput = {
    where: EmailEventScalarWhereInput
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyWithoutDomainInput>
  }

  export type EmailEventScalarWhereInput = {
    AND?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
    OR?: EmailEventScalarWhereInput[]
    NOT?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
    id?: StringFilter<"EmailEvent"> | string
    emailId?: IntFilter<"EmailEvent"> | number
    token?: StringFilter<"EmailEvent"> | string
    messageId?: StringFilter<"EmailEvent"> | string
    to?: StringFilter<"EmailEvent"> | string
    from?: StringFilter<"EmailEvent"> | string
    subject?: StringFilter<"EmailEvent"> | string
    eventType?: StringFilter<"EmailEvent"> | string
    status?: StringFilter<"EmailEvent"> | string
    spamStatus?: IntFilter<"EmailEvent"> | number
    timestamp?: DateTimeFilter<"EmailEvent"> | Date | string
    domainId?: StringFilter<"EmailEvent"> | string
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
  }

  export type EmailSummaryUpsertWithoutDomainInput = {
    update: XOR<EmailSummaryUpdateWithoutDomainInput, EmailSummaryUncheckedUpdateWithoutDomainInput>
    create: XOR<EmailSummaryCreateWithoutDomainInput, EmailSummaryUncheckedCreateWithoutDomainInput>
    where?: EmailSummaryWhereInput
  }

  export type EmailSummaryUpdateToOneWithWhereWithoutDomainInput = {
    where?: EmailSummaryWhereInput
    data: XOR<EmailSummaryUpdateWithoutDomainInput, EmailSummaryUncheckedUpdateWithoutDomainInput>
  }

  export type EmailSummaryUpdateWithoutDomainInput = {
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    totalOpens?: IntFieldUpdateOperationsInput | number
    totalClicks?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    hardfailCount?: IntFieldUpdateOperationsInput | number
    softfailCount?: IntFieldUpdateOperationsInput | number
    bounceCount?: IntFieldUpdateOperationsInput | number
    errorCount?: IntFieldUpdateOperationsInput | number
    heldCount?: IntFieldUpdateOperationsInput | number
    delayedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailSummaryUncheckedUpdateWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    totalOpens?: IntFieldUpdateOperationsInput | number
    totalClicks?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    hardfailCount?: IntFieldUpdateOperationsInput | number
    softfailCount?: IntFieldUpdateOperationsInput | number
    bounceCount?: IntFieldUpdateOperationsInput | number
    errorCount?: IntFieldUpdateOperationsInput | number
    heldCount?: IntFieldUpdateOperationsInput | number
    delayedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainCreateWithoutEmailsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutDomainsInput
    summary?: EmailSummaryCreateNestedOneWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutEmailsInput = {
    id?: string
    name: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    summary?: EmailSummaryUncheckedCreateNestedOneWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutEmailsInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutEmailsInput, DomainUncheckedCreateWithoutEmailsInput>
  }

  export type DomainUpsertWithoutEmailsInput = {
    update: XOR<DomainUpdateWithoutEmailsInput, DomainUncheckedUpdateWithoutEmailsInput>
    create: XOR<DomainCreateWithoutEmailsInput, DomainUncheckedCreateWithoutEmailsInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutEmailsInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutEmailsInput, DomainUncheckedUpdateWithoutEmailsInput>
  }

  export type DomainUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDomainsNestedInput
    summary?: EmailSummaryUpdateOneWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: EmailSummaryUncheckedUpdateOneWithoutDomainNestedInput
  }

  export type DomainCreateWithoutSummaryInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutDomainsInput
    emails?: EmailEventCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutSummaryInput = {
    id?: string
    name: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emails?: EmailEventUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutSummaryInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutSummaryInput, DomainUncheckedCreateWithoutSummaryInput>
  }

  export type DomainUpsertWithoutSummaryInput = {
    update: XOR<DomainUpdateWithoutSummaryInput, DomainUncheckedUpdateWithoutSummaryInput>
    create: XOR<DomainCreateWithoutSummaryInput, DomainUncheckedCreateWithoutSummaryInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutSummaryInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutSummaryInput, DomainUncheckedUpdateWithoutSummaryInput>
  }

  export type DomainUpdateWithoutSummaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDomainsNestedInput
    emails?: EmailEventUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutSummaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailEventUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailEventUpdateManyWithoutDomainNestedInput
    summary?: EmailSummaryUpdateOneWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: EmailEventUncheckedUpdateManyWithoutDomainNestedInput
    summary?: EmailSummaryUncheckedUpdateOneWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventCreateManyDomainInput = {
    id?: string
    emailId: number
    token: string
    messageId: string
    to: string
    from: string
    subject: string
    eventType: string
    status: string
    spamStatus: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type EmailEventUpdateWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    spamStatus?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    spamStatus?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateManyWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    spamStatus?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}