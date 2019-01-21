import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import './style.css';



function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
    listName: ""
  };


  handleChange = listName => event => {
    this.setState({
      [listName]: event.target.value,
    });    
  };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

   //clear form
   resetForm = () => {
    this.setState({
      listName: " "
    })
  }  

  handleClose = () => {
    this.setState({ open: false });
    //grab input
    this.props.addList(this.state.listName)
    this.resetForm();
  };
    
    
    
 

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
            {"Enter List Name"}
          </DialogTitle>
          <DialogContent>
            <form  noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label="Name"
                
                value={this.state.listName}
                onChange={this.handleChange('listName')}
                style={{width: '545px'}}
                margin="normal"
                variant="outlined"
              />
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" type="submit">
              Add New List
            </Button>
            
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
