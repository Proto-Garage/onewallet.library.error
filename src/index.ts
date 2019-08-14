import shortid from 'shortid';

export default class AppError<T = Record<string, any>> extends Error {
  public readonly service?: string = process.env.SERVICE_NAME;

  public readonly id: string = shortid.generate();

  public constructor(
    public readonly code: string,
    message: string,
    private readonly meta?: T,
  ) {
    super(message);

    this.name = 'AppError';
  }

  /**
   * Serialize error object so that it can be sent via network.
   */
  public toJSON() {
    return {
      ...this.meta,
      id: this.id,
      name: this.name,
      code: this.code,
      message: this.message,
      stack: this.stack,
      service: this.service,
    };
  }

  public isKnown() {
    return this.code === 'ACCOUNT_NOT_FOUND'
     || this.code === 'INSUFFICIENT_FUNDS';
  }
}
