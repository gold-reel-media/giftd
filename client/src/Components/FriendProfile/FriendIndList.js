import React, { Component } from "react"
import { light } from '@material-ui/core/styles/createPalette';
import $ from "jquery";
import {List, ListItem} from "../Lists/Lists";


class IndList extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        this.loadListItems();
        console.log("friend profile items");
      }
    
      loadListItems = () => {
        let listID = this.props.match.params.wishlistId;
        console.log("list id " + listID)
        $.get("/api/getItems/" + listID )
          .then(res => {
              console.log(res)
            this.setState({ items: res});
          })
          .catch(err => console.log(err));
          console.log(this.state)
      };
    


    render() {

        return(
            <div>
                <h1>Wist List Name</h1>
                <p>look at what I want and buy it for</p>
                <div className="items">
          {this.state.items.length ? (
            <List>
              {this.state.items.map(item => (
                <ListItem key={item.itemId}>
                {item.name}
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Items to Display</h3>
          )}
        </div>
      </div>
        )
    }
}

export default IndList

