// @flow

function ApiError(code: number, message: string) {
  this.name = 'ApiError';
  this.message = message || 'Default Message';
  this.code = code;
  this.stack = new Error().stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

export default ApiError;
