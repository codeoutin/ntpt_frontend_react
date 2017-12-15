import React, { Component } from 'react';
//import StackNavigator from './StackNavigator';


export class Splash extends Component {
  render() {
    return (
      <div className="container">
          <h1 className="Splash-title">Welcome to NTPT</h1>
          <h3>Frontend-Prototype</h3>
          <p>
            This Client will help you to establish a connection to different APIs (like GitLab, Jenkins, ...) 
            that are often used in Software Development Projects and to a Camunda Engine with an embedded BPMN Example. 
            <br /><br />
            Almost any Webservice with an embedded REST or Java API can be included in this scenario.
            <br /><br />
          </p>
          <hr />
          <p>
            Developed by <a href="https://github.com/stegerpa/" target="_blank" rel="noopener noreferrer">Patrick Steger</a> for <a href="http://novatec-gmbh.de" target="_blank" rel="noopener noreferrer">NovaTec GmbH</a>
          </p>
      </div>
    );
  }
}
