import React, { Component } from "react";
import $ from "jquery";
import FriendList from "./FriendProfile/FriendList";
import AddListForm from "./AddListForm/AddListForm";
import SignedInNavbar from "./SignedInNavbar/SignedInNavbar";
import Lists from "./Lists/Lists";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  state = {
    lists: {}
  };

  addList = list => {
    //copy of existing state
    const lists = { ...this.state.lists };
    //add new list to lists
    lists[`list`] = list;
    //set new lists object to state
    this.setState({
      lists
    });
    console.log("window" + window);
  };

  addList = list => {
    //copy of existing state
    const lists = { ...this.state.lists };
    //add new list to lists
    lists[`list`] = list;
    //set new lists object to state
    this.setState({
      lists
    });
    console.log("window" + window);
  };
  render() {
    return (
      <div>
        <SignedInNavbar />
        <div className="profile-container">
          {/* <br />
          <br />
          <br /> */}
          
          <AddListForm addList={this.addList} />
          <FriendList />
        </div>
      </div>
    );
  }
}

export default UserProfile;
