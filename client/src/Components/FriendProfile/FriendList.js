import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../Lists/Lists";
import $ from "jquery";
import "./style.css";

class FriendList extends Component {
  state = {
    friends: []
  };

  componentDidMount() {
    this.getFriends();
  }

  //   // call to database to find friends in database
  getFriends = () => {
    let username = JSON.parse(sessionStorage.getItem('profile')).email;
    $.get("/api/getFriends/" + username).then(res => {
      let frnd = res;
      this.setState({
        friends: frnd
      });

      console.log("frnd res " + JSON.stringify(res));
    });
  };

  render() {
    return (
      <div className="friend-list col-sm-5 offset-sm-1">
        <List>
          <div className="friend">Your Friends</div>
          {this.state.friends.map(frnd => (
            <ListItem>
              {/* <Link to={'/list/' + frnd.profilename} /> */}
              <Link to={"/" + frnd.username}>
                <strong>{frnd.profilename}</strong>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default FriendList;
