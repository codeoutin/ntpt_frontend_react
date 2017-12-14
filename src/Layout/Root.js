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
            camundaServer: "127.0.0.1:8080",
            jenkinsServer: "127.0.0.1:8001",
            gitlabServer: "127.0.0.1:8002",
            mongodbServer: "127.0.0.1:8003",
            sonarqubeServer: "127.0.0.1:8004",
            gitlabToken: "wAdcZ3ZnnRcc5dk7Wwyn"
        };
        
        this.changeCamundaServer = this.changeCamundaServer.bind(this);
        this.changeJenkinsServer = this.changeJenkinsServer.bind(this);
        this.changeGitlabServer = this.changeGitlabServer.bind(this);
        this.changeGitlabToken = this.changeGitlabToken.bind(this);
        this.changeMongodbServer = this.changeMongodbServer.bind(this);
        this.changeSonarqubeServer = this.changeSonarqubeServer.bind(this);
    }

    changeCamundaServer(e) {        
        this.setState({camundaServer: e.target.value.replace(/^(https?:|)\/\//,'')}) // removes http:// and https:// from URL
    }
    changeJenkinsServer(e) {
        this.setState({jenkinsServer: e.target.value.replace(/^(https?:|)\/\//,'')})
    }
    changeGitlabServer(e) {
        this.setState({gitlabServer: e.target.value.replace(/^(https?:|)\/\//,'')})
    }
    changeGitlabToken(e) {
        this.setState({gitlabToken: e.target.value.replace(/^(https?:|)\/\//,'')})
    }
    changeMongodbServer(e) {
        this.setState({mongodbServer: e.target.value.replace(/^(https?:|)\/\//,'')})
    }
    changeSonarqubeServer(e) {
        this.setState({sonarqubeServer: e.target.value.replace(/^(https?:|)\/\//,'')})
    }
    


    render () {
        const CamundaServerPage = (props) => {return ( <CamundaServer servers={this.state.servers} />)}

        const ServersPage = (props) => {return ( <Servers 
            servers={this.state}
            changeCamundaServer={this.changeCamundaServer.bind(this)}
            changeJenkinsServer={this.changeJenkinsServer.bind(this)}
            changeGitlabServer={this.changeGitlabServer.bind(this)}
            changeMongodbServer={this.changeMongodbServer.bind(this)}
            changeSonarqubeServer={this.changeSonarqubeServer.bind(this)} />)}

        const AdminPage = (props) => {return ( <Admin /> )}
        const InstancesPage = (props) => {return ( <Instances servers={this.state} /> )}

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