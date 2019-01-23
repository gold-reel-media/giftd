import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
// import "./style.css"

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: '100%',
    
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class OutlinedTextFields extends React.Component {
  state = {
    open: false,
    name: '',
    price: '',
    itemLink: '',
    imageLink: '',
    description: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    //grab input
    // this.props.addItem(this.state.name);


    // this.resetForm();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

   //clear form
   resetForm = () => {
    this.setState({
        name: '',
        price: '',
        itemLink: '',
        imageLink: '',
        description: ''
    })
  } 

  render() {
    const { classes } = this.props;
    return (
      <div>
       <Button style={{borderRadius:"100px"}} onClick={this.handleClickOpen}>
        <i className="fas fa-plus-circle fa-10x"></i>
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"New Item"}
          </DialogTitle>
          <DialogContent>
            <form  noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label="Name"
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
                style={{ width: "48%", marginRight: "15PX", border:'purple'}}
              />
              <TextField
                id="outlined-adornment-amount"
                style={{ width: "48%", marginTop: '16px' }}
                className={classNames(styles.backgroundColor, styles.textField)}
                variant="outlined"
                label="Price"
                value={this.state.price}
                onChange={this.handleChange('price')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <TextField
                id="outlined-name"
                label="Item Link"
                fullWidth
                value={this.state.itemLink}
                onChange={this.handleChange('itemLink')}
                margin="normal"
                variant="outlined"
                
              />
              <TextField
                id="outlined-name"
                label="Image Link"
                fullWidth
                value={this.state.imageLink}
                onChange={this.handleChange('imageLink')}
                margin="normal"
                variant="outlined"
                
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                rowsMax="4"
                // defaultValue="Default Value"
                // className={classes.textField}
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
                variant="outlined"
                style={{ width: "100%" }}
              />
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Add Item
            </Button>
      
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default OutlinedTextFields;











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