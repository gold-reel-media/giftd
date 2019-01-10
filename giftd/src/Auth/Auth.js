import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'wishlist-2u.auth0.com',
    clientID: '6r9wHSxYtrzgo7sFA0ox61vZ8uGTSeFt',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}