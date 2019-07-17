import knownErrors from './known-errors';
export declare class BaseError<TAttributes = Record<string, any>> extends Error {
    readonly code: string;
    private readonly meta?;
    constructor(code: string, message: string, meta?: Record<string, any> | undefined);
    toJSON(): TAttributes & {
        code: string;
        message: string;
        stack: string;
    };
}
declare type Service = keyof typeof knownErrors;
export declare class AppError<TAttributes = Record<string, any>> extends BaseError<TAttributes> {
    readonly service: Service;
    constructor(code: string, message: string, meta?: TAttributes);
    toJSON(): TAttributes & {
        code: string;
        message: string;
        stack: string;
        service: Service;
    };
}
export declare enum APIErrorCode {
    TokenExpired = "TOKEN_EXPIRED",
    InvalidInput = "INVALID_INPUT",
    InvalidOperation = "INVALID_OPERATION",
    ForbiddenOperation = "FORBIDDEN_OPERATION",
    ServerError = "SERVER_ERROR"
}
export declare class APIError<TAttributes = Record<string, any>> extends BaseError<TAttributes> {
    readonly code: APIErrorCode;
    readonly original: AppError | null;
    constructor(code: APIErrorCode, message: string, original: AppError | null, meta?: Record<string, any>);
    toJSON(): TAttributes & {
        code: string;
        message: string;
        stack: string;
        original: {
            code: string;
            message: string;
            stack: string;
            service: Service;
        } | null;
    };
}
export declare class TokenExpiredError extends APIError {
    constructor();
}
export declare class InvalidInputError extends APIError {
    constructor(message?: string, meta?: Record<string, any>);
}
export declare class InvalidOperationError extends APIError {
    constructor(original: AppError, message?: string);
}
export declare class ForbiddenOperation extends APIError {
    constructor(message?: string);
}
export declare class ServerError extends APIError {
    constructor(original: AppError, message?: string);
}
export {};
//# sourceMappingURL=index.d.ts.map