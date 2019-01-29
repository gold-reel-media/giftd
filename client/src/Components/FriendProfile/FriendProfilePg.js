import React, { Component } from "react";
import $ from "jquery";
import { List, ListItem } from "../Lists/Lists";
import { Link } from "react-router-dom";
import SignedInNavbar from "../SignedInNavbar/SignedInNavbar";

class FriendProfilePg extends Component {
  state = {
    lists: {}
  };

  componentDidMount() {
    this.loadLists();
    console.log("friend profile mounted");
    this.getFriends()
  }

  loadLists = () => {
    let profile = this.props.match.params.username;
    $.get("/api/getWishlists/" + profile)
      .then(res => {
        this.setState({ lists: res, listName: "" });
        console.log("res "+JSON.stringify(res));
        this.getFriends();
      })
      .catch(err => console.log(err));
  };


  getFriends = () => {
    let username = JSON.parse(sessionStorage.getItem('profile'));
    $.get("/api/getFriends/" + username).then(res => {
      let frnd = res;
      this.setState({ 
          friends: frnd
     })
     console.log("state "+ JSON.stringify(this.state))
    });
  };


  render() {
    let profile = this.props.match.params.username;

    return (
      <div>
        <SignedInNavbar />
        <div className="profile-container">
          <div className="lists">
          <h5>{profile}'s Wishlists</h5>
            {this.state.lists.length ? (
              <List>
                {this.state.lists.map(list => (
                  <ListItem key={list.wishlistId}>
                    <Link to={"friendlist/" + list.wishlistId}>
                      <strong>{list.name}</strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Lists to Display</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FriendProfilePg;
