import React, { Component } from "react";
import $ from "jquery";
import { List, ListItem } from "../Lists/Lists";
import { Link } from "react-router-dom";
import SignedInNavbar from "../SignedInNavbar/SignedInNavbar";

class FriendProfilePg extends Component {
  state = {
    lists: {},
    friends: {}
  };

  componentDidMount() {
    this.loadLists();
    console.log("friend profile mounted");
  }

  loadLists = () => {
    let profile = this.props.match.params.username;

    $.get("/api/getWishlists/" + profile)
      .then(res => {
        this.setState({ lists: res, listName: "" });
        console.log("res "+JSON.stringify(res));
      })
      .catch(err => console.log(err));
      $.get("/api/getUser/" + profile).then(result => {
          this.setState({
           name: result.profilename
          });
          console.log("result "+ this.state.name)
        })
  };

  render() {
    return (
      <div>
        <SignedInNavbar />
        <div className="profile-container">
          <div className="friend-lists-display">
          <h5>{this.state.name}&#39;s Wishlists</h5>
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
