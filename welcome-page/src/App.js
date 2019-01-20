import React from "react";
import Parallax from "react-springy-parallax";
import logo from "./giftd_logo_white.svg";
import Layer1 from "./components/Layer1";
import Layer3 from "./components/Layer3";

class App extends React.Component {
  render() {
    const styles = {
      fontFamily: "Menlo-Regular, Menlo, monospace",
      fontSize: 20,
      lineHeight: "40px",
      textAlign: "center",
      margin: '5px',
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
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
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
          Here we put the about us
        </Parallax.Layer>
      </Parallax>
    );
  }
}

export default App;
