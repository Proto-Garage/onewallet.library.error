"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(code, message, meta) {
        super(message);
        this.code = code;
        this.meta = meta;
    }
    toJSON() {
        return Object.assign({}, (this.meta || {}), { code: this.code, message: this.message, stack: this.stack });
    }
}
exports.BaseError = BaseError;
class AppError extends BaseError {
    constructor(code, message, meta) {
        super(code, message, meta);
        const service = process.env.SERVICE_NAME;
        if (!service) {
            throw new Error('`SERVICE_NAME` is not set.');
        }
        this.service = service;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), { service: this.service });
    }
}
exports.AppError = AppError;
var APIErrorCode;
(function (APIErrorCode) {
    APIErrorCode["TokenExpired"] = "TOKEN_EXPIRED";
    APIErrorCode["InvalidInput"] = "INVALID_INPUT";
    APIErrorCode["InvalidOperation"] = "INVALID_OPERATION";
    APIErrorCode["ForbiddenOperation"] = "FORBIDDEN_OPERATION";
    APIErrorCode["ServerError"] = "SERVER_ERROR";
})(APIErrorCode = exports.APIErrorCode || (exports.APIErrorCode = {}));
class APIError extends BaseError {
    constructor(code, message, original, meta) {
        super(code, message, meta);
        this.code = code;
        this.original = original;
    }
    toJSON() {
        this.original;
        return Object.assign({}, super.toJSON(), { original: this.original ? this.original.toJSON() : null });
    }
}
exports.APIError = APIError;
class TokenExpiredError extends APIError {
    constructor() {
        super(APIErrorCode.TokenExpired, 'Access token has expired.', null);
    }
}
exports.TokenExpiredError = TokenExpiredError;
class InvalidInputError extends APIError {
    constructor(message, meta) {
        super(APIErrorCode.InvalidInput, message || 'Invalid input.', null, meta);
    }
}
exports.InvalidInputError = InvalidInputError;
class InvalidOperationError extends APIError {
    constructor(original, message) {
        super(APIErrorCode.InvalidOperation, message || original.message, original);
    }
}
exports.InvalidOperationError = InvalidOperationError;
class ForbiddenOperation extends APIError {
    constructor(message) {
        super(APIErrorCode.InvalidInput, message || 'Not enough access privileges to execute operation.', null);
    }
}
exports.ForbiddenOperation = ForbiddenOperation;
class ServerError extends APIError {
    constructor(original, message) {
        super(APIErrorCode.ServerError, message || original.message, original);
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=index.js.map