import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import ListPage from './ListPage/ListPage';
import AddItemForm from './AddItemForm/AddItemForm';




const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/list/:wishlistId" component={AddItemForm} />
        </Switch>
    </BrowserRouter>
);

export default Router;