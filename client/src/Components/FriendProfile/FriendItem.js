import React from 'react';
import { light } from '@material-ui/core/styles/createPalette';
import './style.css';


class FriendItem extends React.Component {
    render() {
        return (
            <li className="item-container">
                {/* <h3 className='item-name'>{this.props.details.item}</h3> */}
                FRIENDS ITEMS HERE
            </li>
        )
    }
}

export default FriendItem