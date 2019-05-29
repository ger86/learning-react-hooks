export interface ReactRouterMatchType {
  params: { [key: string]: string },
  isExact: boolean,
  path: string,
  url: string
};
