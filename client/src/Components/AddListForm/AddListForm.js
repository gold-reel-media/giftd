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
import './style.css';



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

   //clear form
  //  resetForm = () => {
  //   this.setState({
  //     listName: " "
  //   })
  // }  

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
    
  
  render() {
    const { classes } = this.props;
    return (
      <div>
      <div className='add-list-form'>
        <Button style={{borderRadius:"100px"}} onClick={this.handleClickOpen}>
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
          <DialogTitle id="alert-dialog-slide-title">
            {"Enter List Name"}
          </DialogTitle>
          <DialogContent>
            <form  noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label="Name"
                
                value={this.state.listName}
                onChange={this.handleChange('listName')}
                style={{width: '545px'}}
                margin="normal"
                variant="outlined"
              />
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" type="submit">
              Add New List
            </Button>
            
          </DialogActions>
        </Dialog>
      </div>
      <div className="lists">
      {this.state.lists.length ? (
        <List>
         {this.state.lists.map(list => (
           <ListItem key={list.wishlistId}>
            <Link to={'/list/' + list.wishlistId}>
              <strong>
                {list.name}
              </strong>
            </Link>
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
