import auth0 from 'auth0-js';

class Auth {
    constructor() {
      this.auth0 = new auth0.WebAuth({
        domain: 'wishlist-2u.auth0.com',
        clientID: 'uPoNkl6EbS0CdIGluuMXmpi67AlmWLt7',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'id_token',
        scope: 'openid'    
      });

      this.getProfile = this.getProfile.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }
state = {
    signedIn: false
  };
  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if(!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  };
 
  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set time that id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  logout() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'uPoNkl6EbS0CdIGluuMXmpi67AlmWLt7'
    })
  }

  silentAuth() {
    return new Promise ((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;