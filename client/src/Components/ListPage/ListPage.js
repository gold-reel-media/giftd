import React, { Component } from 'react';
import AddItemForm from '../AddItemForm/AddItemForm';
import Items from '../Items/Items';

class ListPage extends Component {
    state = {
        items: {}
    };

    addItem = item => {
        //copy of existing state
        const items = {...this.state.items};
        //add new item to items
         items[`item`] = item;
         console.log(items)
         //set new items object to state
         this.setState({
             items
         })
    }
    render() {
        return (
            <div className="list-page-container">
                <h2>List Page</h2>
                <AddItemForm addItem={this.addItem}/>
                <ul className="lists">
                    {Object.keys(this.state.items).map( key => 
                    
                    <Items key={key} details={this.state.items}/>
                  
                  )}
                </ul>
            </div>
        );
    }
}

export default ListPage;