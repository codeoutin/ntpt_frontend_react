import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Header } from './Header';
import { Splash } from '../Setup/Splash';
import { CamundaServer } from '../Setup/CamundaServer';
import { Servers } from '../Setup/Servers';
import { Admin } from '../Setup/Admin';
import { Instances } from '../Setup/Instances';

export class Root extends Component {
    constructor() {
        super();
        this.state = {
            servers: {}
        };
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <div>
                        <Header title="NTPT" />
                        <Route exact path='/' component={Splash} />
                        <Route path='/camunda-server' component={CamundaServer} />
                        <Route path='/servers' component={Servers} />
                        <Route path='/admin' component={Admin} />
                        <Route path='/instances' component={Instances} />
                    </div>
                </Switch>
            </BrowserRouter>

        );
    }
}