// @flow
export default (array: Array<mixed>): Array<mixed> =>
  Array.from(new Set(array));
