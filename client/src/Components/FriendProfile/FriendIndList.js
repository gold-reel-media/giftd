import React, { Component } from "react";
import { light } from "@material-ui/core/styles/createPalette";
import $ from "jquery";
import SignedInNavbar from "../SignedInNavbar/SignedInNavbar";
import { List, ListItem } from "../Lists/Lists";
import "./style.css";

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
        $.get("/api/getWishlist/" + listID)
          .then(res => {
            this.setState({ wishlistName: res.name})
          })
      };
    

  // get items from database and push into items.state array
  loadListItems = () => {
    let listID = this.props.match.params.wishlistId;
    console.log("list id " + listID);
    $.get("/api/getItems/" + listID)
      .then(res => {
        console.log(res);
        this.setState({
          items: res
          // itemPurchased: item.status
        });
      })
      .catch(err => console.log(err));
  };

  // post request that takes in item id and updates purchase status of item
  updateItem = (event, item) => {
    let itemStatus = {
      itemid: item.itemId
    };
    $.ajax({
      type: "POST",
      url: "/api/changeItemStatus",
      data: itemStatus,
      success: status => {
        console.log(status);
      }
    }).then(() =>
      this.setState({
        items: this.state.items.map(thing => {
          if (thing.itemId === item.itemId) {
            thing.status = !thing.status;
          }
          return thing;
        })
      })
    );
  };

  render() {
    return (
      <div>
        <SignedInNavbar />
        <div className="pageHead">
          <h1>Wish List Name</h1>
          <div className="items">
            {this.state.items.length ? (
              <List>
                {this.state.items.map(item => (
                  <ListItem key={item.itemId}>
                      {item.status && (
                        <button
                          type="button"
                          id="purchase-btn"
                          class="btn btn-outline-info btn-sm"
                          onClick={event => this.updateItem(event, item)}
                        >  purchased 
                        </button>
                      )}
                    {!item.status && (
                      <button
                        type="button"
                        id="purchase-btn"
                        class="btn btn-outline-info btn-sm"
                        onClick={event => this.updateItem(event, item)}
                      > buy me!
                      </button>
                    )}
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
