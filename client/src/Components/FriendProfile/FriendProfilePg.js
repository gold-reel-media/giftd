import React, { Component } from "react";
import $ from "jquery";
import FriendList from "./FriendProfile/FriendList";
import AddListForm from './AddListForm/AddListForm';
import Lists from './Lists/Lists';
import { Link } from "react-router-dom";



class UserProfile extends Component {
  state = {
    lists: {}
  };


    render() {
        return (
            <div className="profile-container">
                <h1>Friend's Profile Page</h1>
            </div>
        );
    }
}

export default UserProfile;
