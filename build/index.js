"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
class AppError extends Error {
    constructor(code, message, meta, service) {
        super(message);
        this.code = code;
        this.meta = meta;
        this.id = shortid_1.default.generate();
        this.name = 'AppError';
        this.service = service || process.env.SERVICE_NAME;
    }
    toJSON() {
        return Object.assign({}, this.meta, { id: this.id, name: this.name, code: this.code, message: this.message, stack: this.stack, service: this.service });
    }
}
exports.default = AppError;
//# sourceMappingURL=index.js.map