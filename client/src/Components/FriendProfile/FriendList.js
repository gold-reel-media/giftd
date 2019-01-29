import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    let username = "m.a.gallagher09@gmail.com";
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
      <div className="friend-list">
        <ul>
          <li className="friend">Your Friends</li>
          {this.state.friends.map(frnd => (
            <li>
              {/* <Link to={'/list/' + frnd.profilename} /> */}
              <Link to={"/" + frnd.username}>
                <strong>{frnd.profilename}</strong>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FriendList;