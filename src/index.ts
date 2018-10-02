export default class AppError<IAttributes = Object> extends Error {
  constructor (public code: string, message: string, public meta?: IAttributes) {
    super(message);
    this.name = 'AppError';
  }

  toJSON(): IAttributes & { code: string, message: string } {
    return {
      ...(this.meta || {}) as any,
      code: this.code,
      message: this.message,
    };
  }
}
