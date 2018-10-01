export default class AppError<IAttributes = Object> extends Error {
    private _meta;
    private _code;
    constructor(code: string, message: string, meta?: IAttributes);
    readonly code: string;
    readonly meta: {};
    toJSON(): IAttributes & {
        code: string;
        message: string;
    };
}
//# sourceMappingURL=index.d.ts.map