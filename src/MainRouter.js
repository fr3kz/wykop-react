import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Main from './core/Index';

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='' component={Main}></Route>
        </Switch>
    </div>
)

export default MainRouter;