import React from "react";
import Radium from "radium";


class About extends React.Component {
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
            marginBottom: "20%",
            marginTop: "20%",
            lineHeight: "150px",
            transition: "all ease .2s",
            ':hover': {
                backgroundColor: "#0d9aaa",
                color: "white",
                border: '2px solid',
                borderColor: 'white',
            }
        };

        return (
            <button style={styles}> {this.props.children} </button>
        );
    }
}

export default Radium(About);