import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import moment from 'moment';
import fetch from 'isomorphic-fetch';

/**
 * Component to Display running Software Components (Like GitHub, ...).
 * @author Patrick Steger
 * @see {@link https://github.com/stegerpa/ntpt_frontend_react|GitHub}
 */
export class SoftwareComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failedConnections: 0,
      updateTimer: 3500,
      exectuions: [],
      taskVariables: [],
      camundaUrl: 'http://' + this.props.camundaServer
    }
    this.getTaskVariables = this.getTaskVariables.bind(this);
    this.getTaskVariables = this.getTaskVariables.bind(this);
    //this.getGitBranchUrl = this.getGitBranchUrl.bind(this);
  }

  /**
   * After the Component did Mount for the first time, we set a Timer to Update this Component.
   * If it fails to Update more than 10 times, the Timer gets set to 60 seconds
   */
  componentDidMount() {
    this.getExecutions();
    this.getTaskVariables();

    if(this.state.failedConnections > 10) {
      this.setState({updateTimer: 60000});
    }

    // Update the Arrays every 3.5 Seconds
    TimerMixin.setInterval(
      () => { 
        this.getExecutions();
        this.getTaskVariables();
        //console.log("tick");
      },
      this.state.updateTimer // 3.5 Seconds
    );
  }

  /**
   * Get Exectuions
   */
  getExecutions() {
    fetch(this.state.camundaUrl + '/rest/history/process-instance?unfinished=true')
    .then(result => result.json())
    .then(exectuions => this.setState({exectuions}))
    .catch(error => {
      console.log(error);
    });
  }

  /**
   * Get Variables for Task
   */
  getTaskVariables() {
    fetch(this.state.camundaUrl + '/rest/variable-instance/')
    .then(result => result.json())
    .then(taskVariables => this.setState({taskVariables}))
    .catch(error => {
      console.log(error);
    });
  }

  

  render() {
    const getGitBranchUrl = (gitUrl, gitProject, gitBranch, gitToken) => {
      var url_path = gitUrl;
      // fetch('http://' + gitUrl + '/api/v4/projects/'+ gitProject, 
      // {headers: {'PRIVATE-TOKEN': gitToken}})
      // .then(result=>result.json())
      // .then(gitProject=>url_path = gitProject.name);
      
      console.log(gitUrl);
      console.log(gitProject);
      console.log(gitBranch);
      console.log(gitToken);
      return url_path;
    }

    return (
      <div>
        {this.state.taskVariables.length > 0 &&
          <div>
            <legend>Software Components</legend>
            {this.state.exectuions.map((execution, index) =>
              <div key={execution.key}>

                <div className="card">
                  <div className="card-header bg-light" id={`heading${execution.id}`}>
                    <a data-toggle="collapse" className="text-dark" href={`#${execution.id}`} aria-expanded="true" aria-controls={execution.keyid}>
                      Instance {execution.id}
                      <span className="float-right">
                        Created {moment(execution.startTime).fromNow()}
                      </span>
                    </a>                    
                  </div>
                  <div id={execution.id} className="collapse" role="tabpanel" aria-labelledby={`heading${execution.id}`} data-parent="#executions">
                    <ul className="list-group list-group-flush">
                      {this.state.taskVariables.map(task=>{
                        if(execution.id === task.activityInstanceId) {
                          console.log(task.value);
                          if(task.name === "return_git") {
                            return (
                              <li className="list-group-item"><span className="font-weight-bold">Git Branch:</span> <a href={JSON.parse(task.value).branch_url}>{JSON.parse(task.value).branch_name}</a></li>
                            )
                          }
                          if(task.name === "return_database") {
                            return (
                              <li className="list-group-item"><span className="font-weight-bold">Database:</span> <a href={JSON.parse(task.value).database_url}>{JSON.parse(task.value).database_name}</a></li>
                            )
                          }
                          if(task.name === "return_docker") {
                            return (
                              <li className="list-group-item"><span className="font-weight-bold">Test Environment:</span> <a href={JSON.parse(task.value).container_url}>
                                {JSON.parse(task.value).container_url}
                                </a> (Image: <a href={JSON.parse(task.value).image_url}>{JSON.parse(task.value).image}</a>)</li>
                            )
                          }
                          if(task.name === "return_bp") {
                            return (
                              <li className="list-group-item"><span className="font-weight-bold">Build Pipeline:</span> <ul>
                                {JSON.parse(task.value).map((obj, index) => 
                                    <li key={index}>{obj.id}: {obj.value}</li>
                                )}
                              </ul></li>
                            )
                          }
                          if(task.name === "return_sonarqube") {
                            return (
                              <li className="list-group-item"><span className="font-weight-bold">SonarQube:</span> <a href={JSON.parse(task.value).path}>{JSON.parse(task.value).project_name}</a></li>
                            )
                          }
                        }
                      })}
                    </ul>
                  </div>
                </div>

                
              </div>
            )}
          </div>
        } <br />
      </div>
    )
  }
}