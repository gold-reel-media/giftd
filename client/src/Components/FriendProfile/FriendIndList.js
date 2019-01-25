import React, { Component } from "react"
import { light } from '@material-ui/core/styles/createPalette';
// import './style.css';
import Items from "../Items/Items";

class IndList extends Component {
    state = {
        items: {}
    };

    render() {

        return(
            <div>
                <h1>My Birthday</h1>
                <p>give me all the things I want</p>
                <ul className="lists">
                    {Object.keys(this.state.items).map( key => 
                    
                    <Items key={key} details={this.state.items}/>
                  
                  )}
                </ul>
            </div>
        )
    }
}

export default IndList

