import React, { Component } from 'react';
import UserProfile from './Components/UserProfile';
import ListPage from './Components/ListPage/ListPage';
import {Route, withRouter} from 'react-router-dom';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./NavBar/NavBar"
import Main from "./Main/Main"
import './App.css';
// import auth0Client from './Auth';
// import SecuredRoute from ;
import Callback from './Callback';

  


class App extends Component {
    constructor(props) {
      super(props);
        this.state = {
          checkingSession: true,
        }
    }

    async componentDidMount() {
      if(this.props.location.pathname ==='./callback') {
        this.setState({checkingSession: false})
        return;
      }
      try {
        // await auth0Client.silentAuth();
        this.forceUpdate();
      } catch (err) {
        if(err.error !== 'login_required') console.log(err.error)
      }
      this.setState({checkingSession: false})
    }

  render() {
    return (
      <div className="App">
        <NavBar />
        <UserProfile/>
        {/* Friend Profile */}
        <Main />
        <Route exact path='/callback' component={Callback} />


      </div>
    );
  }
}

export default withRouter(App);

