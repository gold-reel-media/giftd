import React from "react";
import Radium from "radium";

class Button extends React.Component {
  render() {
    const styles = {
      fontSize: 20,
      width: "150px",
      height: "150px",
      color: "#0d9aaa",
      backgroundColor: "white",
      borderRadius: "50%",
      border: "2px solid",
      borderColor: 'white',
      textAlign: "center",
      marginRight: "15px",
      marginLeft: "15px",
      lineHeight: "150px",
      transition: "all ease .4s",
      ':hover': {
        backgroundColor: "#0d9aaa",
        color: "white",
        border: '4px solid',
        borderColor: 'white',
        width: "200px",
        height: "200px",
      }
    };

    return (
        <button style={styles}> {this.props.children} </button>
    );
  }
}

export default Radium(Button);