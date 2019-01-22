import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import SearchResults from './SearchResults';

class SearchPage extends Component {
    state = {
        textFieldValue: "",
        searchResult: {}
    };

    handleTextChange = (e) => {
        this.setState({
            textFieldValue: e.target.value
        });
    }

    handleSubmit = () => {
        $.get("/api/getUser/" + this.state.textFieldValue).then( result => {
            this.setState({
                textFieldValue: "",
                searchResult: result
            });
            console.log(this.state.searchResult)
        });

    }

    render() {
        return (
            <div>
              <label>
                Name:
                <TextField value={this.state.textFieldValue} onChange={this.handleTextChange} />
              </label>
              <Button variant="contained" className="classes.button" onClick={this.handleSubmit}>
                Search
                </Button>
                {this.state.searchResult.username && <SearchResults profile={this.state.searchResult.profilename} username={this.state.searchResult.username}/>}
              </div>
          );
    }

}

export default SearchPage;