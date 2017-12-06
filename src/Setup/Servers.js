import React, { Component } from 'react';

export class Servers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenkinsServer: "127.0.0.1:8001",
            gitlabServer: "127.0.0.1:8002",
            gitlabToken: "",
            mongodbServer: "127.0.0.1:8003",
            sonarqubeServer: "127.0.0.1:8004"
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    checkConnection(event) {
        alert(event.target.jenkinsServer.value + "-" +event.target.gitlabServer.value + "-" + event.target.mongodbServer.value + "-" + event.target.sonarqubeServer.value );
        
    }

    authenticateUser(username, password) {
        var token = password + ":" + password;
        var hash = btoa(token);
        return "Basic " + hash;
    }

    renderApiServers() {
        return (
            <form onSubmit={this.checkConnection}>
                <h4>gitlab: {this.state.gitlabServer}</h4>
                <h4>gitlab token: {this.state.gitlabToken}</h4>
                <fieldset>
                    <legend>Additional Servers</legend>
                    <div className="form-group">
                        <label>Jenkins Server</label>
                        <input type="text" className="form-control" name="jenkinsServer" id="inputJenkinsServer" defaultValue={this.state.jenkinsServer} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Gitlab Server</label>
                        <input type="text" className="form-control" name="gitlabServer" id="inputGitlabServer" defaultValue={this.state.gitlabServer} onChange={this.handleChange} />
                        <br />
                        <input type="text" className="form-control" name="gitlabToken" id="inputGitlabToken" placeholder="Personal Access Token" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>MongoDB Server</label>
                        <input type="text" className="form-control" name="mongodbServer" id="inputMongoDBServer" defaultValue={this.state.mongodbServer} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>SonarQube Server</label>
                        <input type="text" className="form-control" name="sonarqubeServer" id="inputSonarqubeServer" defaultValue={this.state.sonarqubeServer} onChange={this.handleChange} />
                    </div>
                    <div className="row xs-5">
                        <button type="submit" className="btn btn-success">Test Connections</button>
                        <button type="button" className="btn btn-submit">Save</button>
                    </div>
                </fieldset>
            </form>
        );
    }

    render() {
        return (
            <div className="container">
                <h1>Server Setup</h1>
                {this.renderApiServers()}
            </div>
        );
    }
}