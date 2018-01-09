import React, { Component } from 'react';
import { AlertList } from 'react-bs-notifier';

/**
 * This class is used to display Bootstrap-Alerts in the page
 * We use React Bootstrap Notifier to generate Alerts (https://github.com/chadly/react-bs-notifier)
 * 
 * Instructions:
 * Import this class, put <Alert ref="alert" /> somewhere in your render method and throw Alerts in functions:
 * this.refs.alert.generateAlert("{headline}", "{message}", "{type}");
 * 
 * @author Patrick Steger
 * @see {@link https://github.com/stegerpa/ntpt_frontend_react|GitHub}
 */
export class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            timeout: 3000
        };
    }
    
    /**
     * Removes an Alert
     * @param {*} alert - Alert that gets removed from the Array
     */
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

    /**
     * 
     * @param {String} header - Headline of the Alert
     * @param {String} message - Message displayed in Alert
     * @param {String} type - Type of Alert (info, success, warning, danger)
     */
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

    /**
     * Render Method
     * @param {*} props 
     */
    render(props) {
        return(
            <div>
                <AlertList alerts={this.state.alerts} timeout={this.state.timeout} onDismiss={this.onAlertDismissed.bind(this)} />
            </div>
        );
    }
}