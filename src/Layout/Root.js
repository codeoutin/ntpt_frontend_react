import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { Provider } from 'react-redux';

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
            servers: {
                camundaServer: "127.0.0.1:8080",
                jenkinsServer: "127.0.0.1:8001",
                gitlabServer: "127.0.0.1:8002",
                mongodbServer: "127.0.0.1:8003",
                sonarqubeServer: "127.0.0.1:8004"
            }
        };
    }

    changeCamundaServer(address) {
        this.setState({camundaServer: address})
    }
    changeJenkinsServer(address) {
        this.setState({jenkinsServer: address})
    }
    changeGitlabServer(address) {
        this.setState({gitlabServer: address})
    }
    changeMongodbServer(address) {
        this.setState({mongodbServer: address})
    }
    changeSonarqubeServer(address) {
        this.setState({sonarqubeServer: address})
    }


    render () {
        const CamundaServerPage = (props) => {return ( <CamundaServer servers={this.state} />)}

        const ServersPage = (props) => {return ( <Servers 
            changeCamundaServer={this.changeCamundaServer.bind(this)}
            changeJenkinsServer={this.changeJenkinsServer.bind(this)}
            changeGitlabServer={this.changeGitlabServer.bind(this)}
            changeMongodbServer={this.changeMongodbServer.bind(this)}
            changeSonarqubeServer={this.changeSonarqubeServer.bind(this)} />)}

        const AdminPage = (props) => {return ( <Admin /> )}
        const InstancesPage = (props) => {return ( <Instances servers={this.state.servers} /> )}

        return (
            <BrowserRouter>
                <Switch>
                    <div>
                        <Header title="NTPT" />
                        <Route exact path='/' component={Splash} />
                        <Route path='/camunda-server' render={CamundaServerPage} />
                        <Route path='/servers' render={ServersPage} />
                        <Route path='/admin' render={AdminPage} />
                        <Route path='/instances' render={InstancesPage} />
                    </div>
                </Switch>
            </BrowserRouter>

        );
    }
}