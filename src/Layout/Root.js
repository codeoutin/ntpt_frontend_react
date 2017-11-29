import React, { Component } from 'react';
import { BrowserRouter, Router, hashHistory, Link, Route, Switch } from 'react-router-dom';

import { Header } from './Header';
import { Splash } from '../Setup/Splash';
import { Admin } from '../Setup/Admin';
import { Instances } from '../Setup/Instances';
import { Initial } from '../Setup/Initial';

export class Root extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <div className="container">
                        <div>
                            <Header />
                            <Route exact path='/' component={Splash} />
                            <Route path='/servers' component={Initial} />
                            <Route path='/admin' component={Admin} />
                            <Route path='/instances' component={Instances} />
                        </div>
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                </Switch>
            </BrowserRouter>

        );
    }
}