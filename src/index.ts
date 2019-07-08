export default class AppError<TAttributes = Record<string, any>> extends Error {
  public constructor(
    public readonly code: string, message: string,
    public readonly meta?: TAttributes,
  ) {
    super(message);
    this.name = 'AppError';
  }

  public toJSON(): TAttributes & { code: string; message: string } {
    return {
      ...(this.meta || {}) as any,
      code: this.code,
      message: this.message,
    };
  }
}
