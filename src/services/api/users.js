// @flow
import request from 'services/request';
import type { User } from 'types/userType';

export const getUsers = async (page: number) => request.get('users', { page });
export const getUser = async (userId: number) => request.get(`users/${userId}`);
export const postUser = async (user: User) => request.post(`users`, user);
export const patchUser = async (user: User) =>
  request.patch(`users/${user.id}`, user);
