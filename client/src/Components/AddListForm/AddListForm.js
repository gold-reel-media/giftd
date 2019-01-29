import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { List, ListItem } from "../Lists/Lists";
import { Link } from "react-router-dom";
import $ from "jquery";
import './AddListForm.css';
import { orange } from '@material-ui/core/colors';


const button = {
  color: "#0d9aaa",
  border: "1px solid #0d9aaa",
  marginLeft: "15px"
  
}

const title = {
  color: "#0d9aaa",
}




function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends Component {
 
  state = {
    open: false,
    lists: [],
    listName: ""
  };

  componentDidMount() {
    this.loadLists();
    console.log('mounted')
  };

  loadLists = () => {
    let profile = JSON.parse(sessionStorage.getItem("profile"));
    console.log('loading')
    $.get("/api/getWishlists/" + profile.email).then( res => {
      console.log(res);
      this.setState({ lists: res, listName: ""});
      console.log(this.state);
    })
    .catch(err => console.log(err));
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleClickOpen = () => {
    this.setState({ open: true });

  };
  
  //  clear form
   resetForm = () => {
    this.setState({
      listName: " "
    })
  }  

  handleClose = (event) => {
    event.preventDefault();
    this.setState({ open: false });
    console.log(this.state)
    let profile = JSON.parse(sessionStorage.getItem("profile"));
    let obj = {
      name: this.state.listName,
      username: profile.email
    }
    if (this.state.listName) {
      $.ajax({
        type: "POST",
        url: "/api/newWishlist",
        data: obj
      })
      .then(this.loadLists)
      .catch(err => console.log(err));
    }

  };

  deleteList = id => {
    $.ajax({
      type: "DELETE",
      url: "/api/removeWishlist/" + id
    })
    .then(this.loadLists)
  }
    
  
  render() {
   //NOTESSS duplicate this component then delete what you don't need ( everything  but the plus and plus functionality) and do the opposite in the orig comopnent
   //then write a function at the parent, pass it as props to the plus sign, then store the data you need in state at the parent and pass the data (using state!) as props down to the list component
    return (
      <div>
      <div className='add-list-form col-sm-4'>
        <Button className="plus-sign" style={{borderRadius:"100px"}} onClick={this.handleClickOpen}>
        <i className="fas fa-plus-circle fa-10x"></i>
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="dialog-title" style={title} id="alert-dialog-slide-title">
            {"Enter List Name"}
          </DialogTitle>
          <DialogContent>
            <form  noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label="Name"
                className="list-input"
                value={this.state.listName}
                onChange={this.handleChange('listName')}
                style={{width: '545px'}}
                margin="normal"
                variant="outlined"
              />
              </form>
          </DialogContent>
          <DialogActions>
            <Button className="add-list" style={button} onClick={this.handleClose} color="primary" type="submit">
              Add New List
            </Button>
            
          </DialogActions>
        </Dialog>
      </div>
      <div className="my-wishlists col-sm-5 offset-sm-6">
      {this.state.lists.length ? (
        <List>
        <div className="your-lists">Your Lists</div>
         {this.state.lists.map(list => (
           <ListItem key={list.wishlistId}>
            <Link to={'/list/' + list.wishlistId}>
              <strong className="list.name">
                {list.name}
              </strong>
            </Link>
            <Button className="col-sm-3 delete-button" style={button} onClick={() => this.deleteList(list.wishlistId)} color="primary">
              Delete List
            </Button>
           </ListItem>
         ))}
        </List>
      ) : (
        <h3>No Lists to Display</h3>
      )}
        
      </div>
      </div>
    );
  }
}

export default AlertDialogSlide;