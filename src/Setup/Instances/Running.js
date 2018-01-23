import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import moment from 'moment';
import fetch from 'isomorphic-fetch';

/**
 * Component to Display Running Camunda Process Instances.
 * @author Patrick Steger
 * @see {@link https://github.com/stegerpa/ntpt_frontend_react|GitHub}
 */
export class Running extends Component {
  constructor(props) {
    super(props);
    this.state = {
      failedConnections: 0,
      updateTimer: 3500,
      processDefinitions: [],
      runningTasks: [],
      branchNames: [],
      camundaUrl: 'http://' + this.props.camundaServer,
    }
    this.getProcessDefinitions = this.getProcessDefinitions.bind(this);
    this.resetFailedConnections = this.resetFailedConnections.bind(this);
  }

  /**
   * After the Component did Mount for the first time, we set a Timer to Update this Component.
   * If it fails to Update more than 10 times, the Timer gets set to 60 seconds
   */
  componentDidMount() {
    this.getProcessDefinitions();
    this.getRunningTasks();    
    this.getBranchNames();

    // Update the Arrays every 3.5 Seconds
    TimerMixin.setInterval(
      () => { 
        if(this.state.failedConnections < 10) {
          this.getProcessDefinitions();
          this.getRunningTasks();
          this.getBranchNames();
        }
      },
      this.state.updateTimer // 3.5 Seconds
    );
  }

  /**
   * Fetch Camunda Process Definitions
   */
  getProcessDefinitions() {
    fetch(this.state.camundaUrl + '/rest/process-definition/')
    .then(result => result.json())
    .then(processDefinitions => this.setState({processDefinitions}))
    .catch(error => {
      console.log(error);
      this.setState({failedConnections: this.state.failedConnections + 1});
    });
  }

  /**
   * Fetch Camunda Running Tasks
   */
  getRunningTasks() {
    fetch(this.state.camundaUrl + '/rest/task/')
    .then(result => result.json())
    .then(runningTasks => this.setState({runningTasks}))
    .catch(error => {
      console.log(error);
    });
  }

  /**
   * Get Variable "git_branch_name" from Camunda Instances
   */
  getBranchNames() {
    fetch(this.state.camundaUrl + '/rest/variable-instance/?variableName=git_branch_name')
    .then(result => result.json())
    .then(branchNames => this.setState({branchNames}))
    .catch(error => {
      console.log(error);
    });
  }

  /**
   * Count Tasks per Process Definition
   * @param {String} processDefinition - Process Definition to count
   */
  countTasks(processDefinition) {
    var count = 0;
    this.state.runningTasks.map(task=> {
      if(processDefinition === task.processDefinitionId) {
        count++;
      }
    })
    return count;
  }

  /**
   * @param {Integer} id - Process Instance Id
   * @returns Branch Name
   */
  getBranchNameById(id) {
    var name = "";
    this.state.branchNames.map(instance=> {
      if(id === instance.processInstanceId) {
        name = instance.value;
      }
    })
    return name;
  }

  /**
   * Reset Failed Connections
   */
  resetFailedConnections() {
    this.setState({failedConnections: 0});
    console.log("Failed connections set back to 0");
  }

  render() {
    return (
      <div>
        {this.state.failedConnections === 10 &&
          <div>
            <p>Auto Update disabled (Too many failed Connections)&nbsp;
              <button 
                  type="button"
                  onClick={this.resetFailedConnections} 
                  className="btn btn-sm btn-info">Enable Auto-Update
              </button>
            </p>
          </div>
        }


        {this.state.runningTasks.length > 0 &&
          <div>
            <legend>User Tasks ({this.state.runningTasks.length})</legend>
            <div id="instances" role="tablist">
              {this.state.processDefinitions.map(definition=>
                <div key={definition.key}>
                  {this.countTasks(definition.id) > 0 &&

                    <div className="card">
                      <div className="card-header" role="tab" id={`heading${definition.key}`}>
                        <h5 className="mb-0">
                          <a data-toggle="collapse" href={`#${definition.key}`} aria-expanded="true" aria-controls={definition.key}>
                            {definition.key}
                            <span className="badge badge-primary badge-pill float-right">{this.countTasks(definition.id)}</span>
                          </a>
                        </h5>
                      </div>

                      <div id={definition.key} className="collapse" role="tabpanel" aria-labelledby={`heading${definition.key}`} data-parent="#instances">
                        <div className="card-body">
                          
                            {this.state.runningTasks.map(task=> {
                              if(definition.id === task.processDefinitionId) {
                                return (
                                <ol key={task.id} className="breadcrumb">
                                  <li className="breadcrumb-item">
                                    <a href={`${this.state.camundaUrl}/app/cockpit/default/#/process-instance/${task.processInstanceId}`} target="_blank">
                                      {task.processInstanceId}
                                    </a>
                                  </li>
                                  <li className="breadcrumb-item">{this.getBranchNameById(task.processInstanceId)}</li>
                                  <li className="breadcrumb-item"><a href={`${this.state.camundaUrl}/app/tasklist/default/#/?task=${task.id}`} target="_blank">{task.name}</a></li>
                                  <li className="breadcrumb-item">Created {moment(task.created).fromNow()}</li>
                                </ol>)
                              }
                            })}
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        } <br />
      </div>
    )
  }
}