export default class AppError<IAttributes = Object> extends Error {
  private _meta: IAttributes | undefined;
  private _code: string;
  constructor (code: string, message: string, meta?: IAttributes) {
    super(message);

    this._code = code;
    this._meta = meta;
    this.name = 'AppError';
  }

  get code() {
    return this._code;
  }

  get meta() {
    return this._meta || {};
  }

  toJSON(): IAttributes & { code: string, message: string } {
    return {
      ...(this._meta || {}) as any,
      code: this.code,
      message: this.message,
    };
  }
}
