import React from 'react';
import Parallax from 'react-springy-parallax';
import logo from './giftd_logo_white.svg';
import Layer1 from './components/Layer1';

class App extends React.Component {
  render() {
    const styles = {
      fontFamily: 'Menlo-Regular, Menlo, monospace',
      fontSize: 14,
      lineHeight: '10px',
      color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }
    return <Parallax ref="parallax" pages={4}>
        <Parallax.Layer offset={0} speed={0} style={{ backgroundColor: "#fb9e1b" }} />
        <Parallax.Layer offset={1} speed={0} style={{ backgroundColor: "#ff6f69" }} />
        <Parallax.Layer offset={2} speed={0} style={{ backgroundColor: "#0d9aaa" }} />
        <Parallax.Layer offset={3} speed={0} style={{ backgroundColor: "#9f7694" }} />

        <Parallax.Layer offset={0} speed={0.5} style={styles} onClick={() => this.refs.parallax.scrollTo(1)}>
        <Layer1 style={{ height: '100%' }}/>
        </Parallax.Layer>

        <Parallax.Layer offset={1} speed={-0.1} style={styles} onClick={() => this.refs.parallax.scrollTo(2)}>
          Here we put some more info
        </Parallax.Layer>

        <Parallax.Layer offset={2} speed={0.5} style={styles} onClick={() => this.refs.parallax.scrollTo(3)}>
          Here we put the links
        </Parallax.Layer>

        <Parallax.Layer offset={3} speed={0.5} style={styles} onClick={() => this.refs.parallax.scrollTo(0)}>
          Here we put the about us
        </Parallax.Layer>
      </Parallax>;
  }
}

export default App;
