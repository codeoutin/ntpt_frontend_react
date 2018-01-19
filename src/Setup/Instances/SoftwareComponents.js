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
    fetch(this.state.camundaUrl + '/rest/execution/')
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
            {this.state.exectuions.map(execution=>
              <div key={execution.key}>
                <h5>Applications Stack</h5>
                {this.state.taskVariables.map(task=>{
                  if(execution.id === task.activityInstanceId) {
                    console.log(task.value);
                    if(task.name === "git_branch_name") {
                      return (
                        <p>Git Branch: <a href="#" onClick={() => getGitBranchUrl(task.git_url, task.git_project, task.git_branch, task.git_token)}>{task.value}</a></p>
                      )
                    }
                    if(task.name === "git_branch_name") {
                      return (
                        <p>{task.value}</p>
                      )
                    }
                  }
                })}
              </div>
            )}
          </div>
        }
      </div>
    )
  }
}