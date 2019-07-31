export default class AppError extends Error {
    readonly code: string;
    private readonly meta;
    readonly service?: string;
    constructor(code: string, message: string, meta?: Record<string, any>);
    toJSON(): {
        name: string;
        code: string;
        message: string;
        stack: string | undefined;
        service: string | undefined;
    };
}
//# sourceMappingURL=index.d.ts.map