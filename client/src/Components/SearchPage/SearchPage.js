import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import $ from "jquery";
import SearchResults from "./SearchResults";
import SignedInNavbar from "../SignedInNavbar/SignedInNavbar";

const button = {
  color: "#0d9aaa",
  border: "1px solid #0d9aaa",
  background: "white",
  marginLeft: "100px",
  marginTop: "5px",
  
}

const input = {
  marginLeft: "12px"
}

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      textFieldValue: "",
      searchResult: {
        username: "not found",
        profilename: "not found"
      },
      alreadyFriends: false,
      loggedUser: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkFriends = this.checkFriends.bind(this);
  }

  componentDidMount = () => {
    if (JSON.parse(sessionStorage.getItem("profile"))) {
      this.setState({
        loggedUser: JSON.parse(sessionStorage.getItem("profile")).email
      });
    }
  };

  handleTextChange = e => {
    this.setState({
      textFieldValue: e.target.value
    });
  };

  checkFriends = (friends, friend) => {
    console.log("reached check friends");
    var found = false;
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].username === friend) {
        found = true;
      }
    }
    return found;
  };

  handleSubmit = () => {
    $.get("/api/getUser/" + this.state.textFieldValue).then(result => {
      if (result) {
        this.setState({
          searchResult: result
        });
        $.get("/api/getFriends/" + this.state.loggedUser).then(friends => {
          var areFriends = this.checkFriends(
            friends,
            this.state.searchResult.username
          );
          console.log("search result in friends:" + areFriends);
          if (areFriends) {
            this.setState({
              alreadyFriends: true
            });
          } else {
            this.setState({
              alreadyFriends: false
            });
          }
        });
      } else {
        this.setState({
          searchResult: {
            username: "not found",
            profilename: "not found"
          }
        });
      }
    });
  };

  render() {
    return (
      <div>
        <SignedInNavbar />
        <div className="searchPage">
          <label className="user-email">
            User Email:
            <TextField
              className="search-input"
              style={input}
              value={this.state.textFieldValue}
              onChange={this.handleTextChange}
            />
          </label>
          <Button
            style={button}
            variant="contained"
            className="subBtn classes.button"
            onClick={this.handleSubmit}
          >
            Search
          </Button>
          {this.state.searchResult.username !== "not found" && (
            <SearchResults
              profilename={this.state.searchResult.profilename}
              username={this.state.searchResult.username}
              alreadyFriends={this.state.alreadyFriends}
              loggedUser={this.state.loggedUser}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
