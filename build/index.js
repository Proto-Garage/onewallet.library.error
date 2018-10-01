"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(code, message, meta) {
        super(message);
        this._code = code;
        this._meta = meta;
        this.name = 'AppError';
    }
    get code() {
        return this._code;
    }
    get meta() {
        return this._meta || {};
    }
    toJSON() {
        return Object.assign({}, (this._meta || {}), { code: this.code, message: this.message });
    }
}
exports.default = AppError;
//# sourceMappingURL=index.js.map