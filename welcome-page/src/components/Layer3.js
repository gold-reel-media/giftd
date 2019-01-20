import React from "react";
import Button from "./Button";

class Layer3 extends React.Component {
    render() {
        const styles = {
            fontFamily: 'Menlo-Regular, Menlo, monospace',
            fontSize: 20,
            lineHeight: '40px',
            color: 'white',
            textAlign: 'center',
            margin: '5%'
        }

        return <div>
            <Button> Find User </Button>
            <br />
            <Button> My Profile </Button>
            <br />
            <Button> Add List </Button>
            <br />
        </div>;
    }
}

export default (Layer3);