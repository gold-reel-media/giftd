import React, { Component } from "react";
import $ from "jquery";
import FriendList from "./FriendProfile/FriendList";
import AddListForm from "./AddListForm/AddListForm";
import NavBar from '../NavBar/NavBar';
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
        <NavBar />
        <AddListForm addList={this.addList} />
        {/* <div className="profile-container container-flex">
          <div className="row">
            <div className="col-6">
              <div className="list-form-and-container">
                <h2>Add New List</h2>
                <AddListForm addList={this.addList} />
              </div>
            </div>
            <div className="col-6">
              <FriendList />
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default UserProfile;
