import React from "react";
import { Link, withRouter } from "react-router-dom";
import Auth0Lock from "auth0-lock";

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
          signedIn: true,
          name: data.name
        });
        console.log("state name" + data.name)
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
          signedIn: true,
          name: profile
        });
      });
    });
    
  }
  state = {
    signedIn: false
  };
  login = () => {
    lock.show();
    console.log("this state name",this.state.name)
  };

  logout = () => {
    localStorage.removeItem("accessToken");
    window.location = "/";
  };


  render() {
    return (
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand" to="/">
        </Link>
        {this.state.name}
        {!this.state.signedIn && (
          <button className="btn btn-dark" onClick={this.login}>
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
