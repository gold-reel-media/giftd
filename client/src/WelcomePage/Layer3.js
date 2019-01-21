import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

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
            <Link to={"/list"}>
                <Button> Find User </Button>
            </Link>
            <Link to={"/profile"}>
                <Button> My Profile </Button>
            </Link>
            <Link to={"/list"}>
                <Button> Add List </Button>
            </Link>
        </div>;
    }
}

export default (Layer3);