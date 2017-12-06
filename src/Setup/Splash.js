import React, { Component } from 'react';
//import StackNavigator from './StackNavigator';


export class Splash extends Component {
  render() {
    return (
      <div className="container">
        <div className="Splash">
          <header className="Splash-header">
            <h1 className="Splash-title">Setup</h1>
          </header>
          <p className="Splash-intro">
            To get started, click the button.
          </p>
          <button className="btn btn-primary">Click me</button>
        </div>
      </div>
    );
  }
}
