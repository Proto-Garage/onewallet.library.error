"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(code, message, meta = {}) {
        super(message);
        this.code = code;
        this.meta = meta;
        this.service = process.env.SERVICE_NAME;
        this.name = 'AppError';
    }
    toJSON() {
        return Object.assign({}, this.meta, { name: this.name, code: this.code, message: this.message, stack: this.stack, service: this.service });
    }
}
exports.default = AppError;
//# sourceMappingURL=index.js.map