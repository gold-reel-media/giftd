import React from "react";
import Button from "./Button";

class Layer3 extends React.Component {
    render() {
        const styles = {
            fontFamily: 'Karla, sans-serif',
            fontSize: 20,
            lineHeight: '40px',
            color: 'white',
            textAlign: 'center',
            margin: '5%'
        }

        return <div>
            <Button> Find User </Button>
            
            <Button> My Profile </Button>
            
            <Button> Add List </Button>
           
        </div>;
    }
}

export default (Layer3);