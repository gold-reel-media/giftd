import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import ListPage from './ListPage/ListPage';
import UserProfile from './UserProfile';



const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/list" component={ListPage} />
      <Route exact path="/profile" component={UserProfile} />
    </Switch>
  </BrowserRouter>
);

export default Router;