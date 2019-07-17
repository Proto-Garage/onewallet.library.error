/* eslint-disable @typescript-eslint/no-use-before-define */
import R from 'ramda';
import serializeError from 'serialize-error';
import knownErrors from './known-errors';

class BaseError<TAttributes = Record<string, any>> extends Error {
  public constructor(
    public readonly code: string,
    message: string,
    private readonly meta?: Record<string, any>,
  ) {
    super(message);
  }

  public toJSON(): TAttributes & { code: string; message: string; stack: string } {
    return {
      ...(this.meta || {}) as any,
      code: this.code,
      message: this.message,
      stack: this.stack,
    };
  }
}

type Service = keyof typeof knownErrors;
export class AppError<TAttributes = Record<string, any>>
  extends BaseError<TAttributes> {
  public readonly service: Service;

  public constructor(
    code: string,
    message: string,
    meta?: TAttributes,
    service?: Service,
  ) {
    super(code, message, meta);

    this.service = (service || process.env.SERVICE_NAME) as Service;

    this.name = 'AppError';
  }

  /**
   * Serialize error object so that it can be sent via network.
   */
  public toJSON(): TAttributes & {
    code: string;
    message: string;
    stack: string;
    service: Service;
  } {
    return {
      ...super.toJSON(),
      service: this.service,
    };
  }

  /**
   * Create an AppError given a serialized error object.
   */
  public static fromJSON(obj: Record<string, any> & {
    code: string;
    message: string;
    stack: string;
    service: Service;
  }) {
    const error = new this(obj.code, obj.message, R.omit(['code', 'message', 'stack', 'service'])(obj), obj.service);
    error.stack = obj.stack;
    return error;
  }
}

export enum APIErrorCode {
  TokenExpired = 'TOKEN_EXPIRED',
  InvalidInput = 'INVALID_INPUT',
  InvalidOperation = 'INVALID_OPERATION',
  ForbiddenOperation = 'FORBIDDEN_OPERATION',
  ServerError = 'SERVER_ERROR'
}

export class APIError<TAttributes = Record<string, any>> extends BaseError<TAttributes> {
  public constructor(
    public readonly code: APIErrorCode,
    message: string,
    meta?: Record<string, any>,
  ) {
    super(code, message, meta);

    this.name = 'APIError';
  }

  public static fromError(error: Error) {
    if (error instanceof AppError && R.hasPath([error.service, error.code])(knownErrors)) {
      return new InvalidOperationError(error);
    }

    return new ServerError(error);
  }
}

export class TokenExpiredError extends APIError {
  public constructor() {
    super(APIErrorCode.TokenExpired, 'Access token has expired.');
  }
}

export class InvalidInputError extends APIError {
  public constructor(message: string, meta?: Record<string, any>) {
    super(APIErrorCode.InvalidInput, message, meta);
  }
}

export class ForbiddenOperation extends APIError {
  public constructor(message?: string) {
    super(APIErrorCode.InvalidInput, message || 'Not enough access privileges to execute operation.');
  }
}

function normalizeError(error: Error) {
  if (error instanceof Error) {
    return error;
  }

  return serializeError(error);
}
export class InvalidOperationError extends APIError {
  public constructor(original: Error) {
    super(APIErrorCode.InvalidOperation, original.message, { original: normalizeError(original) });
  }
}

export class ServerError extends APIError {
  public constructor(original: Error) {
    super(
      APIErrorCode.ServerError, original.message,
      { original: normalizeError(original) },
    );
  }
}
