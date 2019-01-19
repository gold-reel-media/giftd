import React, { Component } from 'react';
import AddItemForm from '../AddItemForm/AddItemForm'

class ListPage extends Component {
    render() {
        return (
            <div className="profile-container">
                <h2>List Page</h2>
                <AddItemForm/>
            </div>
        );
    }
}

export default ListPage;