import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import ListPage from './ListPage/ListPage';
import AddItemForm from './AddItemForm/AddItemForm';
import FriendProfilePg from './FriendProfile/FriendProfilePg';
import FriendIndList from './FriendProfile/FriendIndList';
import FriendItem from './FriendProfile/FriendItem';



const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/list/:wishlistId" component={AddItemForm} />
            <Route exact path="/friendlist/:wishlistId" component={FriendIndList} />
            <Route exact path="/:username" component={FriendProfilePg} />
        </Switch>
    </BrowserRouter>
);

export default Router;