import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}





// import React from 'react';
// import { light } from '@material-ui/core/styles/createPalette';
// import './style.css';


// class Lists extends React.Component {
//     render() {
//         return (
//             <li className="list-container">
//                 <h3 className='list-name'>{this.props.details.list}</h3>
//             </li>
//         )
//     }
// }

// export default Lists