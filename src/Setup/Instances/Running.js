import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import moment from 'moment';
import fetch from 'isomorphic-fetch';

export class Running extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processDefinitions: [],
      runningTasks: [],
      branchNames: [],
      camundaUrl: 'http://' + this.props.camundaServer
    }
  }

  componentDidMount() {
    this.getProcessDefinitions();
    this.getRunningTasks();    
    this.getBranchNames();

    TimerMixin.setInterval(
      () => { 
        this.getProcessDefinitions();
        this.getRunningTasks();
        this.getBranchNames();
        //console.log("tick");
      },
      3500 // 3.5 Seconds
    );
  }

  getProcessDefinitions() {
    fetch(this.state.camundaUrl + '/rest/process-definition/')
    .then(result => result.json())
    .then(processDefinitions => this.setState({processDefinitions}))
    .catch(error => {
      console.log(error);
    });
  }

  getRunningTasks() {
    fetch(this.state.camundaUrl + '/rest/task/')
    .then(result => result.json())
    .then(runningTasks => this.setState({runningTasks}))
    .catch(error => {
      console.log(error);
    });
  }

  getBranchNames() {
    fetch(this.state.camundaUrl + '/rest/variable-instance/?variableName=git_branch_name')
    .then(result => result.json())
    .then(branchNames => this.setState({branchNames}))
    .catch(error => {
      console.log(error);
    });
  }

  countTasks(processDefinition) {
    var count = 0;
    this.state.runningTasks.map(task=> {
      if(processDefinition === task.processDefinitionId) {
        count++;
      }
    })
    return count;
  }

  getBranchNameById(id) {
    var name = "";
    this.state.branchNames.map(instance=> {
      if(id === instance.processInstanceId) {
        name = instance.value;
      }
    })
    return name;
    
  }

  render() {
    return (
      <div>
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
        }
      </div>
    )
  }
}