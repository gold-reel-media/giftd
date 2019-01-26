import React, { Component } from "react";
import $ from "jquery";
import { List, ListItem } from '../Lists/Lists';
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar"


class FriendProfilePg extends Component {
  state = {
    lists: {}
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
      })
      .catch(err => console.log(err));
  };

  render() {
    let profile = this.props.match.params.username;

    return (
      <div>
          <NavBar />
        <div className="profile-container">
          <h1>Friend's Profile Page</h1>
        </div>
        <div className="lists">
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
    );
  }
}

export default FriendProfilePg;
