import React, { Component } from 'react';
import { Alert } from '../Layout/Alert';

export class CamundaServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            camundaServer: this.props.camundaServer,
            authentication_required: false,
            test_success: false
        };

        // This binding is necessary to make `this` work in the callback
        this.handleAuth = this.handleAuth.bind(this);
        this.changeCamundaServer = this.changeCamundaServer.bind(this);
        this.checkConnection = this.checkConnection.bind(this);
    }

    handleAuth(event) {
        this.setState({
            authentication_required: !this.state.authentication_required
        });
    }

    changeCamundaServer(e) {
        this.setState({camundaServer: e.target.value});
        this.props.changeCamundaServer(e);
    }

    checkConnection(event) {
        event.preventDefault();
        var url = this.state.camundaServer;
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        url = url + '/status';

        fetch(url)
        .then(result => {
            result.json()
            this.setState({test_success: true});
            this.refs.alert.generateAlert("Connection successfull", "Camunda Server is running. Save the connection to proceed", "success")
        })
        .catch(error => {
            this.setState({test_success: false});
            this.refs.alert.generateAlert("Connection failed", "Sometimes you have to try serval times. If its still not working try another server.", "warning");
        });
    }

    authenticateUser(username, password) {
        var token = password + ":" + password;
        var hash = btoa(token);
        return "Basic " + hash;
    }


    renderCamundaSetup(props) {
        return (
            <form onSubmit={this.props.saveConnection} autocomplete="off">
                <fieldset>
                    <legend>Camunda Server</legend>
                    <div className="form-group">
                        <p>First you have to connect to the Camunda Server</p>
                        <label>Server-Adress</label>
                        <input type="text" name="camundaServer" className="form-control" id="inputCamundaServer" aria-describedby="camundaServerHelp" onChange={this.changeCamundaServer} value={this.state.camundaServer} />
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

                    <button type="button" onClick={this.checkConnection} className="btn btn-warning">Test connection</button>
                    <p></p>
                    { this.state.test_success &&
                        <button type="submit" className="btn btn-success">Save</button>
                    }
                </fieldset>
            </form>
        )
    }

    
    render() {
        return (
            <div className="container">
                <h1>Camunda Server Setup</h1>
                <Alert ref="alert" />
                {this.renderCamundaSetup()}
            </div>
        );
    }
}