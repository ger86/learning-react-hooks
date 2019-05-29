import queryString from 'query-string';

// eslint-disable-next-line import/prefer-default-export
export const usersRoute = (page?: string | number) => {
  const basePath = '/';
  if (!page) {
    return basePath;
  }
  return `${basePath}?${queryString.stringify({ page })}`;
};

export const loginRoute = () => '/login';
export const logoutRoute = () => '/logout';

export const userCreateRoute = () => `/user/create`;
export const userDetailRoute = (userId: string|number = ':id') => `/user/${userId}`;
export const userEditRoute = (userId: string|number = ':id') => `/user/${userId}/edit`;
