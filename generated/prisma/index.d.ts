
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
 * Model SendingDomain
 * 
 */
export type SendingDomain = $Result.DefaultSelection<Prisma.$SendingDomainPayload>
/**
 * Model EmailEvent
 * 
 */
export type EmailEvent = $Result.DefaultSelection<Prisma.$EmailEventPayload>
/**
 * Model SummaryStats
 * 
 */
export type SummaryStats = $Result.DefaultSelection<Prisma.$SummaryStatsPayload>

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
   * `prisma.sendingDomain`: Exposes CRUD operations for the **SendingDomain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SendingDomains
    * const sendingDomains = await prisma.sendingDomain.findMany()
    * ```
    */
  get sendingDomain(): Prisma.SendingDomainDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.summaryStats`: Exposes CRUD operations for the **SummaryStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SummaryStats
    * const summaryStats = await prisma.summaryStats.findMany()
    * ```
    */
  get summaryStats(): Prisma.SummaryStatsDelegate<ExtArgs, ClientOptions>;
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
    SendingDomain: 'SendingDomain',
    EmailEvent: 'EmailEvent',
    SummaryStats: 'SummaryStats'
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
      modelProps: "user" | "sendingDomain" | "emailEvent" | "summaryStats"
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
      SendingDomain: {
        payload: Prisma.$SendingDomainPayload<ExtArgs>
        fields: Prisma.SendingDomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SendingDomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SendingDomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>
          }
          findFirst: {
            args: Prisma.SendingDomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SendingDomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>
          }
          findMany: {
            args: Prisma.SendingDomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>[]
          }
          create: {
            args: Prisma.SendingDomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>
          }
          createMany: {
            args: Prisma.SendingDomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SendingDomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>[]
          }
          delete: {
            args: Prisma.SendingDomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>
          }
          update: {
            args: Prisma.SendingDomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>
          }
          deleteMany: {
            args: Prisma.SendingDomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SendingDomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SendingDomainUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>[]
          }
          upsert: {
            args: Prisma.SendingDomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SendingDomainPayload>
          }
          aggregate: {
            args: Prisma.SendingDomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSendingDomain>
          }
          groupBy: {
            args: Prisma.SendingDomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<SendingDomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.SendingDomainCountArgs<ExtArgs>
            result: $Utils.Optional<SendingDomainCountAggregateOutputType> | number
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
      SummaryStats: {
        payload: Prisma.$SummaryStatsPayload<ExtArgs>
        fields: Prisma.SummaryStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SummaryStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SummaryStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>
          }
          findFirst: {
            args: Prisma.SummaryStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SummaryStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>
          }
          findMany: {
            args: Prisma.SummaryStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>[]
          }
          create: {
            args: Prisma.SummaryStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>
          }
          createMany: {
            args: Prisma.SummaryStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SummaryStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>[]
          }
          delete: {
            args: Prisma.SummaryStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>
          }
          update: {
            args: Prisma.SummaryStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>
          }
          deleteMany: {
            args: Prisma.SummaryStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SummaryStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SummaryStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>[]
          }
          upsert: {
            args: Prisma.SummaryStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SummaryStatsPayload>
          }
          aggregate: {
            args: Prisma.SummaryStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSummaryStats>
          }
          groupBy: {
            args: Prisma.SummaryStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SummaryStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SummaryStatsCountArgs<ExtArgs>
            result: $Utils.Optional<SummaryStatsCountAggregateOutputType> | number
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
    sendingDomain?: SendingDomainOmit
    emailEvent?: EmailEventOmit
    summaryStats?: SummaryStatsOmit
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
    sendingDomains: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sendingDomains?: boolean | UserCountOutputTypeCountSendingDomainsArgs
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
  export type UserCountOutputTypeCountSendingDomainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SendingDomainWhereInput
  }


  /**
   * Count Type SendingDomainCountOutputType
   */

  export type SendingDomainCountOutputType = {
    emailEvents: number
  }

  export type SendingDomainCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailEvents?: boolean | SendingDomainCountOutputTypeCountEmailEventsArgs
  }

  // Custom InputTypes
  /**
   * SendingDomainCountOutputType without action
   */
  export type SendingDomainCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomainCountOutputType
     */
    select?: SendingDomainCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SendingDomainCountOutputType without action
   */
  export type SendingDomainCountOutputTypeCountEmailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    kindeId: string | null
    email: string | null
    name: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    kindeId: number
    email: number
    name: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    kindeId?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    kindeId?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    kindeId?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
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
    name: string
    role: $Enums.Role
    createdAt: Date
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
    role?: boolean
    createdAt?: boolean
    sendingDomains?: boolean | User$sendingDomainsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kindeId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kindeId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    kindeId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "kindeId" | "email" | "name" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sendingDomains?: boolean | User$sendingDomainsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sendingDomains: Prisma.$SendingDomainPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kindeId: string
      email: string
      name: string
      role: $Enums.Role
      createdAt: Date
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
    sendingDomains<T extends User$sendingDomainsArgs<ExtArgs> = {}>(args?: Subset<T, User$sendingDomainsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
   * User.sendingDomains
   */
  export type User$sendingDomainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    where?: SendingDomainWhereInput
    orderBy?: SendingDomainOrderByWithRelationInput | SendingDomainOrderByWithRelationInput[]
    cursor?: SendingDomainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SendingDomainScalarFieldEnum | SendingDomainScalarFieldEnum[]
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
   * Model SendingDomain
   */

  export type AggregateSendingDomain = {
    _count: SendingDomainCountAggregateOutputType | null
    _min: SendingDomainMinAggregateOutputType | null
    _max: SendingDomainMaxAggregateOutputType | null
  }

  export type SendingDomainMinAggregateOutputType = {
    id: string | null
    domain: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type SendingDomainMaxAggregateOutputType = {
    id: string | null
    domain: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type SendingDomainCountAggregateOutputType = {
    id: number
    domain: number
    userId: number
    createdAt: number
    _all: number
  }


  export type SendingDomainMinAggregateInputType = {
    id?: true
    domain?: true
    userId?: true
    createdAt?: true
  }

  export type SendingDomainMaxAggregateInputType = {
    id?: true
    domain?: true
    userId?: true
    createdAt?: true
  }

  export type SendingDomainCountAggregateInputType = {
    id?: true
    domain?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type SendingDomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SendingDomain to aggregate.
     */
    where?: SendingDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SendingDomains to fetch.
     */
    orderBy?: SendingDomainOrderByWithRelationInput | SendingDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SendingDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SendingDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SendingDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SendingDomains
    **/
    _count?: true | SendingDomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SendingDomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SendingDomainMaxAggregateInputType
  }

  export type GetSendingDomainAggregateType<T extends SendingDomainAggregateArgs> = {
        [P in keyof T & keyof AggregateSendingDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSendingDomain[P]>
      : GetScalarType<T[P], AggregateSendingDomain[P]>
  }




  export type SendingDomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SendingDomainWhereInput
    orderBy?: SendingDomainOrderByWithAggregationInput | SendingDomainOrderByWithAggregationInput[]
    by: SendingDomainScalarFieldEnum[] | SendingDomainScalarFieldEnum
    having?: SendingDomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SendingDomainCountAggregateInputType | true
    _min?: SendingDomainMinAggregateInputType
    _max?: SendingDomainMaxAggregateInputType
  }

  export type SendingDomainGroupByOutputType = {
    id: string
    domain: string
    userId: string
    createdAt: Date
    _count: SendingDomainCountAggregateOutputType | null
    _min: SendingDomainMinAggregateOutputType | null
    _max: SendingDomainMaxAggregateOutputType | null
  }

  type GetSendingDomainGroupByPayload<T extends SendingDomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SendingDomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SendingDomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SendingDomainGroupByOutputType[P]>
            : GetScalarType<T[P], SendingDomainGroupByOutputType[P]>
        }
      >
    >


  export type SendingDomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domain?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    emailEvents?: boolean | SendingDomain$emailEventsArgs<ExtArgs>
    summaryStats?: boolean | SendingDomain$summaryStatsArgs<ExtArgs>
    _count?: boolean | SendingDomainCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sendingDomain"]>

  export type SendingDomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domain?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sendingDomain"]>

  export type SendingDomainSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domain?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sendingDomain"]>

  export type SendingDomainSelectScalar = {
    id?: boolean
    domain?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type SendingDomainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domain" | "userId" | "createdAt", ExtArgs["result"]["sendingDomain"]>
  export type SendingDomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    emailEvents?: boolean | SendingDomain$emailEventsArgs<ExtArgs>
    summaryStats?: boolean | SendingDomain$summaryStatsArgs<ExtArgs>
    _count?: boolean | SendingDomainCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SendingDomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SendingDomainIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SendingDomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SendingDomain"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      emailEvents: Prisma.$EmailEventPayload<ExtArgs>[]
      summaryStats: Prisma.$SummaryStatsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      domain: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["sendingDomain"]>
    composites: {}
  }

  type SendingDomainGetPayload<S extends boolean | null | undefined | SendingDomainDefaultArgs> = $Result.GetResult<Prisma.$SendingDomainPayload, S>

  type SendingDomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SendingDomainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SendingDomainCountAggregateInputType | true
    }

  export interface SendingDomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SendingDomain'], meta: { name: 'SendingDomain' } }
    /**
     * Find zero or one SendingDomain that matches the filter.
     * @param {SendingDomainFindUniqueArgs} args - Arguments to find a SendingDomain
     * @example
     * // Get one SendingDomain
     * const sendingDomain = await prisma.sendingDomain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SendingDomainFindUniqueArgs>(args: SelectSubset<T, SendingDomainFindUniqueArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SendingDomain that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SendingDomainFindUniqueOrThrowArgs} args - Arguments to find a SendingDomain
     * @example
     * // Get one SendingDomain
     * const sendingDomain = await prisma.sendingDomain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SendingDomainFindUniqueOrThrowArgs>(args: SelectSubset<T, SendingDomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SendingDomain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SendingDomainFindFirstArgs} args - Arguments to find a SendingDomain
     * @example
     * // Get one SendingDomain
     * const sendingDomain = await prisma.sendingDomain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SendingDomainFindFirstArgs>(args?: SelectSubset<T, SendingDomainFindFirstArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SendingDomain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SendingDomainFindFirstOrThrowArgs} args - Arguments to find a SendingDomain
     * @example
     * // Get one SendingDomain
     * const sendingDomain = await prisma.sendingDomain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SendingDomainFindFirstOrThrowArgs>(args?: SelectSubset<T, SendingDomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SendingDomains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SendingDomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SendingDomains
     * const sendingDomains = await prisma.sendingDomain.findMany()
     * 
     * // Get first 10 SendingDomains
     * const sendingDomains = await prisma.sendingDomain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sendingDomainWithIdOnly = await prisma.sendingDomain.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SendingDomainFindManyArgs>(args?: SelectSubset<T, SendingDomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SendingDomain.
     * @param {SendingDomainCreateArgs} args - Arguments to create a SendingDomain.
     * @example
     * // Create one SendingDomain
     * const SendingDomain = await prisma.sendingDomain.create({
     *   data: {
     *     // ... data to create a SendingDomain
     *   }
     * })
     * 
     */
    create<T extends SendingDomainCreateArgs>(args: SelectSubset<T, SendingDomainCreateArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SendingDomains.
     * @param {SendingDomainCreateManyArgs} args - Arguments to create many SendingDomains.
     * @example
     * // Create many SendingDomains
     * const sendingDomain = await prisma.sendingDomain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SendingDomainCreateManyArgs>(args?: SelectSubset<T, SendingDomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SendingDomains and returns the data saved in the database.
     * @param {SendingDomainCreateManyAndReturnArgs} args - Arguments to create many SendingDomains.
     * @example
     * // Create many SendingDomains
     * const sendingDomain = await prisma.sendingDomain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SendingDomains and only return the `id`
     * const sendingDomainWithIdOnly = await prisma.sendingDomain.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SendingDomainCreateManyAndReturnArgs>(args?: SelectSubset<T, SendingDomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SendingDomain.
     * @param {SendingDomainDeleteArgs} args - Arguments to delete one SendingDomain.
     * @example
     * // Delete one SendingDomain
     * const SendingDomain = await prisma.sendingDomain.delete({
     *   where: {
     *     // ... filter to delete one SendingDomain
     *   }
     * })
     * 
     */
    delete<T extends SendingDomainDeleteArgs>(args: SelectSubset<T, SendingDomainDeleteArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SendingDomain.
     * @param {SendingDomainUpdateArgs} args - Arguments to update one SendingDomain.
     * @example
     * // Update one SendingDomain
     * const sendingDomain = await prisma.sendingDomain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SendingDomainUpdateArgs>(args: SelectSubset<T, SendingDomainUpdateArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SendingDomains.
     * @param {SendingDomainDeleteManyArgs} args - Arguments to filter SendingDomains to delete.
     * @example
     * // Delete a few SendingDomains
     * const { count } = await prisma.sendingDomain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SendingDomainDeleteManyArgs>(args?: SelectSubset<T, SendingDomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SendingDomains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SendingDomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SendingDomains
     * const sendingDomain = await prisma.sendingDomain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SendingDomainUpdateManyArgs>(args: SelectSubset<T, SendingDomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SendingDomains and returns the data updated in the database.
     * @param {SendingDomainUpdateManyAndReturnArgs} args - Arguments to update many SendingDomains.
     * @example
     * // Update many SendingDomains
     * const sendingDomain = await prisma.sendingDomain.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SendingDomains and only return the `id`
     * const sendingDomainWithIdOnly = await prisma.sendingDomain.updateManyAndReturn({
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
    updateManyAndReturn<T extends SendingDomainUpdateManyAndReturnArgs>(args: SelectSubset<T, SendingDomainUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SendingDomain.
     * @param {SendingDomainUpsertArgs} args - Arguments to update or create a SendingDomain.
     * @example
     * // Update or create a SendingDomain
     * const sendingDomain = await prisma.sendingDomain.upsert({
     *   create: {
     *     // ... data to create a SendingDomain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SendingDomain we want to update
     *   }
     * })
     */
    upsert<T extends SendingDomainUpsertArgs>(args: SelectSubset<T, SendingDomainUpsertArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SendingDomains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SendingDomainCountArgs} args - Arguments to filter SendingDomains to count.
     * @example
     * // Count the number of SendingDomains
     * const count = await prisma.sendingDomain.count({
     *   where: {
     *     // ... the filter for the SendingDomains we want to count
     *   }
     * })
    **/
    count<T extends SendingDomainCountArgs>(
      args?: Subset<T, SendingDomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SendingDomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SendingDomain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SendingDomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SendingDomainAggregateArgs>(args: Subset<T, SendingDomainAggregateArgs>): Prisma.PrismaPromise<GetSendingDomainAggregateType<T>>

    /**
     * Group by SendingDomain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SendingDomainGroupByArgs} args - Group by arguments.
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
      T extends SendingDomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SendingDomainGroupByArgs['orderBy'] }
        : { orderBy?: SendingDomainGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SendingDomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSendingDomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SendingDomain model
   */
  readonly fields: SendingDomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SendingDomain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SendingDomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emailEvents<T extends SendingDomain$emailEventsArgs<ExtArgs> = {}>(args?: Subset<T, SendingDomain$emailEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    summaryStats<T extends SendingDomain$summaryStatsArgs<ExtArgs> = {}>(args?: Subset<T, SendingDomain$summaryStatsArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SendingDomain model
   */
  interface SendingDomainFieldRefs {
    readonly id: FieldRef<"SendingDomain", 'String'>
    readonly domain: FieldRef<"SendingDomain", 'String'>
    readonly userId: FieldRef<"SendingDomain", 'String'>
    readonly createdAt: FieldRef<"SendingDomain", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SendingDomain findUnique
   */
  export type SendingDomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * Filter, which SendingDomain to fetch.
     */
    where: SendingDomainWhereUniqueInput
  }

  /**
   * SendingDomain findUniqueOrThrow
   */
  export type SendingDomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * Filter, which SendingDomain to fetch.
     */
    where: SendingDomainWhereUniqueInput
  }

  /**
   * SendingDomain findFirst
   */
  export type SendingDomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * Filter, which SendingDomain to fetch.
     */
    where?: SendingDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SendingDomains to fetch.
     */
    orderBy?: SendingDomainOrderByWithRelationInput | SendingDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SendingDomains.
     */
    cursor?: SendingDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SendingDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SendingDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SendingDomains.
     */
    distinct?: SendingDomainScalarFieldEnum | SendingDomainScalarFieldEnum[]
  }

  /**
   * SendingDomain findFirstOrThrow
   */
  export type SendingDomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * Filter, which SendingDomain to fetch.
     */
    where?: SendingDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SendingDomains to fetch.
     */
    orderBy?: SendingDomainOrderByWithRelationInput | SendingDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SendingDomains.
     */
    cursor?: SendingDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SendingDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SendingDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SendingDomains.
     */
    distinct?: SendingDomainScalarFieldEnum | SendingDomainScalarFieldEnum[]
  }

  /**
   * SendingDomain findMany
   */
  export type SendingDomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * Filter, which SendingDomains to fetch.
     */
    where?: SendingDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SendingDomains to fetch.
     */
    orderBy?: SendingDomainOrderByWithRelationInput | SendingDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SendingDomains.
     */
    cursor?: SendingDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SendingDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SendingDomains.
     */
    skip?: number
    distinct?: SendingDomainScalarFieldEnum | SendingDomainScalarFieldEnum[]
  }

  /**
   * SendingDomain create
   */
  export type SendingDomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * The data needed to create a SendingDomain.
     */
    data: XOR<SendingDomainCreateInput, SendingDomainUncheckedCreateInput>
  }

  /**
   * SendingDomain createMany
   */
  export type SendingDomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SendingDomains.
     */
    data: SendingDomainCreateManyInput | SendingDomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SendingDomain createManyAndReturn
   */
  export type SendingDomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * The data used to create many SendingDomains.
     */
    data: SendingDomainCreateManyInput | SendingDomainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SendingDomain update
   */
  export type SendingDomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * The data needed to update a SendingDomain.
     */
    data: XOR<SendingDomainUpdateInput, SendingDomainUncheckedUpdateInput>
    /**
     * Choose, which SendingDomain to update.
     */
    where: SendingDomainWhereUniqueInput
  }

  /**
   * SendingDomain updateMany
   */
  export type SendingDomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SendingDomains.
     */
    data: XOR<SendingDomainUpdateManyMutationInput, SendingDomainUncheckedUpdateManyInput>
    /**
     * Filter which SendingDomains to update
     */
    where?: SendingDomainWhereInput
    /**
     * Limit how many SendingDomains to update.
     */
    limit?: number
  }

  /**
   * SendingDomain updateManyAndReturn
   */
  export type SendingDomainUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * The data used to update SendingDomains.
     */
    data: XOR<SendingDomainUpdateManyMutationInput, SendingDomainUncheckedUpdateManyInput>
    /**
     * Filter which SendingDomains to update
     */
    where?: SendingDomainWhereInput
    /**
     * Limit how many SendingDomains to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SendingDomain upsert
   */
  export type SendingDomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * The filter to search for the SendingDomain to update in case it exists.
     */
    where: SendingDomainWhereUniqueInput
    /**
     * In case the SendingDomain found by the `where` argument doesn't exist, create a new SendingDomain with this data.
     */
    create: XOR<SendingDomainCreateInput, SendingDomainUncheckedCreateInput>
    /**
     * In case the SendingDomain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SendingDomainUpdateInput, SendingDomainUncheckedUpdateInput>
  }

  /**
   * SendingDomain delete
   */
  export type SendingDomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
    /**
     * Filter which SendingDomain to delete.
     */
    where: SendingDomainWhereUniqueInput
  }

  /**
   * SendingDomain deleteMany
   */
  export type SendingDomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SendingDomains to delete
     */
    where?: SendingDomainWhereInput
    /**
     * Limit how many SendingDomains to delete.
     */
    limit?: number
  }

  /**
   * SendingDomain.emailEvents
   */
  export type SendingDomain$emailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * SendingDomain.summaryStats
   */
  export type SendingDomain$summaryStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    where?: SummaryStatsWhereInput
  }

  /**
   * SendingDomain without action
   */
  export type SendingDomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SendingDomain
     */
    select?: SendingDomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SendingDomain
     */
    omit?: SendingDomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SendingDomainInclude<ExtArgs> | null
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
    timeTaken: number | null
    spamStatus: number | null
    timestamp: number | null
  }

  export type EmailEventSumAggregateOutputType = {
    timeTaken: number | null
    spamStatus: number | null
    timestamp: number | null
  }

  export type EmailEventMinAggregateOutputType = {
    id: string | null
    webhookEventId: string | null
    messageId: string | null
    status: string | null
    type: string | null
    recipient: string | null
    sender: string | null
    subject: string | null
    sentWithSSL: boolean | null
    timeTaken: number | null
    spamStatus: number | null
    details: string | null
    timestamp: number | null
    sendingDomainId: string | null
    createdAt: Date | null
  }

  export type EmailEventMaxAggregateOutputType = {
    id: string | null
    webhookEventId: string | null
    messageId: string | null
    status: string | null
    type: string | null
    recipient: string | null
    sender: string | null
    subject: string | null
    sentWithSSL: boolean | null
    timeTaken: number | null
    spamStatus: number | null
    details: string | null
    timestamp: number | null
    sendingDomainId: string | null
    createdAt: Date | null
  }

  export type EmailEventCountAggregateOutputType = {
    id: number
    webhookEventId: number
    messageId: number
    status: number
    type: number
    recipient: number
    sender: number
    subject: number
    sentWithSSL: number
    timeTaken: number
    spamStatus: number
    details: number
    timestamp: number
    sendingDomainId: number
    createdAt: number
    _all: number
  }


  export type EmailEventAvgAggregateInputType = {
    timeTaken?: true
    spamStatus?: true
    timestamp?: true
  }

  export type EmailEventSumAggregateInputType = {
    timeTaken?: true
    spamStatus?: true
    timestamp?: true
  }

  export type EmailEventMinAggregateInputType = {
    id?: true
    webhookEventId?: true
    messageId?: true
    status?: true
    type?: true
    recipient?: true
    sender?: true
    subject?: true
    sentWithSSL?: true
    timeTaken?: true
    spamStatus?: true
    details?: true
    timestamp?: true
    sendingDomainId?: true
    createdAt?: true
  }

  export type EmailEventMaxAggregateInputType = {
    id?: true
    webhookEventId?: true
    messageId?: true
    status?: true
    type?: true
    recipient?: true
    sender?: true
    subject?: true
    sentWithSSL?: true
    timeTaken?: true
    spamStatus?: true
    details?: true
    timestamp?: true
    sendingDomainId?: true
    createdAt?: true
  }

  export type EmailEventCountAggregateInputType = {
    id?: true
    webhookEventId?: true
    messageId?: true
    status?: true
    type?: true
    recipient?: true
    sender?: true
    subject?: true
    sentWithSSL?: true
    timeTaken?: true
    spamStatus?: true
    details?: true
    timestamp?: true
    sendingDomainId?: true
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
    webhookEventId: string
    messageId: string
    status: string
    type: string
    recipient: string
    sender: string
    subject: string
    sentWithSSL: boolean
    timeTaken: number | null
    spamStatus: number | null
    details: string | null
    timestamp: number
    sendingDomainId: string
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
    webhookEventId?: boolean
    messageId?: boolean
    status?: boolean
    type?: boolean
    recipient?: boolean
    sender?: boolean
    subject?: boolean
    sentWithSSL?: boolean
    timeTaken?: boolean
    spamStatus?: boolean
    details?: boolean
    timestamp?: boolean
    sendingDomainId?: boolean
    createdAt?: boolean
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webhookEventId?: boolean
    messageId?: boolean
    status?: boolean
    type?: boolean
    recipient?: boolean
    sender?: boolean
    subject?: boolean
    sentWithSSL?: boolean
    timeTaken?: boolean
    spamStatus?: boolean
    details?: boolean
    timestamp?: boolean
    sendingDomainId?: boolean
    createdAt?: boolean
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webhookEventId?: boolean
    messageId?: boolean
    status?: boolean
    type?: boolean
    recipient?: boolean
    sender?: boolean
    subject?: boolean
    sentWithSSL?: boolean
    timeTaken?: boolean
    spamStatus?: boolean
    details?: boolean
    timestamp?: boolean
    sendingDomainId?: boolean
    createdAt?: boolean
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectScalar = {
    id?: boolean
    webhookEventId?: boolean
    messageId?: boolean
    status?: boolean
    type?: boolean
    recipient?: boolean
    sender?: boolean
    subject?: boolean
    sentWithSSL?: boolean
    timeTaken?: boolean
    spamStatus?: boolean
    details?: boolean
    timestamp?: boolean
    sendingDomainId?: boolean
    createdAt?: boolean
  }

  export type EmailEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "webhookEventId" | "messageId" | "status" | "type" | "recipient" | "sender" | "subject" | "sentWithSSL" | "timeTaken" | "spamStatus" | "details" | "timestamp" | "sendingDomainId" | "createdAt", ExtArgs["result"]["emailEvent"]>
  export type EmailEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }
  export type EmailEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }
  export type EmailEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }

  export type $EmailEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailEvent"
    objects: {
      sendingDomain: Prisma.$SendingDomainPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      webhookEventId: string
      messageId: string
      status: string
      type: string
      recipient: string
      sender: string
      subject: string
      sentWithSSL: boolean
      timeTaken: number | null
      spamStatus: number | null
      details: string | null
      timestamp: number
      sendingDomainId: string
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
    sendingDomain<T extends SendingDomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SendingDomainDefaultArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly webhookEventId: FieldRef<"EmailEvent", 'String'>
    readonly messageId: FieldRef<"EmailEvent", 'String'>
    readonly status: FieldRef<"EmailEvent", 'String'>
    readonly type: FieldRef<"EmailEvent", 'String'>
    readonly recipient: FieldRef<"EmailEvent", 'String'>
    readonly sender: FieldRef<"EmailEvent", 'String'>
    readonly subject: FieldRef<"EmailEvent", 'String'>
    readonly sentWithSSL: FieldRef<"EmailEvent", 'Boolean'>
    readonly timeTaken: FieldRef<"EmailEvent", 'Float'>
    readonly spamStatus: FieldRef<"EmailEvent", 'Int'>
    readonly details: FieldRef<"EmailEvent", 'String'>
    readonly timestamp: FieldRef<"EmailEvent", 'Float'>
    readonly sendingDomainId: FieldRef<"EmailEvent", 'String'>
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
   * Model SummaryStats
   */

  export type AggregateSummaryStats = {
    _count: SummaryStatsCountAggregateOutputType | null
    _avg: SummaryStatsAvgAggregateOutputType | null
    _sum: SummaryStatsSumAggregateOutputType | null
    _min: SummaryStatsMinAggregateOutputType | null
    _max: SummaryStatsMaxAggregateOutputType | null
  }

  export type SummaryStatsAvgAggregateOutputType = {
    totalSent: number | null
    totalDelivered: number | null
    totalFailed: number | null
  }

  export type SummaryStatsSumAggregateOutputType = {
    totalSent: number | null
    totalDelivered: number | null
    totalFailed: number | null
  }

  export type SummaryStatsMinAggregateOutputType = {
    id: string | null
    sendingDomainId: string | null
    totalSent: number | null
    totalDelivered: number | null
    totalFailed: number | null
    lastUpdated: Date | null
  }

  export type SummaryStatsMaxAggregateOutputType = {
    id: string | null
    sendingDomainId: string | null
    totalSent: number | null
    totalDelivered: number | null
    totalFailed: number | null
    lastUpdated: Date | null
  }

  export type SummaryStatsCountAggregateOutputType = {
    id: number
    sendingDomainId: number
    totalSent: number
    totalDelivered: number
    totalFailed: number
    lastUpdated: number
    _all: number
  }


  export type SummaryStatsAvgAggregateInputType = {
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
  }

  export type SummaryStatsSumAggregateInputType = {
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
  }

  export type SummaryStatsMinAggregateInputType = {
    id?: true
    sendingDomainId?: true
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
    lastUpdated?: true
  }

  export type SummaryStatsMaxAggregateInputType = {
    id?: true
    sendingDomainId?: true
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
    lastUpdated?: true
  }

  export type SummaryStatsCountAggregateInputType = {
    id?: true
    sendingDomainId?: true
    totalSent?: true
    totalDelivered?: true
    totalFailed?: true
    lastUpdated?: true
    _all?: true
  }

  export type SummaryStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SummaryStats to aggregate.
     */
    where?: SummaryStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SummaryStats to fetch.
     */
    orderBy?: SummaryStatsOrderByWithRelationInput | SummaryStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SummaryStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SummaryStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SummaryStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SummaryStats
    **/
    _count?: true | SummaryStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SummaryStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SummaryStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SummaryStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SummaryStatsMaxAggregateInputType
  }

  export type GetSummaryStatsAggregateType<T extends SummaryStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateSummaryStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSummaryStats[P]>
      : GetScalarType<T[P], AggregateSummaryStats[P]>
  }




  export type SummaryStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SummaryStatsWhereInput
    orderBy?: SummaryStatsOrderByWithAggregationInput | SummaryStatsOrderByWithAggregationInput[]
    by: SummaryStatsScalarFieldEnum[] | SummaryStatsScalarFieldEnum
    having?: SummaryStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SummaryStatsCountAggregateInputType | true
    _avg?: SummaryStatsAvgAggregateInputType
    _sum?: SummaryStatsSumAggregateInputType
    _min?: SummaryStatsMinAggregateInputType
    _max?: SummaryStatsMaxAggregateInputType
  }

  export type SummaryStatsGroupByOutputType = {
    id: string
    sendingDomainId: string
    totalSent: number
    totalDelivered: number
    totalFailed: number
    lastUpdated: Date
    _count: SummaryStatsCountAggregateOutputType | null
    _avg: SummaryStatsAvgAggregateOutputType | null
    _sum: SummaryStatsSumAggregateOutputType | null
    _min: SummaryStatsMinAggregateOutputType | null
    _max: SummaryStatsMaxAggregateOutputType | null
  }

  type GetSummaryStatsGroupByPayload<T extends SummaryStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SummaryStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SummaryStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SummaryStatsGroupByOutputType[P]>
            : GetScalarType<T[P], SummaryStatsGroupByOutputType[P]>
        }
      >
    >


  export type SummaryStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sendingDomainId?: boolean
    totalSent?: boolean
    totalDelivered?: boolean
    totalFailed?: boolean
    lastUpdated?: boolean
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["summaryStats"]>

  export type SummaryStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sendingDomainId?: boolean
    totalSent?: boolean
    totalDelivered?: boolean
    totalFailed?: boolean
    lastUpdated?: boolean
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["summaryStats"]>

  export type SummaryStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sendingDomainId?: boolean
    totalSent?: boolean
    totalDelivered?: boolean
    totalFailed?: boolean
    lastUpdated?: boolean
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["summaryStats"]>

  export type SummaryStatsSelectScalar = {
    id?: boolean
    sendingDomainId?: boolean
    totalSent?: boolean
    totalDelivered?: boolean
    totalFailed?: boolean
    lastUpdated?: boolean
  }

  export type SummaryStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sendingDomainId" | "totalSent" | "totalDelivered" | "totalFailed" | "lastUpdated", ExtArgs["result"]["summaryStats"]>
  export type SummaryStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }
  export type SummaryStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }
  export type SummaryStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sendingDomain?: boolean | SendingDomainDefaultArgs<ExtArgs>
  }

  export type $SummaryStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SummaryStats"
    objects: {
      sendingDomain: Prisma.$SendingDomainPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sendingDomainId: string
      totalSent: number
      totalDelivered: number
      totalFailed: number
      lastUpdated: Date
    }, ExtArgs["result"]["summaryStats"]>
    composites: {}
  }

  type SummaryStatsGetPayload<S extends boolean | null | undefined | SummaryStatsDefaultArgs> = $Result.GetResult<Prisma.$SummaryStatsPayload, S>

  type SummaryStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SummaryStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SummaryStatsCountAggregateInputType | true
    }

  export interface SummaryStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SummaryStats'], meta: { name: 'SummaryStats' } }
    /**
     * Find zero or one SummaryStats that matches the filter.
     * @param {SummaryStatsFindUniqueArgs} args - Arguments to find a SummaryStats
     * @example
     * // Get one SummaryStats
     * const summaryStats = await prisma.summaryStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SummaryStatsFindUniqueArgs>(args: SelectSubset<T, SummaryStatsFindUniqueArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SummaryStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SummaryStatsFindUniqueOrThrowArgs} args - Arguments to find a SummaryStats
     * @example
     * // Get one SummaryStats
     * const summaryStats = await prisma.summaryStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SummaryStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, SummaryStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SummaryStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SummaryStatsFindFirstArgs} args - Arguments to find a SummaryStats
     * @example
     * // Get one SummaryStats
     * const summaryStats = await prisma.summaryStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SummaryStatsFindFirstArgs>(args?: SelectSubset<T, SummaryStatsFindFirstArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SummaryStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SummaryStatsFindFirstOrThrowArgs} args - Arguments to find a SummaryStats
     * @example
     * // Get one SummaryStats
     * const summaryStats = await prisma.summaryStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SummaryStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, SummaryStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SummaryStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SummaryStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SummaryStats
     * const summaryStats = await prisma.summaryStats.findMany()
     * 
     * // Get first 10 SummaryStats
     * const summaryStats = await prisma.summaryStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const summaryStatsWithIdOnly = await prisma.summaryStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SummaryStatsFindManyArgs>(args?: SelectSubset<T, SummaryStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SummaryStats.
     * @param {SummaryStatsCreateArgs} args - Arguments to create a SummaryStats.
     * @example
     * // Create one SummaryStats
     * const SummaryStats = await prisma.summaryStats.create({
     *   data: {
     *     // ... data to create a SummaryStats
     *   }
     * })
     * 
     */
    create<T extends SummaryStatsCreateArgs>(args: SelectSubset<T, SummaryStatsCreateArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SummaryStats.
     * @param {SummaryStatsCreateManyArgs} args - Arguments to create many SummaryStats.
     * @example
     * // Create many SummaryStats
     * const summaryStats = await prisma.summaryStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SummaryStatsCreateManyArgs>(args?: SelectSubset<T, SummaryStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SummaryStats and returns the data saved in the database.
     * @param {SummaryStatsCreateManyAndReturnArgs} args - Arguments to create many SummaryStats.
     * @example
     * // Create many SummaryStats
     * const summaryStats = await prisma.summaryStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SummaryStats and only return the `id`
     * const summaryStatsWithIdOnly = await prisma.summaryStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SummaryStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, SummaryStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SummaryStats.
     * @param {SummaryStatsDeleteArgs} args - Arguments to delete one SummaryStats.
     * @example
     * // Delete one SummaryStats
     * const SummaryStats = await prisma.summaryStats.delete({
     *   where: {
     *     // ... filter to delete one SummaryStats
     *   }
     * })
     * 
     */
    delete<T extends SummaryStatsDeleteArgs>(args: SelectSubset<T, SummaryStatsDeleteArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SummaryStats.
     * @param {SummaryStatsUpdateArgs} args - Arguments to update one SummaryStats.
     * @example
     * // Update one SummaryStats
     * const summaryStats = await prisma.summaryStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SummaryStatsUpdateArgs>(args: SelectSubset<T, SummaryStatsUpdateArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SummaryStats.
     * @param {SummaryStatsDeleteManyArgs} args - Arguments to filter SummaryStats to delete.
     * @example
     * // Delete a few SummaryStats
     * const { count } = await prisma.summaryStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SummaryStatsDeleteManyArgs>(args?: SelectSubset<T, SummaryStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SummaryStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SummaryStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SummaryStats
     * const summaryStats = await prisma.summaryStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SummaryStatsUpdateManyArgs>(args: SelectSubset<T, SummaryStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SummaryStats and returns the data updated in the database.
     * @param {SummaryStatsUpdateManyAndReturnArgs} args - Arguments to update many SummaryStats.
     * @example
     * // Update many SummaryStats
     * const summaryStats = await prisma.summaryStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SummaryStats and only return the `id`
     * const summaryStatsWithIdOnly = await prisma.summaryStats.updateManyAndReturn({
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
    updateManyAndReturn<T extends SummaryStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, SummaryStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SummaryStats.
     * @param {SummaryStatsUpsertArgs} args - Arguments to update or create a SummaryStats.
     * @example
     * // Update or create a SummaryStats
     * const summaryStats = await prisma.summaryStats.upsert({
     *   create: {
     *     // ... data to create a SummaryStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SummaryStats we want to update
     *   }
     * })
     */
    upsert<T extends SummaryStatsUpsertArgs>(args: SelectSubset<T, SummaryStatsUpsertArgs<ExtArgs>>): Prisma__SummaryStatsClient<$Result.GetResult<Prisma.$SummaryStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SummaryStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SummaryStatsCountArgs} args - Arguments to filter SummaryStats to count.
     * @example
     * // Count the number of SummaryStats
     * const count = await prisma.summaryStats.count({
     *   where: {
     *     // ... the filter for the SummaryStats we want to count
     *   }
     * })
    **/
    count<T extends SummaryStatsCountArgs>(
      args?: Subset<T, SummaryStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SummaryStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SummaryStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SummaryStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SummaryStatsAggregateArgs>(args: Subset<T, SummaryStatsAggregateArgs>): Prisma.PrismaPromise<GetSummaryStatsAggregateType<T>>

    /**
     * Group by SummaryStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SummaryStatsGroupByArgs} args - Group by arguments.
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
      T extends SummaryStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SummaryStatsGroupByArgs['orderBy'] }
        : { orderBy?: SummaryStatsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SummaryStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSummaryStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SummaryStats model
   */
  readonly fields: SummaryStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SummaryStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SummaryStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sendingDomain<T extends SendingDomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SendingDomainDefaultArgs<ExtArgs>>): Prisma__SendingDomainClient<$Result.GetResult<Prisma.$SendingDomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SummaryStats model
   */
  interface SummaryStatsFieldRefs {
    readonly id: FieldRef<"SummaryStats", 'String'>
    readonly sendingDomainId: FieldRef<"SummaryStats", 'String'>
    readonly totalSent: FieldRef<"SummaryStats", 'Int'>
    readonly totalDelivered: FieldRef<"SummaryStats", 'Int'>
    readonly totalFailed: FieldRef<"SummaryStats", 'Int'>
    readonly lastUpdated: FieldRef<"SummaryStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SummaryStats findUnique
   */
  export type SummaryStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * Filter, which SummaryStats to fetch.
     */
    where: SummaryStatsWhereUniqueInput
  }

  /**
   * SummaryStats findUniqueOrThrow
   */
  export type SummaryStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * Filter, which SummaryStats to fetch.
     */
    where: SummaryStatsWhereUniqueInput
  }

  /**
   * SummaryStats findFirst
   */
  export type SummaryStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * Filter, which SummaryStats to fetch.
     */
    where?: SummaryStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SummaryStats to fetch.
     */
    orderBy?: SummaryStatsOrderByWithRelationInput | SummaryStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SummaryStats.
     */
    cursor?: SummaryStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SummaryStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SummaryStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SummaryStats.
     */
    distinct?: SummaryStatsScalarFieldEnum | SummaryStatsScalarFieldEnum[]
  }

  /**
   * SummaryStats findFirstOrThrow
   */
  export type SummaryStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * Filter, which SummaryStats to fetch.
     */
    where?: SummaryStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SummaryStats to fetch.
     */
    orderBy?: SummaryStatsOrderByWithRelationInput | SummaryStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SummaryStats.
     */
    cursor?: SummaryStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SummaryStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SummaryStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SummaryStats.
     */
    distinct?: SummaryStatsScalarFieldEnum | SummaryStatsScalarFieldEnum[]
  }

  /**
   * SummaryStats findMany
   */
  export type SummaryStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * Filter, which SummaryStats to fetch.
     */
    where?: SummaryStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SummaryStats to fetch.
     */
    orderBy?: SummaryStatsOrderByWithRelationInput | SummaryStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SummaryStats.
     */
    cursor?: SummaryStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SummaryStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SummaryStats.
     */
    skip?: number
    distinct?: SummaryStatsScalarFieldEnum | SummaryStatsScalarFieldEnum[]
  }

  /**
   * SummaryStats create
   */
  export type SummaryStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a SummaryStats.
     */
    data: XOR<SummaryStatsCreateInput, SummaryStatsUncheckedCreateInput>
  }

  /**
   * SummaryStats createMany
   */
  export type SummaryStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SummaryStats.
     */
    data: SummaryStatsCreateManyInput | SummaryStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SummaryStats createManyAndReturn
   */
  export type SummaryStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * The data used to create many SummaryStats.
     */
    data: SummaryStatsCreateManyInput | SummaryStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SummaryStats update
   */
  export type SummaryStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a SummaryStats.
     */
    data: XOR<SummaryStatsUpdateInput, SummaryStatsUncheckedUpdateInput>
    /**
     * Choose, which SummaryStats to update.
     */
    where: SummaryStatsWhereUniqueInput
  }

  /**
   * SummaryStats updateMany
   */
  export type SummaryStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SummaryStats.
     */
    data: XOR<SummaryStatsUpdateManyMutationInput, SummaryStatsUncheckedUpdateManyInput>
    /**
     * Filter which SummaryStats to update
     */
    where?: SummaryStatsWhereInput
    /**
     * Limit how many SummaryStats to update.
     */
    limit?: number
  }

  /**
   * SummaryStats updateManyAndReturn
   */
  export type SummaryStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * The data used to update SummaryStats.
     */
    data: XOR<SummaryStatsUpdateManyMutationInput, SummaryStatsUncheckedUpdateManyInput>
    /**
     * Filter which SummaryStats to update
     */
    where?: SummaryStatsWhereInput
    /**
     * Limit how many SummaryStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SummaryStats upsert
   */
  export type SummaryStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the SummaryStats to update in case it exists.
     */
    where: SummaryStatsWhereUniqueInput
    /**
     * In case the SummaryStats found by the `where` argument doesn't exist, create a new SummaryStats with this data.
     */
    create: XOR<SummaryStatsCreateInput, SummaryStatsUncheckedCreateInput>
    /**
     * In case the SummaryStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SummaryStatsUpdateInput, SummaryStatsUncheckedUpdateInput>
  }

  /**
   * SummaryStats delete
   */
  export type SummaryStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
    /**
     * Filter which SummaryStats to delete.
     */
    where: SummaryStatsWhereUniqueInput
  }

  /**
   * SummaryStats deleteMany
   */
  export type SummaryStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SummaryStats to delete
     */
    where?: SummaryStatsWhereInput
    /**
     * Limit how many SummaryStats to delete.
     */
    limit?: number
  }

  /**
   * SummaryStats without action
   */
  export type SummaryStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SummaryStats
     */
    select?: SummaryStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SummaryStats
     */
    omit?: SummaryStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SummaryStatsInclude<ExtArgs> | null
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
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SendingDomainScalarFieldEnum: {
    id: 'id',
    domain: 'domain',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type SendingDomainScalarFieldEnum = (typeof SendingDomainScalarFieldEnum)[keyof typeof SendingDomainScalarFieldEnum]


  export const EmailEventScalarFieldEnum: {
    id: 'id',
    webhookEventId: 'webhookEventId',
    messageId: 'messageId',
    status: 'status',
    type: 'type',
    recipient: 'recipient',
    sender: 'sender',
    subject: 'subject',
    sentWithSSL: 'sentWithSSL',
    timeTaken: 'timeTaken',
    spamStatus: 'spamStatus',
    details: 'details',
    timestamp: 'timestamp',
    sendingDomainId: 'sendingDomainId',
    createdAt: 'createdAt'
  };

  export type EmailEventScalarFieldEnum = (typeof EmailEventScalarFieldEnum)[keyof typeof EmailEventScalarFieldEnum]


  export const SummaryStatsScalarFieldEnum: {
    id: 'id',
    sendingDomainId: 'sendingDomainId',
    totalSent: 'totalSent',
    totalDelivered: 'totalDelivered',
    totalFailed: 'totalFailed',
    lastUpdated: 'lastUpdated'
  };

  export type SummaryStatsScalarFieldEnum = (typeof SummaryStatsScalarFieldEnum)[keyof typeof SummaryStatsScalarFieldEnum]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
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
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    sendingDomains?: SendingDomainListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    sendingDomains?: SendingDomainOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kindeId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    sendingDomains?: SendingDomainListRelationFilter
  }, "id" | "kindeId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
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
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SendingDomainWhereInput = {
    AND?: SendingDomainWhereInput | SendingDomainWhereInput[]
    OR?: SendingDomainWhereInput[]
    NOT?: SendingDomainWhereInput | SendingDomainWhereInput[]
    id?: StringFilter<"SendingDomain"> | string
    domain?: StringFilter<"SendingDomain"> | string
    userId?: StringFilter<"SendingDomain"> | string
    createdAt?: DateTimeFilter<"SendingDomain"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    emailEvents?: EmailEventListRelationFilter
    summaryStats?: XOR<SummaryStatsNullableScalarRelationFilter, SummaryStatsWhereInput> | null
  }

  export type SendingDomainOrderByWithRelationInput = {
    id?: SortOrder
    domain?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    emailEvents?: EmailEventOrderByRelationAggregateInput
    summaryStats?: SummaryStatsOrderByWithRelationInput
  }

  export type SendingDomainWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    domain?: string
    AND?: SendingDomainWhereInput | SendingDomainWhereInput[]
    OR?: SendingDomainWhereInput[]
    NOT?: SendingDomainWhereInput | SendingDomainWhereInput[]
    userId?: StringFilter<"SendingDomain"> | string
    createdAt?: DateTimeFilter<"SendingDomain"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    emailEvents?: EmailEventListRelationFilter
    summaryStats?: XOR<SummaryStatsNullableScalarRelationFilter, SummaryStatsWhereInput> | null
  }, "id" | "domain">

  export type SendingDomainOrderByWithAggregationInput = {
    id?: SortOrder
    domain?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: SendingDomainCountOrderByAggregateInput
    _max?: SendingDomainMaxOrderByAggregateInput
    _min?: SendingDomainMinOrderByAggregateInput
  }

  export type SendingDomainScalarWhereWithAggregatesInput = {
    AND?: SendingDomainScalarWhereWithAggregatesInput | SendingDomainScalarWhereWithAggregatesInput[]
    OR?: SendingDomainScalarWhereWithAggregatesInput[]
    NOT?: SendingDomainScalarWhereWithAggregatesInput | SendingDomainScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SendingDomain"> | string
    domain?: StringWithAggregatesFilter<"SendingDomain"> | string
    userId?: StringWithAggregatesFilter<"SendingDomain"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SendingDomain"> | Date | string
  }

  export type EmailEventWhereInput = {
    AND?: EmailEventWhereInput | EmailEventWhereInput[]
    OR?: EmailEventWhereInput[]
    NOT?: EmailEventWhereInput | EmailEventWhereInput[]
    id?: StringFilter<"EmailEvent"> | string
    webhookEventId?: StringFilter<"EmailEvent"> | string
    messageId?: StringFilter<"EmailEvent"> | string
    status?: StringFilter<"EmailEvent"> | string
    type?: StringFilter<"EmailEvent"> | string
    recipient?: StringFilter<"EmailEvent"> | string
    sender?: StringFilter<"EmailEvent"> | string
    subject?: StringFilter<"EmailEvent"> | string
    sentWithSSL?: BoolFilter<"EmailEvent"> | boolean
    timeTaken?: FloatNullableFilter<"EmailEvent"> | number | null
    spamStatus?: IntNullableFilter<"EmailEvent"> | number | null
    details?: StringNullableFilter<"EmailEvent"> | string | null
    timestamp?: FloatFilter<"EmailEvent"> | number
    sendingDomainId?: StringFilter<"EmailEvent"> | string
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
    sendingDomain?: XOR<SendingDomainScalarRelationFilter, SendingDomainWhereInput>
  }

  export type EmailEventOrderByWithRelationInput = {
    id?: SortOrder
    webhookEventId?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipient?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    sentWithSSL?: SortOrder
    timeTaken?: SortOrderInput | SortOrder
    spamStatus?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    sendingDomainId?: SortOrder
    createdAt?: SortOrder
    sendingDomain?: SendingDomainOrderByWithRelationInput
  }

  export type EmailEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    webhookEventId?: string
    messageId?: string
    AND?: EmailEventWhereInput | EmailEventWhereInput[]
    OR?: EmailEventWhereInput[]
    NOT?: EmailEventWhereInput | EmailEventWhereInput[]
    status?: StringFilter<"EmailEvent"> | string
    type?: StringFilter<"EmailEvent"> | string
    recipient?: StringFilter<"EmailEvent"> | string
    sender?: StringFilter<"EmailEvent"> | string
    subject?: StringFilter<"EmailEvent"> | string
    sentWithSSL?: BoolFilter<"EmailEvent"> | boolean
    timeTaken?: FloatNullableFilter<"EmailEvent"> | number | null
    spamStatus?: IntNullableFilter<"EmailEvent"> | number | null
    details?: StringNullableFilter<"EmailEvent"> | string | null
    timestamp?: FloatFilter<"EmailEvent"> | number
    sendingDomainId?: StringFilter<"EmailEvent"> | string
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
    sendingDomain?: XOR<SendingDomainScalarRelationFilter, SendingDomainWhereInput>
  }, "id" | "webhookEventId" | "messageId">

  export type EmailEventOrderByWithAggregationInput = {
    id?: SortOrder
    webhookEventId?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipient?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    sentWithSSL?: SortOrder
    timeTaken?: SortOrderInput | SortOrder
    spamStatus?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    sendingDomainId?: SortOrder
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
    webhookEventId?: StringWithAggregatesFilter<"EmailEvent"> | string
    messageId?: StringWithAggregatesFilter<"EmailEvent"> | string
    status?: StringWithAggregatesFilter<"EmailEvent"> | string
    type?: StringWithAggregatesFilter<"EmailEvent"> | string
    recipient?: StringWithAggregatesFilter<"EmailEvent"> | string
    sender?: StringWithAggregatesFilter<"EmailEvent"> | string
    subject?: StringWithAggregatesFilter<"EmailEvent"> | string
    sentWithSSL?: BoolWithAggregatesFilter<"EmailEvent"> | boolean
    timeTaken?: FloatNullableWithAggregatesFilter<"EmailEvent"> | number | null
    spamStatus?: IntNullableWithAggregatesFilter<"EmailEvent"> | number | null
    details?: StringNullableWithAggregatesFilter<"EmailEvent"> | string | null
    timestamp?: FloatWithAggregatesFilter<"EmailEvent"> | number
    sendingDomainId?: StringWithAggregatesFilter<"EmailEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmailEvent"> | Date | string
  }

  export type SummaryStatsWhereInput = {
    AND?: SummaryStatsWhereInput | SummaryStatsWhereInput[]
    OR?: SummaryStatsWhereInput[]
    NOT?: SummaryStatsWhereInput | SummaryStatsWhereInput[]
    id?: StringFilter<"SummaryStats"> | string
    sendingDomainId?: StringFilter<"SummaryStats"> | string
    totalSent?: IntFilter<"SummaryStats"> | number
    totalDelivered?: IntFilter<"SummaryStats"> | number
    totalFailed?: IntFilter<"SummaryStats"> | number
    lastUpdated?: DateTimeFilter<"SummaryStats"> | Date | string
    sendingDomain?: XOR<SendingDomainScalarRelationFilter, SendingDomainWhereInput>
  }

  export type SummaryStatsOrderByWithRelationInput = {
    id?: SortOrder
    sendingDomainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    lastUpdated?: SortOrder
    sendingDomain?: SendingDomainOrderByWithRelationInput
  }

  export type SummaryStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sendingDomainId?: string
    AND?: SummaryStatsWhereInput | SummaryStatsWhereInput[]
    OR?: SummaryStatsWhereInput[]
    NOT?: SummaryStatsWhereInput | SummaryStatsWhereInput[]
    totalSent?: IntFilter<"SummaryStats"> | number
    totalDelivered?: IntFilter<"SummaryStats"> | number
    totalFailed?: IntFilter<"SummaryStats"> | number
    lastUpdated?: DateTimeFilter<"SummaryStats"> | Date | string
    sendingDomain?: XOR<SendingDomainScalarRelationFilter, SendingDomainWhereInput>
  }, "id" | "sendingDomainId">

  export type SummaryStatsOrderByWithAggregationInput = {
    id?: SortOrder
    sendingDomainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    lastUpdated?: SortOrder
    _count?: SummaryStatsCountOrderByAggregateInput
    _avg?: SummaryStatsAvgOrderByAggregateInput
    _max?: SummaryStatsMaxOrderByAggregateInput
    _min?: SummaryStatsMinOrderByAggregateInput
    _sum?: SummaryStatsSumOrderByAggregateInput
  }

  export type SummaryStatsScalarWhereWithAggregatesInput = {
    AND?: SummaryStatsScalarWhereWithAggregatesInput | SummaryStatsScalarWhereWithAggregatesInput[]
    OR?: SummaryStatsScalarWhereWithAggregatesInput[]
    NOT?: SummaryStatsScalarWhereWithAggregatesInput | SummaryStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SummaryStats"> | string
    sendingDomainId?: StringWithAggregatesFilter<"SummaryStats"> | string
    totalSent?: IntWithAggregatesFilter<"SummaryStats"> | number
    totalDelivered?: IntWithAggregatesFilter<"SummaryStats"> | number
    totalFailed?: IntWithAggregatesFilter<"SummaryStats"> | number
    lastUpdated?: DateTimeWithAggregatesFilter<"SummaryStats"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    kindeId: string
    email: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    sendingDomains?: SendingDomainCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    kindeId: string
    email: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    sendingDomains?: SendingDomainUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sendingDomains?: SendingDomainUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sendingDomains?: SendingDomainUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    kindeId: string
    email: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SendingDomainCreateInput = {
    id?: string
    domain: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSendingDomainsInput
    emailEvents?: EmailEventCreateNestedManyWithoutSendingDomainInput
    summaryStats?: SummaryStatsCreateNestedOneWithoutSendingDomainInput
  }

  export type SendingDomainUncheckedCreateInput = {
    id?: string
    domain: string
    userId: string
    createdAt?: Date | string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutSendingDomainInput
    summaryStats?: SummaryStatsUncheckedCreateNestedOneWithoutSendingDomainInput
  }

  export type SendingDomainUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSendingDomainsNestedInput
    emailEvents?: EmailEventUpdateManyWithoutSendingDomainNestedInput
    summaryStats?: SummaryStatsUpdateOneWithoutSendingDomainNestedInput
  }

  export type SendingDomainUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutSendingDomainNestedInput
    summaryStats?: SummaryStatsUncheckedUpdateOneWithoutSendingDomainNestedInput
  }

  export type SendingDomainCreateManyInput = {
    id?: string
    domain: string
    userId: string
    createdAt?: Date | string
  }

  export type SendingDomainUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SendingDomainUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventCreateInput = {
    id?: string
    webhookEventId: string
    messageId: string
    status: string
    type: string
    recipient: string
    sender: string
    subject: string
    sentWithSSL: boolean
    timeTaken?: number | null
    spamStatus?: number | null
    details?: string | null
    timestamp: number
    createdAt?: Date | string
    sendingDomain: SendingDomainCreateNestedOneWithoutEmailEventsInput
  }

  export type EmailEventUncheckedCreateInput = {
    id?: string
    webhookEventId: string
    messageId: string
    status: string
    type: string
    recipient: string
    sender: string
    subject: string
    sentWithSSL: boolean
    timeTaken?: number | null
    spamStatus?: number | null
    details?: string | null
    timestamp: number
    sendingDomainId: string
    createdAt?: Date | string
  }

  export type EmailEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookEventId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    sentWithSSL?: BoolFieldUpdateOperationsInput | boolean
    timeTaken?: NullableFloatFieldUpdateOperationsInput | number | null
    spamStatus?: NullableIntFieldUpdateOperationsInput | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sendingDomain?: SendingDomainUpdateOneRequiredWithoutEmailEventsNestedInput
  }

  export type EmailEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookEventId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    sentWithSSL?: BoolFieldUpdateOperationsInput | boolean
    timeTaken?: NullableFloatFieldUpdateOperationsInput | number | null
    spamStatus?: NullableIntFieldUpdateOperationsInput | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: FloatFieldUpdateOperationsInput | number
    sendingDomainId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventCreateManyInput = {
    id?: string
    webhookEventId: string
    messageId: string
    status: string
    type: string
    recipient: string
    sender: string
    subject: string
    sentWithSSL: boolean
    timeTaken?: number | null
    spamStatus?: number | null
    details?: string | null
    timestamp: number
    sendingDomainId: string
    createdAt?: Date | string
  }

  export type EmailEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookEventId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    sentWithSSL?: BoolFieldUpdateOperationsInput | boolean
    timeTaken?: NullableFloatFieldUpdateOperationsInput | number | null
    spamStatus?: NullableIntFieldUpdateOperationsInput | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookEventId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    sentWithSSL?: BoolFieldUpdateOperationsInput | boolean
    timeTaken?: NullableFloatFieldUpdateOperationsInput | number | null
    spamStatus?: NullableIntFieldUpdateOperationsInput | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: FloatFieldUpdateOperationsInput | number
    sendingDomainId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SummaryStatsCreateInput = {
    id?: string
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    lastUpdated?: Date | string
    sendingDomain: SendingDomainCreateNestedOneWithoutSummaryStatsInput
  }

  export type SummaryStatsUncheckedCreateInput = {
    id?: string
    sendingDomainId: string
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    lastUpdated?: Date | string
  }

  export type SummaryStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    sendingDomain?: SendingDomainUpdateOneRequiredWithoutSummaryStatsNestedInput
  }

  export type SummaryStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sendingDomainId?: StringFieldUpdateOperationsInput | string
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SummaryStatsCreateManyInput = {
    id?: string
    sendingDomainId: string
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    lastUpdated?: Date | string
  }

  export type SummaryStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SummaryStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sendingDomainId?: StringFieldUpdateOperationsInput | string
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type SendingDomainListRelationFilter = {
    every?: SendingDomainWhereInput
    some?: SendingDomainWhereInput
    none?: SendingDomainWhereInput
  }

  export type SendingDomainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    kindeId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EmailEventListRelationFilter = {
    every?: EmailEventWhereInput
    some?: EmailEventWhereInput
    none?: EmailEventWhereInput
  }

  export type SummaryStatsNullableScalarRelationFilter = {
    is?: SummaryStatsWhereInput | null
    isNot?: SummaryStatsWhereInput | null
  }

  export type EmailEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SendingDomainCountOrderByAggregateInput = {
    id?: SortOrder
    domain?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type SendingDomainMaxOrderByAggregateInput = {
    id?: SortOrder
    domain?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type SendingDomainMinOrderByAggregateInput = {
    id?: SortOrder
    domain?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SendingDomainScalarRelationFilter = {
    is?: SendingDomainWhereInput
    isNot?: SendingDomainWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmailEventCountOrderByAggregateInput = {
    id?: SortOrder
    webhookEventId?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipient?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    sentWithSSL?: SortOrder
    timeTaken?: SortOrder
    spamStatus?: SortOrder
    details?: SortOrder
    timestamp?: SortOrder
    sendingDomainId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailEventAvgOrderByAggregateInput = {
    timeTaken?: SortOrder
    spamStatus?: SortOrder
    timestamp?: SortOrder
  }

  export type EmailEventMaxOrderByAggregateInput = {
    id?: SortOrder
    webhookEventId?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipient?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    sentWithSSL?: SortOrder
    timeTaken?: SortOrder
    spamStatus?: SortOrder
    details?: SortOrder
    timestamp?: SortOrder
    sendingDomainId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailEventMinOrderByAggregateInput = {
    id?: SortOrder
    webhookEventId?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    recipient?: SortOrder
    sender?: SortOrder
    subject?: SortOrder
    sentWithSSL?: SortOrder
    timeTaken?: SortOrder
    spamStatus?: SortOrder
    details?: SortOrder
    timestamp?: SortOrder
    sendingDomainId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailEventSumOrderByAggregateInput = {
    timeTaken?: SortOrder
    spamStatus?: SortOrder
    timestamp?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type SummaryStatsCountOrderByAggregateInput = {
    id?: SortOrder
    sendingDomainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    lastUpdated?: SortOrder
  }

  export type SummaryStatsAvgOrderByAggregateInput = {
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
  }

  export type SummaryStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    sendingDomainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    lastUpdated?: SortOrder
  }

  export type SummaryStatsMinOrderByAggregateInput = {
    id?: SortOrder
    sendingDomainId?: SortOrder
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
    lastUpdated?: SortOrder
  }

  export type SummaryStatsSumOrderByAggregateInput = {
    totalSent?: SortOrder
    totalDelivered?: SortOrder
    totalFailed?: SortOrder
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

  export type SendingDomainCreateNestedManyWithoutUserInput = {
    create?: XOR<SendingDomainCreateWithoutUserInput, SendingDomainUncheckedCreateWithoutUserInput> | SendingDomainCreateWithoutUserInput[] | SendingDomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SendingDomainCreateOrConnectWithoutUserInput | SendingDomainCreateOrConnectWithoutUserInput[]
    createMany?: SendingDomainCreateManyUserInputEnvelope
    connect?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
  }

  export type SendingDomainUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SendingDomainCreateWithoutUserInput, SendingDomainUncheckedCreateWithoutUserInput> | SendingDomainCreateWithoutUserInput[] | SendingDomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SendingDomainCreateOrConnectWithoutUserInput | SendingDomainCreateOrConnectWithoutUserInput[]
    createMany?: SendingDomainCreateManyUserInputEnvelope
    connect?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SendingDomainUpdateManyWithoutUserNestedInput = {
    create?: XOR<SendingDomainCreateWithoutUserInput, SendingDomainUncheckedCreateWithoutUserInput> | SendingDomainCreateWithoutUserInput[] | SendingDomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SendingDomainCreateOrConnectWithoutUserInput | SendingDomainCreateOrConnectWithoutUserInput[]
    upsert?: SendingDomainUpsertWithWhereUniqueWithoutUserInput | SendingDomainUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SendingDomainCreateManyUserInputEnvelope
    set?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
    disconnect?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
    delete?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
    connect?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
    update?: SendingDomainUpdateWithWhereUniqueWithoutUserInput | SendingDomainUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SendingDomainUpdateManyWithWhereWithoutUserInput | SendingDomainUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SendingDomainScalarWhereInput | SendingDomainScalarWhereInput[]
  }

  export type SendingDomainUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SendingDomainCreateWithoutUserInput, SendingDomainUncheckedCreateWithoutUserInput> | SendingDomainCreateWithoutUserInput[] | SendingDomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SendingDomainCreateOrConnectWithoutUserInput | SendingDomainCreateOrConnectWithoutUserInput[]
    upsert?: SendingDomainUpsertWithWhereUniqueWithoutUserInput | SendingDomainUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SendingDomainCreateManyUserInputEnvelope
    set?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
    disconnect?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
    delete?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
    connect?: SendingDomainWhereUniqueInput | SendingDomainWhereUniqueInput[]
    update?: SendingDomainUpdateWithWhereUniqueWithoutUserInput | SendingDomainUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SendingDomainUpdateManyWithWhereWithoutUserInput | SendingDomainUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SendingDomainScalarWhereInput | SendingDomainScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSendingDomainsInput = {
    create?: XOR<UserCreateWithoutSendingDomainsInput, UserUncheckedCreateWithoutSendingDomainsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSendingDomainsInput
    connect?: UserWhereUniqueInput
  }

  export type EmailEventCreateNestedManyWithoutSendingDomainInput = {
    create?: XOR<EmailEventCreateWithoutSendingDomainInput, EmailEventUncheckedCreateWithoutSendingDomainInput> | EmailEventCreateWithoutSendingDomainInput[] | EmailEventUncheckedCreateWithoutSendingDomainInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutSendingDomainInput | EmailEventCreateOrConnectWithoutSendingDomainInput[]
    createMany?: EmailEventCreateManySendingDomainInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type SummaryStatsCreateNestedOneWithoutSendingDomainInput = {
    create?: XOR<SummaryStatsCreateWithoutSendingDomainInput, SummaryStatsUncheckedCreateWithoutSendingDomainInput>
    connectOrCreate?: SummaryStatsCreateOrConnectWithoutSendingDomainInput
    connect?: SummaryStatsWhereUniqueInput
  }

  export type EmailEventUncheckedCreateNestedManyWithoutSendingDomainInput = {
    create?: XOR<EmailEventCreateWithoutSendingDomainInput, EmailEventUncheckedCreateWithoutSendingDomainInput> | EmailEventCreateWithoutSendingDomainInput[] | EmailEventUncheckedCreateWithoutSendingDomainInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutSendingDomainInput | EmailEventCreateOrConnectWithoutSendingDomainInput[]
    createMany?: EmailEventCreateManySendingDomainInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type SummaryStatsUncheckedCreateNestedOneWithoutSendingDomainInput = {
    create?: XOR<SummaryStatsCreateWithoutSendingDomainInput, SummaryStatsUncheckedCreateWithoutSendingDomainInput>
    connectOrCreate?: SummaryStatsCreateOrConnectWithoutSendingDomainInput
    connect?: SummaryStatsWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSendingDomainsNestedInput = {
    create?: XOR<UserCreateWithoutSendingDomainsInput, UserUncheckedCreateWithoutSendingDomainsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSendingDomainsInput
    upsert?: UserUpsertWithoutSendingDomainsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSendingDomainsInput, UserUpdateWithoutSendingDomainsInput>, UserUncheckedUpdateWithoutSendingDomainsInput>
  }

  export type EmailEventUpdateManyWithoutSendingDomainNestedInput = {
    create?: XOR<EmailEventCreateWithoutSendingDomainInput, EmailEventUncheckedCreateWithoutSendingDomainInput> | EmailEventCreateWithoutSendingDomainInput[] | EmailEventUncheckedCreateWithoutSendingDomainInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutSendingDomainInput | EmailEventCreateOrConnectWithoutSendingDomainInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutSendingDomainInput | EmailEventUpsertWithWhereUniqueWithoutSendingDomainInput[]
    createMany?: EmailEventCreateManySendingDomainInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutSendingDomainInput | EmailEventUpdateWithWhereUniqueWithoutSendingDomainInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutSendingDomainInput | EmailEventUpdateManyWithWhereWithoutSendingDomainInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type SummaryStatsUpdateOneWithoutSendingDomainNestedInput = {
    create?: XOR<SummaryStatsCreateWithoutSendingDomainInput, SummaryStatsUncheckedCreateWithoutSendingDomainInput>
    connectOrCreate?: SummaryStatsCreateOrConnectWithoutSendingDomainInput
    upsert?: SummaryStatsUpsertWithoutSendingDomainInput
    disconnect?: SummaryStatsWhereInput | boolean
    delete?: SummaryStatsWhereInput | boolean
    connect?: SummaryStatsWhereUniqueInput
    update?: XOR<XOR<SummaryStatsUpdateToOneWithWhereWithoutSendingDomainInput, SummaryStatsUpdateWithoutSendingDomainInput>, SummaryStatsUncheckedUpdateWithoutSendingDomainInput>
  }

  export type EmailEventUncheckedUpdateManyWithoutSendingDomainNestedInput = {
    create?: XOR<EmailEventCreateWithoutSendingDomainInput, EmailEventUncheckedCreateWithoutSendingDomainInput> | EmailEventCreateWithoutSendingDomainInput[] | EmailEventUncheckedCreateWithoutSendingDomainInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutSendingDomainInput | EmailEventCreateOrConnectWithoutSendingDomainInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutSendingDomainInput | EmailEventUpsertWithWhereUniqueWithoutSendingDomainInput[]
    createMany?: EmailEventCreateManySendingDomainInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutSendingDomainInput | EmailEventUpdateWithWhereUniqueWithoutSendingDomainInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutSendingDomainInput | EmailEventUpdateManyWithWhereWithoutSendingDomainInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type SummaryStatsUncheckedUpdateOneWithoutSendingDomainNestedInput = {
    create?: XOR<SummaryStatsCreateWithoutSendingDomainInput, SummaryStatsUncheckedCreateWithoutSendingDomainInput>
    connectOrCreate?: SummaryStatsCreateOrConnectWithoutSendingDomainInput
    upsert?: SummaryStatsUpsertWithoutSendingDomainInput
    disconnect?: SummaryStatsWhereInput | boolean
    delete?: SummaryStatsWhereInput | boolean
    connect?: SummaryStatsWhereUniqueInput
    update?: XOR<XOR<SummaryStatsUpdateToOneWithWhereWithoutSendingDomainInput, SummaryStatsUpdateWithoutSendingDomainInput>, SummaryStatsUncheckedUpdateWithoutSendingDomainInput>
  }

  export type SendingDomainCreateNestedOneWithoutEmailEventsInput = {
    create?: XOR<SendingDomainCreateWithoutEmailEventsInput, SendingDomainUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: SendingDomainCreateOrConnectWithoutEmailEventsInput
    connect?: SendingDomainWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SendingDomainUpdateOneRequiredWithoutEmailEventsNestedInput = {
    create?: XOR<SendingDomainCreateWithoutEmailEventsInput, SendingDomainUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: SendingDomainCreateOrConnectWithoutEmailEventsInput
    upsert?: SendingDomainUpsertWithoutEmailEventsInput
    connect?: SendingDomainWhereUniqueInput
    update?: XOR<XOR<SendingDomainUpdateToOneWithWhereWithoutEmailEventsInput, SendingDomainUpdateWithoutEmailEventsInput>, SendingDomainUncheckedUpdateWithoutEmailEventsInput>
  }

  export type SendingDomainCreateNestedOneWithoutSummaryStatsInput = {
    create?: XOR<SendingDomainCreateWithoutSummaryStatsInput, SendingDomainUncheckedCreateWithoutSummaryStatsInput>
    connectOrCreate?: SendingDomainCreateOrConnectWithoutSummaryStatsInput
    connect?: SendingDomainWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SendingDomainUpdateOneRequiredWithoutSummaryStatsNestedInput = {
    create?: XOR<SendingDomainCreateWithoutSummaryStatsInput, SendingDomainUncheckedCreateWithoutSummaryStatsInput>
    connectOrCreate?: SendingDomainCreateOrConnectWithoutSummaryStatsInput
    upsert?: SendingDomainUpsertWithoutSummaryStatsInput
    connect?: SendingDomainWhereUniqueInput
    update?: XOR<XOR<SendingDomainUpdateToOneWithWhereWithoutSummaryStatsInput, SendingDomainUpdateWithoutSummaryStatsInput>, SendingDomainUncheckedUpdateWithoutSummaryStatsInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type SendingDomainCreateWithoutUserInput = {
    id?: string
    domain: string
    createdAt?: Date | string
    emailEvents?: EmailEventCreateNestedManyWithoutSendingDomainInput
    summaryStats?: SummaryStatsCreateNestedOneWithoutSendingDomainInput
  }

  export type SendingDomainUncheckedCreateWithoutUserInput = {
    id?: string
    domain: string
    createdAt?: Date | string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutSendingDomainInput
    summaryStats?: SummaryStatsUncheckedCreateNestedOneWithoutSendingDomainInput
  }

  export type SendingDomainCreateOrConnectWithoutUserInput = {
    where: SendingDomainWhereUniqueInput
    create: XOR<SendingDomainCreateWithoutUserInput, SendingDomainUncheckedCreateWithoutUserInput>
  }

  export type SendingDomainCreateManyUserInputEnvelope = {
    data: SendingDomainCreateManyUserInput | SendingDomainCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SendingDomainUpsertWithWhereUniqueWithoutUserInput = {
    where: SendingDomainWhereUniqueInput
    update: XOR<SendingDomainUpdateWithoutUserInput, SendingDomainUncheckedUpdateWithoutUserInput>
    create: XOR<SendingDomainCreateWithoutUserInput, SendingDomainUncheckedCreateWithoutUserInput>
  }

  export type SendingDomainUpdateWithWhereUniqueWithoutUserInput = {
    where: SendingDomainWhereUniqueInput
    data: XOR<SendingDomainUpdateWithoutUserInput, SendingDomainUncheckedUpdateWithoutUserInput>
  }

  export type SendingDomainUpdateManyWithWhereWithoutUserInput = {
    where: SendingDomainScalarWhereInput
    data: XOR<SendingDomainUpdateManyMutationInput, SendingDomainUncheckedUpdateManyWithoutUserInput>
  }

  export type SendingDomainScalarWhereInput = {
    AND?: SendingDomainScalarWhereInput | SendingDomainScalarWhereInput[]
    OR?: SendingDomainScalarWhereInput[]
    NOT?: SendingDomainScalarWhereInput | SendingDomainScalarWhereInput[]
    id?: StringFilter<"SendingDomain"> | string
    domain?: StringFilter<"SendingDomain"> | string
    userId?: StringFilter<"SendingDomain"> | string
    createdAt?: DateTimeFilter<"SendingDomain"> | Date | string
  }

  export type UserCreateWithoutSendingDomainsInput = {
    id?: string
    kindeId: string
    email: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutSendingDomainsInput = {
    id?: string
    kindeId: string
    email: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutSendingDomainsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSendingDomainsInput, UserUncheckedCreateWithoutSendingDomainsInput>
  }

  export type EmailEventCreateWithoutSendingDomainInput = {
    id?: string
    webhookEventId: string
    messageId: string
    status: string
    type: string
    recipient: string
    sender: string
    subject: string
    sentWithSSL: boolean
    timeTaken?: number | null
    spamStatus?: number | null
    details?: string | null
    timestamp: number
    createdAt?: Date | string
  }

  export type EmailEventUncheckedCreateWithoutSendingDomainInput = {
    id?: string
    webhookEventId: string
    messageId: string
    status: string
    type: string
    recipient: string
    sender: string
    subject: string
    sentWithSSL: boolean
    timeTaken?: number | null
    spamStatus?: number | null
    details?: string | null
    timestamp: number
    createdAt?: Date | string
  }

  export type EmailEventCreateOrConnectWithoutSendingDomainInput = {
    where: EmailEventWhereUniqueInput
    create: XOR<EmailEventCreateWithoutSendingDomainInput, EmailEventUncheckedCreateWithoutSendingDomainInput>
  }

  export type EmailEventCreateManySendingDomainInputEnvelope = {
    data: EmailEventCreateManySendingDomainInput | EmailEventCreateManySendingDomainInput[]
    skipDuplicates?: boolean
  }

  export type SummaryStatsCreateWithoutSendingDomainInput = {
    id?: string
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    lastUpdated?: Date | string
  }

  export type SummaryStatsUncheckedCreateWithoutSendingDomainInput = {
    id?: string
    totalSent?: number
    totalDelivered?: number
    totalFailed?: number
    lastUpdated?: Date | string
  }

  export type SummaryStatsCreateOrConnectWithoutSendingDomainInput = {
    where: SummaryStatsWhereUniqueInput
    create: XOR<SummaryStatsCreateWithoutSendingDomainInput, SummaryStatsUncheckedCreateWithoutSendingDomainInput>
  }

  export type UserUpsertWithoutSendingDomainsInput = {
    update: XOR<UserUpdateWithoutSendingDomainsInput, UserUncheckedUpdateWithoutSendingDomainsInput>
    create: XOR<UserCreateWithoutSendingDomainsInput, UserUncheckedCreateWithoutSendingDomainsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSendingDomainsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSendingDomainsInput, UserUncheckedUpdateWithoutSendingDomainsInput>
  }

  export type UserUpdateWithoutSendingDomainsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutSendingDomainsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kindeId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUpsertWithWhereUniqueWithoutSendingDomainInput = {
    where: EmailEventWhereUniqueInput
    update: XOR<EmailEventUpdateWithoutSendingDomainInput, EmailEventUncheckedUpdateWithoutSendingDomainInput>
    create: XOR<EmailEventCreateWithoutSendingDomainInput, EmailEventUncheckedCreateWithoutSendingDomainInput>
  }

  export type EmailEventUpdateWithWhereUniqueWithoutSendingDomainInput = {
    where: EmailEventWhereUniqueInput
    data: XOR<EmailEventUpdateWithoutSendingDomainInput, EmailEventUncheckedUpdateWithoutSendingDomainInput>
  }

  export type EmailEventUpdateManyWithWhereWithoutSendingDomainInput = {
    where: EmailEventScalarWhereInput
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyWithoutSendingDomainInput>
  }

  export type EmailEventScalarWhereInput = {
    AND?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
    OR?: EmailEventScalarWhereInput[]
    NOT?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
    id?: StringFilter<"EmailEvent"> | string
    webhookEventId?: StringFilter<"EmailEvent"> | string
    messageId?: StringFilter<"EmailEvent"> | string
    status?: StringFilter<"EmailEvent"> | string
    type?: StringFilter<"EmailEvent"> | string
    recipient?: StringFilter<"EmailEvent"> | string
    sender?: StringFilter<"EmailEvent"> | string
    subject?: StringFilter<"EmailEvent"> | string
    sentWithSSL?: BoolFilter<"EmailEvent"> | boolean
    timeTaken?: FloatNullableFilter<"EmailEvent"> | number | null
    spamStatus?: IntNullableFilter<"EmailEvent"> | number | null
    details?: StringNullableFilter<"EmailEvent"> | string | null
    timestamp?: FloatFilter<"EmailEvent"> | number
    sendingDomainId?: StringFilter<"EmailEvent"> | string
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
  }

  export type SummaryStatsUpsertWithoutSendingDomainInput = {
    update: XOR<SummaryStatsUpdateWithoutSendingDomainInput, SummaryStatsUncheckedUpdateWithoutSendingDomainInput>
    create: XOR<SummaryStatsCreateWithoutSendingDomainInput, SummaryStatsUncheckedCreateWithoutSendingDomainInput>
    where?: SummaryStatsWhereInput
  }

  export type SummaryStatsUpdateToOneWithWhereWithoutSendingDomainInput = {
    where?: SummaryStatsWhereInput
    data: XOR<SummaryStatsUpdateWithoutSendingDomainInput, SummaryStatsUncheckedUpdateWithoutSendingDomainInput>
  }

  export type SummaryStatsUpdateWithoutSendingDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SummaryStatsUncheckedUpdateWithoutSendingDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalSent?: IntFieldUpdateOperationsInput | number
    totalDelivered?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SendingDomainCreateWithoutEmailEventsInput = {
    id?: string
    domain: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSendingDomainsInput
    summaryStats?: SummaryStatsCreateNestedOneWithoutSendingDomainInput
  }

  export type SendingDomainUncheckedCreateWithoutEmailEventsInput = {
    id?: string
    domain: string
    userId: string
    createdAt?: Date | string
    summaryStats?: SummaryStatsUncheckedCreateNestedOneWithoutSendingDomainInput
  }

  export type SendingDomainCreateOrConnectWithoutEmailEventsInput = {
    where: SendingDomainWhereUniqueInput
    create: XOR<SendingDomainCreateWithoutEmailEventsInput, SendingDomainUncheckedCreateWithoutEmailEventsInput>
  }

  export type SendingDomainUpsertWithoutEmailEventsInput = {
    update: XOR<SendingDomainUpdateWithoutEmailEventsInput, SendingDomainUncheckedUpdateWithoutEmailEventsInput>
    create: XOR<SendingDomainCreateWithoutEmailEventsInput, SendingDomainUncheckedCreateWithoutEmailEventsInput>
    where?: SendingDomainWhereInput
  }

  export type SendingDomainUpdateToOneWithWhereWithoutEmailEventsInput = {
    where?: SendingDomainWhereInput
    data: XOR<SendingDomainUpdateWithoutEmailEventsInput, SendingDomainUncheckedUpdateWithoutEmailEventsInput>
  }

  export type SendingDomainUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSendingDomainsNestedInput
    summaryStats?: SummaryStatsUpdateOneWithoutSendingDomainNestedInput
  }

  export type SendingDomainUncheckedUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    summaryStats?: SummaryStatsUncheckedUpdateOneWithoutSendingDomainNestedInput
  }

  export type SendingDomainCreateWithoutSummaryStatsInput = {
    id?: string
    domain: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSendingDomainsInput
    emailEvents?: EmailEventCreateNestedManyWithoutSendingDomainInput
  }

  export type SendingDomainUncheckedCreateWithoutSummaryStatsInput = {
    id?: string
    domain: string
    userId: string
    createdAt?: Date | string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutSendingDomainInput
  }

  export type SendingDomainCreateOrConnectWithoutSummaryStatsInput = {
    where: SendingDomainWhereUniqueInput
    create: XOR<SendingDomainCreateWithoutSummaryStatsInput, SendingDomainUncheckedCreateWithoutSummaryStatsInput>
  }

  export type SendingDomainUpsertWithoutSummaryStatsInput = {
    update: XOR<SendingDomainUpdateWithoutSummaryStatsInput, SendingDomainUncheckedUpdateWithoutSummaryStatsInput>
    create: XOR<SendingDomainCreateWithoutSummaryStatsInput, SendingDomainUncheckedCreateWithoutSummaryStatsInput>
    where?: SendingDomainWhereInput
  }

  export type SendingDomainUpdateToOneWithWhereWithoutSummaryStatsInput = {
    where?: SendingDomainWhereInput
    data: XOR<SendingDomainUpdateWithoutSummaryStatsInput, SendingDomainUncheckedUpdateWithoutSummaryStatsInput>
  }

  export type SendingDomainUpdateWithoutSummaryStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSendingDomainsNestedInput
    emailEvents?: EmailEventUpdateManyWithoutSendingDomainNestedInput
  }

  export type SendingDomainUncheckedUpdateWithoutSummaryStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutSendingDomainNestedInput
  }

  export type SendingDomainCreateManyUserInput = {
    id?: string
    domain: string
    createdAt?: Date | string
  }

  export type SendingDomainUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: EmailEventUpdateManyWithoutSendingDomainNestedInput
    summaryStats?: SummaryStatsUpdateOneWithoutSendingDomainNestedInput
  }

  export type SendingDomainUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutSendingDomainNestedInput
    summaryStats?: SummaryStatsUncheckedUpdateOneWithoutSendingDomainNestedInput
  }

  export type SendingDomainUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventCreateManySendingDomainInput = {
    id?: string
    webhookEventId: string
    messageId: string
    status: string
    type: string
    recipient: string
    sender: string
    subject: string
    sentWithSSL: boolean
    timeTaken?: number | null
    spamStatus?: number | null
    details?: string | null
    timestamp: number
    createdAt?: Date | string
  }

  export type EmailEventUpdateWithoutSendingDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookEventId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    sentWithSSL?: BoolFieldUpdateOperationsInput | boolean
    timeTaken?: NullableFloatFieldUpdateOperationsInput | number | null
    spamStatus?: NullableIntFieldUpdateOperationsInput | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateWithoutSendingDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookEventId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    sentWithSSL?: BoolFieldUpdateOperationsInput | boolean
    timeTaken?: NullableFloatFieldUpdateOperationsInput | number | null
    spamStatus?: NullableIntFieldUpdateOperationsInput | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateManyWithoutSendingDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookEventId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    sentWithSSL?: BoolFieldUpdateOperationsInput | boolean
    timeTaken?: NullableFloatFieldUpdateOperationsInput | number | null
    spamStatus?: NullableIntFieldUpdateOperationsInput | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: FloatFieldUpdateOperationsInput | number
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