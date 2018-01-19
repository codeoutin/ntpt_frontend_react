import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Header } from './Header';
import { Splash } from '../Setup/Splash';
import { CamundaServer } from '../Setup/CamundaServer';
import { Servers } from '../Setup/Servers';
import { Instances } from '../Setup/Instances';
import { Alert } from './Alert';

/**
 * This class handles all Routing and Storage for global Variables
 * @author Patrick Steger
 * @see {@link https://github.com/stegerpa/ntpt_frontend_react|GitHub}
 */
export class Root extends Component {
    constructor() {
        super();
        this.state = {
            camundaServer: localStorage.getItem('camundaServer'),
            jenkinsServer: localStorage.getItem('jenkinsServer'),
            gitlabServer: localStorage.getItem('gitlabServer'),
            mongodbServer: localStorage.getItem('mongodbServer'),
            sonarqubeServer: localStorage.getItem('sonarqubeServer'),
            gitlabToken: localStorage.getItem('gitlabToken'),
            dockerServer: localStorage.getItem('dockerServer'),
            menuItems: [
                {link: "/camunda-server",  name: "Camunda Server"},
                {link: "/servers",  name: "Servers"},
                {link: "/instances",  name: "Instances"}
            ]
        };
        
        this.changeCamundaServer = this.changeCamundaServer.bind(this);
        this.changeJenkinsServer = this.changeJenkinsServer.bind(this);
        this.changeGitlabServer = this.changeGitlabServer.bind(this);
        this.changeGitlabToken = this.changeGitlabToken.bind(this);
        this.changeMongodbServer = this.changeMongodbServer.bind(this);
        this.changeSonarqubeServer = this.changeSonarqubeServer.bind(this);
        this.changeDockerServer = this.changeDockerServer.bind(this);
        this.saveConnection = this.saveConnection.bind(this);
    }

    componentDidMount() {
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
        this.setState({gitlabToken: e.target.value})
    }
    changeMongodbServer(e) {
        this.setState({mongodbServer: e.target.value.replace(/^(https?:|)\/\//,'')})
    }
    changeSonarqubeServer(e) {
        this.setState({sonarqubeServer: e.target.value.replace(/^(https?:|)\/\//,'')})
    }
    changeDockerServer(e) {
        this.setState({dockerServer: e.target.value.replace(/^(https?:|)\/\//,'')})
    }

    /**
     * Saves commited Servers in a Local Browser Storage
     * @param {Event} e - Form Elements
     */
    saveConnection(e) {
        e.preventDefault();
        console.log("saved");
        localStorage.setItem('camundaServer', this.state.camundaServer);
        localStorage.setItem('jenkinsServer', this.state.jenkinsServer);
        localStorage.setItem('gitlabServer', this.state.gitlabServer);
        localStorage.setItem('mongodbServer', this.state.mongodbServer);
        localStorage.setItem('sonarqubeServer', this.state.sonarqubeServer);
        localStorage.setItem('gitlabToken', this.state.gitlabToken);
        localStorage.setItem('dockerServer', this.state.dockerServer);
        this.refs.alert.generateAlert("Success", "Your data has been saved.", "success")
    }

    /**
     * Renders Subpages with Props as Components
     */
    render () {
        const CamundaServerPage = (props) => {return ( 
        <CamundaServer 
            camundaServer={this.state.camundaServer} 
            changeCamundaServer={this.changeCamundaServer.bind(this)}
            saveConnection={this.saveConnection.bind(this)}
        />)}

        const ServersPage = (props) => {return ( 
        <Servers 
            servers={this.state}
            changeJenkinsServer={this.changeJenkinsServer.bind(this)}
            changeGitlabServer={this.changeGitlabServer.bind(this)}
            changeGitlabToken={this.changeGitlabToken.bind(this)}
            changeMongodbServer={this.changeMongodbServer.bind(this)}
            changeSonarqubeServer={this.changeSonarqubeServer.bind(this)}
            changeDockerServer={this.changeDockerServer.bind(this)}
            saveConnection={this.saveConnection.bind(this)}
            
        />)}

        const InstancesPage = (props) => {return ( 
        <Instances 
            servers={this.state} 
        />)}

        return (
            <BrowserRouter>
                <Switch>
                    <div>
                        <Alert ref="alert" />
                        <Header title="NTPT" menuItems={this.state.menuItems} />
                        <Route exact path='/' component={Splash} />
                        <Route path='/camunda-server' render={CamundaServerPage} />
                        <Route path='/servers' render={ServersPage} />
                        <Route path='/instances' render={InstancesPage} />
                    </div>
                </Switch>
            </BrowserRouter>
        );
    }
}