import { FacebookUser } from 'types/FacebookUser';

export default (fields: {}): Promise<FacebookUser> =>
  new Promise(resolve =>
    window.FB.api('/me', { locale: 'en_US', fields }, resolve)
  );
