import React from "react";
import { Link, withRouter } from "react-router-dom";
import Auth from "../Auth";
import Auth0Lock from "auth0-lock";
import logo from "../giftd_logo_black.svg";
// auth0Client
// const auth = new Auth();

var lock = new Auth0Lock(
  "uPoNkl6EbS0CdIGluuMXmpi67AlmWLt7",
  "wishlist-2u.auth0.com",
  {
    allowedConnections: [
      "twitter",
      "facebook",
      "linkedin",
      "google",
      "google-oauth2"
    ]
  }
);


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      lock.getUserInfo(accessToken, (err, data) => {
        if (err) return;
        console.log(data);
        window.profile = data;
        this.setState({
          signedIn: true
        });
      });
    }

    lock.on("authenticated", authResult => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }
    
        console.log(authResult);
        console.log(profile);

        window.profile = profile;
     
        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));

        this.setState({
          signedIn: true
        });
      });
    });
    
  }
  state = {
    signedIn: false
  };
  login = () => {
    lock.show();
  };

  logout = () => {
    localStorage.removeItem("accessToken");
    window.location = "/";
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light fixed-top">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="App-logo" alt="logo" style={{height: "50px"}} />
        </Link>
        {!this.state.signedIn && (
          <button className="btn btn-light" onClick={this.login}>
            Sign In
          </button>
        )}
        {this.state.signedIn && (
          <div>
            <label className="mr-2 text-white">{}</label>
            <button className="btn btn-dark" onClick={this.logout}>
              Sign Out
            </button>
          </div>
        )}
      </nav>
    );
  }
}

export default withRouter(NavBar);
