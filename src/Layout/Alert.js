import React, { Component } from 'react';
import { AlertList } from 'react-bs-notifier';

export class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            timeout: 3000
        };
    }
    
    onAlertDismissed(alert) {
        const alerts = this.state.alerts;
    
        // find the index of the alert that was dismissed
        const idx = alerts.indexOf(alert);
    
        if (idx >= 0) {
            this.setState({
                // remove the alert from the array
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
            });
        }
    }

    generateAlert(header, message, type) {
        const newAlert ={
            id: (new Date()).getTime(),
            type: type,
            headline: header,
            message: message
        };
        
        this.setState({
            alerts: [...this.state.alerts, newAlert]
        });
    }

    render(props) {
        return(
            <div>
                <AlertList alerts={this.state.alerts} timeout={this.state.timeout} onDismiss={this.onAlertDismissed.bind(this)} />
            </div>
        );
    }
}