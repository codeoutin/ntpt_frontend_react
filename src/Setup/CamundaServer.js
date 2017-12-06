import React, { Component } from 'react';

export class CamundaServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            camundaServer: "localhost:8080",
            authentication_required: false,
            connectionStatus: []
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
        this.checkConnection = this.checkConnection.bind(this);
    }

    handleChange(event) {
        this.setState({
            camundaServer: event.target.value
        });
    }

    handleAuth(event) {
        this.setState({
            authentication_required: !this.state.authentication_required
        });
    }

    checkConnection(event) {
        event.preventDefault();
        var url = this.state.camundaServer;
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }        
        url = url + '/status';

        //alert(url);
        fetch(url)
        .then(result=>result.json())
        .then(connectionStatus=>this.setState({connectionStatus}))
        .catch(error => this.setState({connectionStatus: "down"}) );

        if(this.state.connectionStatus.status === "up") {
            console.log(this.state.connectionStatus.status);
        }
    }

    authenticateUser(username, password) {
        var token = password + ":" + password;
        var hash = btoa(token);
        return "Basic " + hash;
    }


    renderCamundaSetup(props) {
        return (
            <form onSubmit={this.checkConnection}>
                <fieldset>
                    <legend>Camunda Server</legend>
                    <div className="form-group">
                        <p>First you have to connect to the Camunda Server</p>
                        <label>Server-Adress</label>
                        <input type="text" name="camundaServer" className="form-control" id="inputCamundaServer" aria-describedby="camundaServerHelp" onChange={this.handleChange} value={this.state.camundaServer} />
                        <small id="camundaServerHelp" className="form-text text-muted">Make sure the server is running.</small>
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" onChange={this.handleAuth} checked={this.state.authentication_required} className="form-check-input" name="authentication_required"/>
                            Authentification required
                        </label>
                        </div>
                    </div>
                    
                    { this.state.authentication_required && 
                    <div>
                        <div className="form-group">
                            <label>Login</label>
                            <input type="text" name="username" className="form-control" id="inputCamundaLogin" defaultValue={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" name="password" className="form-control" id="inputCamundaPw" defaultValue={this.state.password} onChange={this.handleChange} />
                        </div>
                    </div> }

                    <button type="submit" className="btn btn-warning">Connect</button>

                </fieldset>
            </form>
        )
    }

    
    render() {
        return (
            <div className="container">
                <h1>Camunda Server Setup</h1>
                <h2>y</h2>
                {this.renderCamundaSetup()}
            </div>
        );
    }
}