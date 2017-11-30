import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Initial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            username: "pse",
            password: "berlin",
            server: "127.0.0.1:8080"
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }




    checkConnection(event) {
        //var url = this.server + '/engine-rest/engine/default/task/count';

        // New XMLHTTPRequest
        //var request = new XMLHttpRequest();
        //request.open("GET", url, false);
        //request.setRequestHeader("Authorization", this.authenticateUser(username, password));
        //request.send();
        // view request status
        alert(event.target.password.value + event.target.username.value );
        //alert(request.responseText);
    }

    authenticateUser(username, password) {
        var token = password + ":" + password;
        var hash = btoa(token);
        return "Basic " + hash;
    }


    renderCamundaSetup() {
        return (
            <form onSubmit={this.checkConnection}>
                <fieldset>
                    <legend>Camunda Server</legend>
                    <div className="form-group">
                        <p>First you have to connect to the Camunda Server</p>
                        <label for="inputCamundaServer">Server-Adress</label>
                        <input type="text" name="server" className="form-control" id="inputCamundaServer" aria-describedby="camundaServerHelp" placeholder="127.0.0.1:8080" />
                        <small id="camundaServerHelp" className="form-text text-muted">Make sure the server is running.</small>
                    </div>
                    <div className="form-group">
                        <label for="inputCamundaLogin">Login</label>
                        <input type="text" name="username" className="form-control" id="inputCamundaLogin" />
                    </div>
                    <div className="form-group">
                        <label for="inputCamundaPw">Password</label>
                        <input type="password" name="password" className="form-control" id="inputCamundaPw" />
                    </div>
                    <button type="submit" className="btn btn-warning">Connect</button>

                </fieldset>
            </form>
        )
    }

    renderApiServers() {
        return (
            <form>
                <fieldset>
                    <legend>Additional Servers</legend>
                    <div className="form-group">
                        <label for="inputJenkinsServer">Jenkins Server</label>
                        <input type="text" className="form-control" id="inputJenkinsServer" aria-describedby="jenkinsServerHelp" placeholder="127.0.0.1:8001" />
                    </div>

                    <div className="form-group">
                        <label for="inputGitLabServer">Gitlab Server</label>
                        <input type="text" className="form-control" id="inputGitlabServer" aria-describedby="gitlabServerHelp" placeholder="127.0.0.1:8002" />
                    </div>

                    <div className="form-group">
                        <label for="inputMongoDBServer">MongoDB Server</label>
                        <input type="text" className="form-control" id="inputMongoDBServer" aria-describedby="mongoDBServerHelp" placeholder="127.0.0.1:8003" />
                    </div>

                    <div className="form-group">
                        <label for="inputSonarqubeServer">MongoDB Server</label>
                        <input type="text" className="form-control" id="inputSonarqubeServer" aria-describedby="sonarqubeServerHelp" placeholder="127.0.0.1:8004" />
                    </div>
                    <div className="row xs-5">
                        <button type="submit" className="btn btn-success">Test Connections</button>
                        <button type="submit" className="btn btn-submit">Save</button>
                    </div>
                </fieldset>
            </form>
        );
    }

    render() {
        return (
            <div className="container">
                <h3>Server Setup</h3>
                <button onClick={this.handleClick}>
                    Switch
                </button>
                {this.state.isToggleOn ? this.renderCamundaSetup() : this.renderApiServers()}
            </div>
        );
    }
}