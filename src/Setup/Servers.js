import React, { Component } from 'react';

export class Servers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenkinsServer: "127.0.0.1:8001",
            gitlabServer: "127.0.0.1:8002",
            mongodbServer: "127.0.0.1:8003",
            sonarqubeServer: "127.0.0.1:8004"
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    checkConnection(event) {
        //var url = this.server + '/engine-rest/engine/default/task/count';

        // New XMLHTTPRequest
        //var request = new XMLHttpRequest();
        //request.open("GET", url, false);
        //request.setRequestHeader("Authorization", this.authenticateUser(username, password));
        //request.send();
        // view request status
        alert(event.target.jenkinsServer.value + "-" +event.target.gitlabServer.value + "-" + event.target.mongodbServer.value + "-" + event.target.sonarqubeServer.value );
        //alert(request.responseText);
    }

    authenticateUser(username, password) {
        var token = password + ":" + password;
        var hash = btoa(token);
        return "Basic " + hash;
    }

    renderApiServers() {
        return (
            <form onSubmit={this.checkConnection}>
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