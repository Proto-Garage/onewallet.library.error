"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
class AppError extends Error {
    constructor(code, message, meta) {
        super(message);
        this.code = code;
        this.meta = meta;
        this.service = process.env.SERVICE_NAME;
        this.id = shortid_1.default.generate();
        this.name = 'AppError';
    }
    toJSON() {
        return Object.assign({}, this.meta, { id: this.id, name: this.name, code: this.code, message: this.message, stack: this.stack, service: this.service });
    }
    isKnown() {
        return this.code === 'ACCOUNT_NOT_FOUND'
            || this.code === 'INSUFFICIENT_FUNDS'
            || (this.service === 'Account' && this.code === 'ACCOUNT_EXISTS');
    }
}
exports.default = AppError;
//# sourceMappingURL=index.js.map