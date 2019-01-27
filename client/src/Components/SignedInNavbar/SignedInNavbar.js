import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../giftd_logo_black.svg";
import $ from "jquery";
import "./style.css";

class SignedInNavbar extends React.Component {
  logout = () => {
    sessionStorage.removeItem("accessToken");
    window.location = "/";
  };

  render() {
    let profile = JSON.parse(sessionStorage.getItem("profile"));
    return (
      <nav className="navbar navbar-light fixed-top">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ height: "50px" }}
          />
        </Link>
        <div className="username">{profile.name}</div>

        {/* {!this.state.signedIn && (
          <button className="btn btn-light" onClick={this.login}>
            Sign In
          </button>
        )} */}
        {/* {this.state.signedIn && ( */}
        <div>
          {/* <label className="mr-2 text-white">{}</label> */}
          <Link to={"/profile/"}>
          <button className="btn">
            List Page
          </button>
          </Link>
          <Link to={"/search/"}>
          <button className="btn">
            Search
          </button>
          </Link>
          <button className="btn" onClick={this.logout}>
            Sign Out
          </button>
        </div>
      </nav>
    );
  }
}

export default SignedInNavbar;
