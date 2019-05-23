export default fields =>
  new Promise(resolve =>
    window.FB.api('/me', { locale: 'en_US', fields }, resolve)
  );
