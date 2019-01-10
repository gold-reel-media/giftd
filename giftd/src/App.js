import React, { Component } from 'react';
import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import './App.css';
import Auth from './Auth/Auth.js';

const auth = new Auth();
auth.login();


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
