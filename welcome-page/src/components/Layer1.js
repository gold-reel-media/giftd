import logo from "../giftd_logo_white.svg";
import React from "react";

class Layer1 extends React.Component {
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
            <img src={logo} className="App-logo" alt="logo" style={{ width: "50vw", display: 'block', margin: 'auto' }} />
            <br />
            <p style={styles}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. 
            </p>
          </div>;
    }
}

export default (Layer1);