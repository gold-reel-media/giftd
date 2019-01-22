import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import $ from 'jquery';

function SearchResults(props) {
    
    return(
        <div>
            <label>username: {props.username}</label> <br />
            <label>pofilename: {props.profile}</label>
        </div>
    )

}

export default SearchResults;