export default (array: Array<any>): Array<any> =>
  Array.from(new Set(array));
