import React from 'react';
import { light } from '@material-ui/core/styles/createPalette';
import './style.css';


class Lists extends React.Component {
    render() {
        return (
            <li className="list-container">
                <h3 className='list-name'>{this.props.details.list}</h3>
            </li>
        )
    }
}

export default Lists