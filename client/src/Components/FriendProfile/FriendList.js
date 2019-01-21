import React, { Component } from "react";
import { light } from "@material-ui/core/styles/createPalette";
// import './style.css';
// import FriendProfilePg from "./FriendProfilePg"

class FriendList extends Component() {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: "name",
      order: "ascending"
    };
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            FRIENDS I HAVE SO MANY
            {/* <FriendProfilePg /> */}
          </li>
        </ul>
      </div>
    );
  }
}

export default FriendList;
