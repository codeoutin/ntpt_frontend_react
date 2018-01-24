import React, { Component } from 'react';
import { Alert } from '../Layout/Alert';

/**
 * Display a Page to enter multiple Servers to connect to
 * @author Patrick Steger
 * @see {@link https://github.com/stegerpa/ntpt_frontend_react|GitHub}
 */

export class Servers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenkinsServer: (this.props.servers.jenkinsServer !== "null" ? this.props.servers.jenkinsServer : "") ,
            gitlabServer: (this.props.servers.gitlabServer !== "null" ? this.props.servers.gitlabServer : ""),
            gitlabToken: (this.props.servers.gitlabToken !== "null" ? this.props.servers.gitlabToken : ""),
            mongodbServer: (this.props.servers.mongodbServer !== "null" ? this.props.servers.mongodbServer : ""),
            sonarqubeServer: (this.props.servers.sonarqubeServer !== "null" ? this.props.servers.sonarqubeServer : ""),
            sonarqubeToken: (this.props.servers.sonarqubeToken !== "null" ? this.props.servers.sonarqubeToken : ""),
            dockerServer: (this.props.servers.dockerServer !== "null" ? this.props.servers.dockerServer : ""),

            jenkinsTestSuccess: false,
            gitlabTestSuccess: false,
            mongodbTestSuccess: false,
            sonarqubeTestSuccess: false,
            dockerTestSuccess: false,
        };

        // This binding is necessary to make `this` work in the callback
        this.changeJenkinsServer = this.changeJenkinsServer.bind(this);
        this.changeGitlabServer = this.changeGitlabServer.bind(this);
        this.changeGitlabToken = this.changeGitlabToken.bind(this);
        this.changeMongodbServer = this.changeMongodbServer.bind(this);
        this.changeSonarqubeServer = this.changeSonarqubeServer.bind(this);
        this.changeSonarqubeToken = this.changeSonarqubeToken.bind(this);
        this.changeDockerServer = this.changeDockerServer.bind(this);
        
        this.checkJenkinsConnection = this.checkJenkinsConnection.bind(this);
        this.checkGitlabConnection = this.checkGitlabConnection.bind(this);
        this.checkMongodbConnection = this.checkMongodbConnection.bind(this);
        this.checkSonarqubeConnection = this.checkSonarqubeConnection.bind(this);
        this.checkDockerConnection = this.checkDockerConnection.bind(this);
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
    
    changeSonarqubeToken(e) {
        this.setState({sonarqubeToken: e.target.value});
        this.props.changeSonarqubeToken(e);
    }

    changeDockerServer(e) {
        this.setState({dockerServer: e.target.value});
        this.props.changeDockerServer(e);
    }

    /**
     * Test Connection to a Jenkins Server
     * @param {*} e 
     */
    checkJenkinsConnection(e) {
        e.preventDefault();
        var url = 'http://' + this.state.jenkinsServer + '/api/json';
        fetch(url)
        .then(result => {
            if(result.status === 200 && result.url === url) {
                this.setState({jenkinsTestSuccess: true});
                this.refs.alert.generateAlert("Connection successfull", "Jenkins Server is running. Save the connection to proceed", "success")
            } else {
                this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
            }
        })
        .catch(error => {
            this.setState({jenkinsTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    /**
     * Test Connection to a GitLab Server
     * @param {*} e 
     */
    checkGitlabConnection(e) {
        e.preventDefault();
        var url = 'http://' + this.state.gitlabServer + '/api/v4/projects?private-token=' + this.state.gitlabToken;
        fetch(url)
        .then(result => {
            if(result.status === 200 && result.url === url) {
                this.setState({gitlabTestSuccess: true});
                this.refs.alert.generateAlert("Connection successfull", "GitLab Server is running. Save the connection to proceed", "success")
            } else if (result.message === "401 Unauthorized") {
                this.refs.alert.generateAlert("Connection failed", "GitLab Token seems to be wrong", "warning");
            } else {
                this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
            }
        })
        .catch(error => {
            this.setState({gitlabTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    /**
     * Test Connection to a MongoDB Server
     * @param {*} e 
     */
    checkMongodbConnection(e) {
        e.preventDefault();
        var url = 'http://' + this.state.mongodbServer + '/status';
        fetch(url)
        .then(result => {
            if(result.status === 200 && result.url === url) {
                this.setState({mongodbTestSuccess: true});
                this.refs.alert.generateAlert("Connection successfull", "MongoDB Server is running. Save the connection to proceed", "success")
            } else {
                this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
            }
        })
        .catch(error => {
            this.setState({mongodbTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    /**
     * Test Connection to a SonarQube Server
     * @param {*} e 
     */
    checkSonarqubeConnection(e) {
        e.preventDefault();
        var url = 'http://' + this.state.sonarqubeServer + '/api/languages/list';
        fetch(url)
        .then(result => {
            if(result.status === 200 && result.url === url) {
                this.setState({sonarqubeTestSuccess: true});
                this.refs.alert.generateAlert("Connection successfull", "SonarQube Server is running. Save the connection to proceed", "success")
            } else {
                this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
            }
        })
        .catch(error => {
            this.setState({sonarqubeTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    /**
     * Test Connection to a Docker Server
     * @param {*} e 
     */
    checkDockerConnection(e) {
        e.preventDefault();
        var url = 'http://' + this.state.dockerServer + '/containers/json';
        fetch(url)
        .then(result => {
            if(result.status === 200 && result.url === url) {
                this.setState({dockerTestSuccess: true});
                this.refs.alert.generateAlert("Connection successfull", "Docker Server is running. Save the connection to proceed", "success")
            } else {
                this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
            }
        })
        .catch(error => {
            this.setState({dockerTestSuccess: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working check the console.log.", "warning");
        });
    }

    renderApiServers() {
        return (
            <form onSubmit={this.props.saveConnection}>
                <fieldset>
                    {/* Jenkins */}
                    <div className="form-group">
                        <legend><a href={'http://'+this.state.jenkinsServer}>Jenkins Server</a></legend>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">http://</span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="jenkinsServer" 
                                id="inputJenkinsServer" 
                                defaultValue={this.state.jenkinsServer} 
                                placeholder="Jenkins Server URL" 
                                onChange={this.changeJenkinsServer} />
                            <div className="input-group-append">
                                <button 
                                    type="button" 
                                    disabled={!this.state.jenkinsServer}
                                    onClick={this.checkJenkinsConnection} 
                                    className="btn btn-outline-secondary">Test Connection
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* GitLab */}
                    <div className="form-group">
                        <legend><a href={'http://'+this.state.gitlabServer}>Gitlab Server</a></legend>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">http://</span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="gitlabServer" 
                                id="inputGitlabServer" 
                                defaultValue={this.state.gitlabServer} 
                                placeholder="GitLab Server URL" 
                                onChange={this.changeGitlabServer} />
                            <input 
                                type="text" 
                                className="form-control" 
                                name="gitlabToken"
                                id="inputGitlabToken" 
                                defaultValue={this.state.gitlabToken} 
                                placeholder="Personal Access Token" 
                                onChange={this.changeGitlabToken} />
                            <div className="input-group-append">
                                <button 
                                    type="button"
                                    disabled={!this.state.gitlabServer && !this.state.gitlabToken}
                                    onClick={this.checkGitlabConnection} 
                                    className="btn btn-outline-secondary">Test Connection
                                </button>
                            </div>
                        </div>
                        <small className="form-text text-muted">GitLab Personal Access Token. If you need help <a
                            href="https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html" 
                            target="_blank" rel="noopener noreferrer">read the docs</a>.
                        </small>
                    </div>

                    {/* MongoDB */}
                    <div className="form-group">
                        <legend><a href={'http://'+this.state.mongodbServer}>MongoDB Server</a></legend>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">http://</span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="mongodbServer" 
                                id="inputMongoDBServer" 
                                defaultValue={this.state.mongodbServer} 
                                placeholder="MongoDB Server URL" 
                                onChange={this.changeMongodbServer} />
                            <div className="input-group-append">
                                <button 
                                    type="button"
                                    disabled={!this.state.mongodbServer}
                                    onClick={this.checkMongodbConnection} 
                                    className="btn btn-outline-secondary">Test Connection
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SonarQube */}
                    <div className="form-group">
                        <legend><a href={'http://'+this.state.sonarqubeServer}>SonarQube Server</a></legend>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">http://</span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="sonarqubeServer" 
                                id="inputSonarqubeServer" 
                                defaultValue={this.state.sonarqubeServer} 
                                placeholder="SonarQube Server URL" 
                                onChange={this.changeSonarqubeServer} />
                            <input 
                                type="text" 
                                className="form-control" 
                                name="sonarqubeToken"
                                id="inputSonarqubeToken" 
                                defaultValue={this.state.sonarqubeToken} 
                                placeholder="User Token" 
                                onChange={this.changeSonarqubeToken} />
                            <div className="input-group-append">
                                <button 
                                    type="button" 
                                    disabled={!this.state.sonarqubeServer}
                                    onClick={this.checkSonarqubeConnection} 
                                    className="btn btn-outline-secondary">Test Connection
                                </button>
                            </div>
                        </div>
                        <small className="form-text text-muted">SonarQube User Token. If you need help <a
                            href="https://docs.sonarqube.org/display/SONAR/User+Token" 
                            target="_blank" rel="noopener noreferrer">read the docs</a>.
                        </small>
                    </div>

                    {/* Docker */}
                    <div className="form-group">
                        <legend><a href={'http://'+this.state.dockerServer}>Docker API Server</a></legend>
                        <div className="input-group">
                            
                            <div className="input-group-prepend">
                                <span className="input-group-text">http://</span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="dockerServer" 
                                id="inputDockerServer" 
                                defaultValue={this.state.dockerServer} 
                                placeholder="Docker API Server URL" 
                                onChange={this.changeDockerServer} />
                            <div className="input-group-append">
                                <button 
                                    type="button" 
                                    disabled={!this.state.dockerServer}
                                    onClick={this.checkDockerConnection} 
                                    className="btn btn-outline-secondary">Test Connection
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <button 
                        type="submit" 
                        className="btn btn-success">Save
                    </button><br /><br />
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