import React from "react";
import { Link, withRouter } from "react-router-dom";
import Auth0Lock from "auth0-lock";
import logo from "../giftd_logo_black.svg";
import $ from "jquery";
import "./style.css";

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
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      lock.getUserInfo(accessToken, (err, data) => {
        if (err) return;
        // console.log(data);
        // console.log(accessToken)

        window.profile = data;
        this.setState({
          signedIn: true,
          name: data.name
        });
      });
    }

    lock.on("authenticated", authResult => {
      // Use the token in authResult to getUserInfo() and save it to sessionStorage
      lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        // console.log(authResult);
        // console.log(profile);

        window.profile = profile;

        sessionStorage.setItem("accessToken", authResult.accessToken);
        sessionStorage.setItem("profile", JSON.stringify(profile));

        this.setState({
          signedIn: true,
          name: profile.name
        });

        this.checkDB();
      });
    });
  }
  state = {
    signedIn: false
  };
  login = () => {
    lock.show();
  };

  checkDB() {
    console.log("checkdb test");
    let obj = { username: window.profile.email }
    console.log("obj in NavBar: " + JSON.stringify(obj));
    $.get("/api/getUser/" + window.profile.email).then( dbUser => {
        if (!dbUser) {
          $.ajax({
            type: "POST",
            url: "/api/newUser",
            data: {
              username: window.profile.email,
              profilename: window.profile.name
            }
          });
        }
    });
  }

  logout = () => {
    sessionStorage.removeItem("accessToken");
    window.location = "/";
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light fixed-top">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="App-logo" alt="logo" style={{ height: "50px" }} />
        </Link>
        {this.state.name}
        {!this.state.signedIn && (
          <button className="btn btn-light" onClick={this.login}>
            Sign In
          </button>
        )}
        {this.state.signedIn && (
          <div>
            {/* <label className="mr-2 text-white">{}</label> */}
            <button className="btn btn-light" onClick={this.logout}>
              Sign Out
            </button>
          </div>
        )}
      </nav>
    );
  }
}

export default withRouter(NavBar);
