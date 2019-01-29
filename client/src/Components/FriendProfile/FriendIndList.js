import React, { Component } from "react";
import { light } from "@material-ui/core/styles/createPalette";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import $ from "jquery";
import SignedInNavbar from "../SignedInNavbar/SignedInNavbar";
import { List, ListItem } from "../Lists/Lists";
import "./style.css";


function Transition(props) {
  return <Slide direction="up" {...props} />;
}



class IndList extends Component {
  state = {
    items: [],
    wishlistName: ""
  };

  componentDidMount() {
    this.loadListItems();
    console.log("friend profile items");
  }

  handleClickOpen = (event, item) => {
    // console.log(item.target.attributes.name.value)
    console.log(event.target);

    this.setState({
      open: true,
      name: item.name,
      price: item.price,
      itemLink: item.itemLink,
      imageLink: item.imageLink,
      description: item.description
    });
  };

  handleClose = event => {
    this.setState({
      open: false
    });
  };


  // loadListItems = () => {
  //   let listID = this.props.match.params.wishlistId;
  //   console.log("list id " + listID);
  //   $.get("/api/getItems/" + listID)
  //     .then(res => {
  //       console.log(res);
  //       this.setState({ items: res });
  //     })
  //     .catch(err => console.log(err));
  //   console.log(this.state);
  //   $.get("/api/getWishlist/" + listID).then(res => {
  //     this.setState({ wishlistName: res.name });
  //   });
  // };

  // get items from database and push into items.state array
  loadListItems = () => {
    let listID = this.props.match.params.wishlistId;
    console.log("list id " + listID);
    $.get("/api/getItems/" + listID)
      .then(res => {
        console.log(res);
        this.setState({
          items: res
        });
      })
      .catch(err => console.log(err));
      $.get("/api/getWishlist/" + listID).then(res => {
        this.setState({ wishlistName: res.name });
        console.log("state with wishlist name " + JSON.stringify(this.state) )
      });
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
          <div className="items">
        {this.state.wishlistName}
            {this.state.items.length ? (
              <List>
                {this.state.items.map(item => (
                  <ListItem key={item.itemId}>
                    <div className="friend-ind-wishlist-items">
                      <Button
                        name={item.name}
                        price={item.price}
                        itemLink={item.itemLink}
                        variant="outlined"
                        color="primary"
                        // onClick={this.handleClickOpen}
                        onClick={event => this.handleClickOpen(event, item)}
                      >
                        <strong>{item.name}</strong>
                      </Button>
                      <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        className="frnd-list-popup-btn"
                      >
                        <DialogTitle id="alert-dialog-slide-title">
                          {this.state.name}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Price: ${this.state.price}
                            <br />
                            <a href={this.state.itemLink}>Item Link</a>
                            <br />
                            <img
                              src={this.state.imageLink}
                              alt=""
                              width="270"
                              height="200"
                            />
                            <br />
                            <br />
                            Description: {this.state.description}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            className="modal-button"
                            onClick={this.handleClose}
                            color="primary"
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>

                    {item.status && (
                      <button
                      type="button"
                      id="purchase-btn"
                      class="btn btn-outline-info btn-sm"
                      onClick={event => this.updateItem(event, item)}
                      >
                        {" "}
                        purchased
                      </button>
                    )}
                    {!item.status && (
                      <button
                      type="button"
                      id="purchase-btn"
                      class="btn btn-outline-info btn-sm"
                      onClick={event => this.updateItem(event, item)}
                      >
                        {" "}
                        buy me!
                      </button>
                    )}
                    </div>
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
