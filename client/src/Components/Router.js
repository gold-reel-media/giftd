import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import AddListForm from './AddListForm/AddListForm';
import SearchPage from "./SearchPage/SearchPage";
import UserProfile from './UserProfile';
import AddItemForm from './AddItemForm/AddItemForm';
import FriendProfilePg from './FriendProfile/FriendProfilePg';
import FriendIndList from './FriendProfile/FriendIndList';




const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/list/:wishlistId" component={AddItemForm} />
      <Route exact path="/:username/:wishlistId" component={FriendIndList} />
      <Route exact path="/:username" component={FriendProfilePg} />
    </Switch>
  </BrowserRouter>
);

export default Router;