import React from "react";
import Parallax from "react-springy-parallax";
import Layer1 from "./Layer1";
import Layer3 from "./Layer3";
import Layer4 from "./Layer4";

class Welcome extends React.Component {
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
            margin: "15%",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };

        console.log(this.props)
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
                    <p style={pstyle}> Welcome to giftd! This is a website dedicated to helping facilitate gift buying amongst yourself and the people around you, for any occasion! Fear not come Christmas or birthdays, or even when managing a gift registery for a wedding. giftd provides a simple and fun way to coordinate what gifts to buy and who's buying them.  </p>
                </Parallax.Layer>

                <Parallax.Layer
                    offset={2}
                    speed={0.5}
                    style={styles}
                    // onClick={() => this.refs.parallax.scrollTo(3)}
                >
                    <Layer3 history={this.props.history}/>
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

export default Welcome;