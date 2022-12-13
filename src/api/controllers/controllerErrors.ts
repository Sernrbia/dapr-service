export class MissingParameterError extends Error {
  constructor(parameterName: string) {
    super(`"${parameterName}" parameter is missing`);
  }
}
