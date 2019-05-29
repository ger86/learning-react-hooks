import { FB_ID } from 'config/consts';

declare global {
  interface Window { FB: any; fbAsyncInit:any }
}

export default () => {
  window.fbAsyncInit = () => {
    window.FB.init({
      version: 'v3.0',
      appId: FB_ID,
      xfbml: true
    });
  };
  ((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    // eslint-disable-next-line no-empty
    if (d.getElementById(id)) {
    }
    const js = d.createElement(s);
    js.id = id;
    (js as HTMLScriptElement).src = 'https://connect.facebook.net/en_US/sdk.js';
    if (fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    }
  })(document, 'script', 'facebook-jssdk');
};
