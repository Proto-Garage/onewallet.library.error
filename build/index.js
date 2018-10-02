"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(code, message, meta) {
        super(message);
        this.code = code;
        this.meta = meta;
        this.name = 'AppError';
    }
    toJSON() {
        return Object.assign({}, (this.meta || {}), { code: this.code, message: this.message });
    }
}
exports.default = AppError;
//# sourceMappingURL=index.js.map