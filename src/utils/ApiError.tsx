class ApiError extends Error {
  
  constructor(public code: number, message: string) {
    super();
    this.message = message || 'Default Message';
    this.stack = (new Error(message)).stack;
    this.name = this.constructor.name;
  }
}

export default ApiError;
