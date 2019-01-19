import React, { Component } from 'react';
import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import './App.css';

// function dataBaby(){
//     console.log("heeeeeeello");
// }

class App extends Component {

  render() {
    // dataBaby();
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
