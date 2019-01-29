import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import PropTypes from "prop-types";
import InputAdornment from "@material-ui/core/InputAdornment";
import $ from "jquery";
import { List, ListItem } from "../Lists/Lists";
import "./AddItemForm.css";
import SignedInNavbar from "../SignedInNavbar/SignedInNavbar";
import { orange } from "@material-ui/core/colors";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: "100%"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
 
});

const button = {
  color: "#0d9aaa",
  border: "1px solid #0d9aaa",
}

const img = {
  width: "90%"
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class OutlinedTextFields extends React.Component {
  state = {
    open: false,
    items: [],
    name: "",
    price: "",
    itemLink: "",
    imageLink: "",
    description: "",
    formStatus: false
  };

  componentDidMount() {
    this.loadItems();
    console.log("mounted");
    
  }

  loadItems = () => {
    console.log("loading");
    $.get("/api/getItems/" + this.props.match.params.wishlistId)
      .then(res => {
        console.log(res);
        this.setState({
          items: res,
          name: "",
          price: "",
          itemLink: "",
          imageLink: "",
          description: ""
        });
        console.log(this.state.items);
        
      })
      .catch(err => console.log(err));
  };

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

  handleFormOpen = event => {
    this.setState({
      formStatus: true,
      name: "",
      price: "",
      itemLink: "",
      imageLink: "",
      description: ""
    });
    
  };

  handleClose = event => {
    this.setState({
      open: false
    });
  };

  handleFormClose = event => {
    event.preventDefault();
    this.setState({ formStatus: false });
    // console.log(this.state);
    let obj = {
      name: this.state.name,
      imageLink: this.state.imageLink,
      itemLink: this.state.itemLink,
      description: this.state.description,
      price: this.state.price,
      wishlistId: this.props.match.params.wishlistId
    };
    if (this.state.name) {
      $.ajax({
        type: "POST",
        url: "/api/newItem",
        data: obj
      })
        .then(this.loadItems)
        .catch(err => console.log(err));
    }
  };

  handleChange = name => event => {
    let url;
    if (event.target.id === "outlined-name-itemLink") {
      url = event.target.value.split("?")[0];
    } else {
      url = event.target.value;
    }
    this.setState({
      [name]: url
    });
  };

  deleteItem = id => {
    this.handleClose();
    $.ajax({
      type: "DELETE",
      url: "/api/removeItem/" + id
    }).then(this.loadItems);
  };

  logout = () => {
    sessionStorage.removeItem("accessToken");
    window.location = "/";
  };

  render() {
    return (
      <div>
        <SignedInNavbar />
        
        <div className="items-container col-sm-4">
        <div className="add-item">Add Item</div>
          <div className="add-item-form">
            <Button
              className="plus-sign"
              style={{ borderRadius: "100px" }}
              onClick={this.handleFormOpen}
            >
              <i className="fas fa-plus-circle fa-10x" />
            </Button>
            <Dialog
              open={this.state.formStatus}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleFormClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"New Item"}
              </DialogTitle>
              <DialogContent>
                <form noValidate autoComplete="off">
                  <TextField
                    id="outlined-name"
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleChange("name")}
                    margin="normal"
                    variant="outlined"
                    style={{
                      width: "48%",
                      marginRight: "15PX",
                      border: "purple"
                    }}
                  />
                  <TextField
                    id="outlined-adornment-amount"
                    style={{ width: "48%", marginTop: "16px" }}
                    className={classNames(
                      styles.backgroundColor,
                      styles.textField
                    )}
                    variant="outlined"
                    label="Price"
                    value={this.state.price}
                    onChange={this.handleChange("price")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    id="outlined-name-itemLink"
                    label="Item Link"
                    fullWidth
                    value={this.state.itemLink}
                    onChange={this.handleChange("itemLink")}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-name"
                    label="Image Link"
                    fullWidth
                    value={this.state.imageLink}
                    onChange={this.handleChange("imageLink")}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    rowsMax="4"
                    // defaultValue="Default Value"
                    // className={classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange("description")}
                    margin="normal"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button className="add-item-button" onClick={this.handleFormClose} color="primary">
                  Add Item
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="my-items">
            {this.state.items.length ? (
              <List>
                {this.state.items.map(item => (
                  <ListItem key={item.itemId}>
                    <div className="item-popup">
                      <Button
                        className="list-item-btn"
                        style={button}
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
                              style={img}
                              src={this.state.imageLink}
                              alt=""
                              // width="270"
                              // height="200"
                            />
                            <br/>
                            <br />
                            Description: {this.state.description}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button className="modal-button"
                            onClick={() => this.deleteItem(item.itemId)}
                            color="primary"
                          >
                            Delete Item
                          </Button>
                          <Button className="modal-button" onClick={this.handleClose} color="primary">
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
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

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default OutlinedTextFields;

