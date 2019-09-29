import React from "react";
import { Switch, Route } from 'react-router-dom';
import Users from './users/Index';
import Films from './films/Index';
import Dashboard from '../components/dash-board/Index';
import NotFound from '../components/not-found/Index';

export default props => {
    return(

            <Switch>
                <Route path="/" exact={true} component={Dashboard}/>
                <Route path="/users" exact={true} component={Users}/>
                <Route path="/films" exact={true} component={Films}/>
                <Route path="*" exact={true} component={NotFound}/>
            </Switch>


    )
}
