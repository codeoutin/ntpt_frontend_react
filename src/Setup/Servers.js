import React, { Component } from 'react';
import { Alert } from '../Layout/Alert';

export class Servers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenkinsServer: this.props.servers.jenkinsServer,
            gitlabServer: this.props.servers.gitlabServer,
            mongodbServer: this.props.servers.mongodbServer,
            sonarqubeServer: this.props.servers.sonarqubeServer,
            gitlabToken: this.props.servers.gitlabToken,

            jenkinsTestSuccess: false,
            gitlabTestSuccess: false,
            mongodbTestSuccess: false,
            sonarqubeTestSuccess: false,
        };

        // This binding is necessary to make `this` work in the callback
        this.changeJenkinsServer = this.changeJenkinsServer.bind(this);
        this.changeGitlabServer = this.changeGitlabServer.bind(this);
        this.changeGitlabToken = this.changeGitlabToken.bind(this);
        this.changeMongodbServer = this.changeMongodbServer.bind(this);
        this.changeSonarqubeServer = this.changeSonarqubeServer.bind(this);

        this.checkJenkinsConnection = this.checkJenkinsConnection.bind(this);
        this.checkGitlabConnection = this.checkGitlabConnection.bind(this);
        this.checkMongodbConnection = this.checkMongodbConnection.bind(this);
        this.checkSonarqubeConnection = this.checkSonarqubeConnection.bind(this);
    }

    changeJenkinsServer(e) {
        this.setState({jenkinsServer: e.target.value});
        this.props.changeJenkinsServer(e);
    }

    changeGitlabServer(e) {
        this.setState({gitlabServer: e.target.value});
        this.props.changeGitlabServer(e);
    }

    changeGitlabToken(e) {
        this.setState({gitlabToken: e.target.value});
        this.props.changeGitlabToken(e);
    }

    changeMongodbServer(e) {
        this.setState({mongodbServer: e.target.value});
        this.props.changeMongodbServer(e);
    }

    changeSonarqubeServer(e) {
        this.setState({sonarqubeServer: e.target.value});
        this.props.changeSonarqubeServer(e);
    }

    checkJenkinsConnection(e) {
        e.preventDefault();
        var url = this.state.jenkinsServer + '/api/json';
        console.log('http://' + url);
        fetch('http://' + url)
        .then(result => {
            result.json()
            this.setState({jenkinsTestSuccess: true});
            this.refs.alert.generateAlert("Connection successfull", "Jenkins Server is running. Save the connection to proceed", "success")
        })
        .catch(error => {
            this.setState({jenkinsTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    checkGitlabConnection(e) {
        e.preventDefault();
        var url = this.state.gitlabServer + '/api/v4/projects?private-token=' + this.state.gitlabToken;
        console.log('http://' + url);
        fetch('http://' + url)
        .then(result => {
            //result.json() < Unhandled Rejection (SyntaxError): Unexpected token G in JSON at position 0. .........
            this.setState({gitlabTestSuccess: true});
            if(result.message === "401 Unauthorized") {
                this.refs.alert.generateAlert("Connection failed", "GitLab Token seems to be wrong", "warning");
            }
            this.refs.alert.generateAlert("Connection successfull", "GitLab Server is running. Save the connection to proceed", "success")
        })
        .catch(error => {
            this.setState({gitlabTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    checkMongodbConnection(e) {
        e.preventDefault();
        var url = this.state.mongodbServer + '/status';
        console.log('http://' + url);
        fetch('http://' + url)
        .then(result => {
            this.setState({mongodbTestSuccess: true});
            this.refs.alert.generateAlert("Connection successfull", "MongoDB Server is running. Save the connection to proceed", "success")
        })
        .catch(error => {
            this.setState({mongodbTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    checkSonarqubeConnection(e) {
        e.preventDefault();
        var url = this.state.sonarqubeServer + '/api/languages/list';
        console.log('http://' + url);
        fetch('http://' + url)
        .then(result => {
            console.log(result.languages);
            this.setState({sonarqubeTestSuccess: true});
            this.refs.alert.generateAlert("Connection successfull", "SonarQube Server is running. Save the connection to proceed", "success")
        })
        .catch(error => {
            this.setState({sonarqubeTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    authenticateUser(username, password) {
        var token = password + ":" + password;
        var hash = btoa(token);
        return "Basic " + hash;
    }

    renderApiServers() {
        return (
            <form onSubmit={this.props.saveConnection}>
                <fieldset>
                    <legend>Required Servers</legend>

                    <div className="form-group">
                        <label>Jenkins Server <button type="button" onClick={this.checkJenkinsConnection} className="btn btn-sm btn-warning">Test Connection</button></label>
                        <input type="text" className="form-control" name="jenkinsServer" id="inputJenkinsServer" defaultValue={this.props.servers.jenkinsServer} onChange={this.changeJenkinsServer} />
                    </div>

                    <div className="form-group">
                        <label>Gitlab Server <button type="button" onClick={this.checkGitlabConnection} className="btn btn-sm btn-warning">Test Connection</button></label>
                        <input type="text" className="form-control" name="gitlabServer" id="inputGitlabServer" defaultValue={this.props.servers.gitlabServer} onChange={this.props.changeGitlabServer} />
                        <br />
                        <input type="text" className="form-control" name="gitlabToken" id="inputGitlabToken" defaultValue={this.props.servers.gitlabToken} placeholder="Personal Access Token" onChange={this.changeGitlabToken} />
                    </div>

                    <div className="form-group">
                        <label>MongoDB Server <button type="button" onClick={this.checkMongodbConnection} className="btn btn-sm btn-warning">Test Connection</button></label>
                        <input type="text" className="form-control" name="mongodbServer" id="inputMongoDBServer" defaultValue={this.props.servers.mongodbServer} onChange={this.changeMongodbServer} />
                    </div>

                    <div className="form-group">
                        <label>SonarQube Server <button type="button" onClick={this.checkSonarqubeConnection} className="btn btn-sm btn-warning">Test Connection</button></label>
                        <input type="text" className="form-control" name="sonarqubeServer" id="inputSonarqubeServer" defaultValue={this.props.servers.sonarqubeServer} onChange={this.changeSonarqubeServer} />
                    </div>

                    {this.state.gitlabTestSuccess &&
                        <button type="submit" className="btn btn-success">Save</button>
                    }
                </fieldset>
            </form>
        );
    }

    render() {
        return (
            <div className="container">
                <h1>Server Setup</h1>
                <Alert ref="alert" />
                {this.renderApiServers()}
            </div>
        );
    }
}