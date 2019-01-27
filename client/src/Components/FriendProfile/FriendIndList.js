import React, { Component } from "react";
import { light } from "@material-ui/core/styles/createPalette";
import $ from "jquery";
import NavBar from '../../NavBar/NavBar';
import { List, ListItem } from "../Lists/Lists";
import "./style.css"

class IndList extends Component {
  state = {
    items: [],
    itemPurchased: false
  };

  componentDidMount() {
    this.loadListItems();
    console.log("friend profile items");
  }

  // get items from database and push into items.state array
  loadListItems = () => {
    let listID = this.props.match.params.wishlistId;
    console.log("list id " + listID);
    $.get("/api/getItems/" + listID)
      .then(res => {
        console.log(res);
        this.setState({ items: res });
      })
      .catch(err => console.log(err));
    console.log(this.state);
  };

  // post request that takes in item id and updates purchase status of item
  updateItem = (event, item) => {
    let itemStatus = {
      itemid: item.itemId
    }
    $.ajax({
      type: "POST",
      url: "/api/changeItemStatus",
      data: itemStatus,
      success: status => {
        console.log(status);
      }
    }).then( () => {
        var tempStatus = !item.status;
        this.setState({itemPurchased: tempStatus});
        this.loadListItems();
    })
  };

  render() {
    return (
      <div>
      <NavBar />
      <div className="pageHead">
        <h1>Wish List Name</h1>
        <div className="items">
          {this.state.items.length ? (
            <List>
              {this.state.items.map(item => (
                <ListItem 
                  key={item.itemId}
                >
                  {!this.state.itemPurchased && <button type="button" id="purchase-btn" class="btn btn-outline-info btn-sm" onClick={event => this.updateItem(event, item)}> buy me! </button> }
                  {this.state.itemPurchased && <button type="button" id="purchase-btn" class="btn btn-outline-info btn-sm" onClick={event => this.updateItem(event, item)}> purchased </button> }
                  {item.name}
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Items to Display</h3>
          )}
        </div>
      </div>
      </div>
    );
  }
}

export default IndList;
