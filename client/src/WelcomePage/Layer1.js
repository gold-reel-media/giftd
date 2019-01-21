import logo from "../giftd_logo_white.svg";
import React from "react";

class Layer1 extends React.Component {
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
            <img src={logo} className="App-logo" alt="logo" style={{ width: "50vw", display: 'block', margin: 'auto' }} />
            <br />
            <p style={styles}>
                Tagline goes here.
            </p>
        </div>;
    }
}

export default (Layer1);