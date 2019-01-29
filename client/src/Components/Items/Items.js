import React from 'react';
import { light } from '@material-ui/core/styles/createPalette';
import './style.css';


class Items extends React.Component {
    render() {
        return (
            <li className="item-container">
                <h3 className='item-name'>{this.props.details.item}</h3>
            </li>
        )
    }
}

export default Items