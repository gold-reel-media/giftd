import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './Components/UserProfile';
import ListPage from './Components/ListPage/ListPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserProfile/>
      </div>
    );
  }
}

export default App;

