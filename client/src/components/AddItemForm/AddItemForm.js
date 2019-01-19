










// import React from 'react';
// import './style.css';

// class AddItemForm extends React.Component {
//     // constructor(props) {
//     //     super(props);
//         nameRef = React.createRef();
//         priceRef = React.createRef();
//         linkRef = React.createRef();
//         descRef = React.createRef();
//         imageRef = React.createRef();
//     // }
  

//     createItem = (event) => {
//         event.preventDefault();
//         const item = {
//             name: this.nameRef.current.value,
//             price: this.priceRef.current.value,
//             link: this.linkRef.current.value,
//             desc: this.descRef.current.value,
//             image: this.imageRef.current.value
//         };
//         console.log(item);
//     };
//     render() {
//         return (
//             <div className="form-container">
//             <form className="add-item" onSubmit={this.createItem}>
//                 <input name ="name" ref={this.nameRef} type="text" placeholder="name" />
//                 <input name ="price" ref={this.priceRef} type="text" placeholder="price" />
//                 <input name ="link" ref={this.linkRef} type="text" placeholder="link" />
//                 <textarea name ="desc" ref={this.descRef} placeholder="desc"></textarea>
//                 <input name ="image" ref={this.imageRef} type="text" placeholder="image" />
//                 <button type="submit" onClick={this.createItem}>+Item</button>
//             </form>
//             </div>
//         );
//     }
// }

// export default AddItemForm;