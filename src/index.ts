export default class AppError extends Error {
  public readonly service?: string = process.env.SERVICE_NAME;

  public constructor(
    public readonly code: string,
    message: string,
    private readonly meta: Record<string, any> = {},
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
      name: this.name,
      code: this.code,
      message: this.message,
      stack: this.stack,
      service: this.service,
    };
  }
}
