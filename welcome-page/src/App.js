import React from "react";
import Parallax from "react-springy-parallax";
import logo from "./giftd_logo_white.svg";
import Layer1 from "./components/Layer1";
import Layer3 from "./components/Layer3";
import Layer4 from "./components/Layer4";

class App extends React.Component {
  render() {
    const styles = {
      fontFamily: 'Karla, sans-serif',
      fontSize: 20,
      lineHeight: "40px",
      textAlign: "center",
      paddingRight: '10px',
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    const pstyle = {
      fontFamily: 'Karla, sans-serif',
      fontSize: 25,
      lineHeight: "55px",
      textAlign: "center",
      margin: "30px",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    return (
      <Parallax ref="parallax" pages={4}>
        <Parallax.Layer
          offset={0}
          speed={0}
          style={{ backgroundColor: "#fb9e1b" }}
        />
        <Parallax.Layer
          offset={1}
          speed={0}
          style={{ backgroundColor: "#ff6f69" }}
        />
        <Parallax.Layer
          offset={2}
          speed={0}
          style={{ backgroundColor: "#0d9aaa" }}
        />
        <Parallax.Layer
          offset={3}
          speed={0}
          style={{ backgroundColor: "#9f7694" }}
        />

        <Parallax.Layer
          offset={0}
          speed={0.5}
          style={styles}
          onClick={() => this.refs.parallax.scrollTo(1)}
        >
          <Layer1 style={{ height: "100%" }} />
        </Parallax.Layer>

        <Parallax.Layer
          offset={1}
          speed={-0.1}
          style={styles}
          onClick={() => this.refs.parallax.scrollTo(2)}
        >
          <p style={pstyle}> Short description of the app goes here. We talk about how you can create a list and buy things for people who have made lists. Short description of the app goes here. We talk about how you can create a list and buy things for people who have made lists. Short description of the app goes here. We talk about how you can create a list and buy things for people who have made lists. </p>
        </Parallax.Layer>

        <Parallax.Layer
          offset={2}
          speed={0.5}
          style={styles}
          onClick={() => this.refs.parallax.scrollTo(3)}
        >
          <Layer3 />
        </Parallax.Layer>

        <Parallax.Layer
          offset={3}
          speed={0.5}
          style={styles}
          onClick={() => this.refs.parallax.scrollTo(0)}
        >
          <Layer4 />
        </Parallax.Layer>
      </Parallax>
    );
  }
}

export default App;
