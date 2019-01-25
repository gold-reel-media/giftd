import React, { Component } from 'react';
import $ from "jquery";
import './style.css';

class FriendList extends Component {

    state = {
        friends: []
    }

    componentDidMount() {
        this.getFriends();
      }
    
    
    //   // call to database to find friends in database
      getFriends = () => {
        let username = "m.a.gallagher09@gmail.com";
        $.get("/api/getFriends/" + username).then(res => {
            let frnd = res;
            this.setState({ friends: frnd })
    
            console.log("test " + JSON.stringify(res[0].profilename))
        });
      };
      
    
    
    render() {

        return(
            <div className="friend-list">
                <ul>
                    <li className="friend">Your Friends</li>
                   {(this.state.friends).map(frnd => (
                     <li> {frnd.profilename} </li>
                   ))}
                </ul>
            </div>
        )
    }
}

export default FriendList