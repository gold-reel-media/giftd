import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Navbar from '../../NavBar/NavBar'
import './searchPage.css'



function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            profilename: props.profilename,
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.modifyFriend = this.modifyFriend.bind(this);
    }

    handleClick() {
        var op = !this.state.open;
        this.setState({
            open: op
        })
    }

    modifyFriend() {
        console.log("modifyFriend reached");
        var obj = {
            friend1: this.props.loggedUser,
            friend2: this.props.username
        }
        if (!this.props.alreadyFriends) {
            $.ajax({
                type: "POST",
                url: "/api/addFriends",
                data: obj,
                success: friend => {
                    console.log(friend);
                }
            });
        }
        else {
            $.ajax({
                type: "POST",
                url: "/api/removeFriends",
                data: obj,
                succes: friend => {
                    console.log(friend);
                }
            });
        }
        this.handleClick();
    }

    render() {
        if (!this.props.alreadyFriends) {
            return (
                <div>
                    <div className="container-flex">
                        <div className="row">
                            <div className="col-12">
                                <label>username: {this.props.username}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>pofilename: {this.props.profilename}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <Button variant="contained" color="primary" className="classes.button" onClick={this.handleClick}> Add Friend </Button>
                                <Dialog
                                    open={this.state.open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >

                                    <DialogTitle id="alert-dialog-slide-title">
                                        {"Add " + this.props.profilename + " as a Friend?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <div className="dialogBtn">
                                            <Button variant="contained" color="primary" className="classes.button" onClick={this.modifyFriend}> Add </Button>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>

                                        <Button onClick={this.handleClick} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="container-flex">
                        <div className="row">
                            <div className="col-12">
                                <label>username: {this.props.username}</label> <br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>pofilename: {this.props.profilename}</label> <br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <Button variant="contained" color="primary" className="classes.button" onClick={this.handleClick}> Add Friend </Button>
                                <Dialog
                                    open={this.state.open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >

                                    <DialogTitle id="alert-dialog-slide-title">
                                        {"You are already friends with " + this.props.profilename + ". Remove them?"}
                                    </DialogTitle>
                                    <DialogContent>
                                    <div className="dialogBtn">
                                        <Button variant="contained" color="primary" className="classes.button" onClick={this.modifyFriend}> Remove </Button>
                                    </div>
                                    </DialogContent>
                                    <DialogActions>

                                        <Button onClick={this.handleClick} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </div>
                </div >
            )
        }
    }
}

export default SearchResults;