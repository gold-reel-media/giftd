import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import $ from "jquery";
import SearchResults from "./SearchResults";
import NavBar from "../../NavBar/NavBar";

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
        <NavBar />
        <div className="searchPage">
          <label>
            Name:
            <TextField
              value={this.state.textFieldValue}
              onChange={this.handleTextChange}
            />
          </label>
          <Button
            variant="contained"
            className="classes.button"
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
