import React, { Component } from "react"
// import FriendIndList from "./FriendIndList"
import { light } from '@material-ui/core/styles/createPalette';
// import './style.css';

class FriendProfile extends Component() {
    render(){
        return(
            <div>
                <div>
                    <h1>MY NAME</h1>
                </div>
                <div>
                    HERE ARE ALL MY LISTS
                    {/* <FriendIndList /> */}
                </div>
            </div>
        )
    }
}

export default FriendProfile