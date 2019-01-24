import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import SearchResults from './SearchResults';

class SearchPage extends Component {
    
    state = {
        textFieldValue: "",
        searchResult: {
            username: "not found",
            profilename: "not found"
        },
        alreadyFriends: false,
        loggedUser: JSON.parse(sessionStorage.getItem("profile")).email
    }


    handleTextChange = (e) => {
        this.setState({
            textFieldValue: e.target.value
        });
    }

    handleSubmit = () => {
        $.get("/api/getUser/" + this.state.textFieldValue).then( result => {
            if(result){
                this.setState({
                    searchResult: result
                });
                $.get("/api/getFriends/" + this.state.loggedUser).then(friends => {
                    console.log(friends);
                    if(this.state.searchResult in friends){
                        this.setState({
                            alreadyFriends: true
                        });
                    }
                    else{
                        this.setState({
                            alreadyFriends: false
                        });
                    }                    
                })
            }
            else{
                this.setState({
                    searchResult: {
                        username: "not found",
                        profilename: "not found"
                    }
                });
            }
        });

    }

    render() {
        return (
            <div className="searchPage">
              <label>
                Name:
                <TextField value={this.state.textFieldValue} onChange={this.handleTextChange} />
              </label>
              <Button variant="contained" className="classes.button" onClick={this.handleSubmit}>
                Search
                </Button>
                {this.state.searchResult.username !== "not found" && <SearchResults profilename={this.state.searchResult.profilename} username={this.state.searchResult.username} alreadyFriends={this.state.alreadyFriends}/>}
              </div>
          );
    }

}

export default SearchPage;