export default class AppError<T = Record<string, any>> extends Error {
    readonly code: string;
    private readonly meta?;
    readonly service?: string;
    readonly id: string;
    constructor(code: string, message: string, meta?: T | undefined, service?: string);
    toJSON(): (T & {
        id: string;
        name: string;
        code: string;
        message: string;
        stack: string | undefined;
        service: string | undefined;
    }) | {
        id: string;
        name: string;
        code: string;
        message: string;
        stack: string | undefined;
        service: string | undefined;
    };
}
//# sourceMappingURL=index.d.ts.map