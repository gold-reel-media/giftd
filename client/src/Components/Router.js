import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import ListPage from './ListPage/ListPage';



const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/list" component={ListPage} />
        </Switch>
    </BrowserRouter>
);

export default Router;