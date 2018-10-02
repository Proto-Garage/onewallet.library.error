export default class AppError<IAttributes = Object> extends Error {
    code: string;
    meta?: IAttributes | undefined;
    constructor(code: string, message: string, meta?: IAttributes | undefined);
    toJSON(): IAttributes & {
        code: string;
        message: string;
    };
}
//# sourceMappingURL=index.d.ts.map