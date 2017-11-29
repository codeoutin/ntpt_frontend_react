import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Splash from './Setup/Splash';
import { Root } from './Layout/Root';
import { Home } from './Layout/Home';

import './bootstrap.min.css';

//import registerServiceWorker from './registerServiceWorker';

class App extends Component {
    render() {
        return(
            <Root>
                <Home></Home>
            </Root> 
        );
    }
}

//render(<App />, window.document.getElementById('app'));
ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
