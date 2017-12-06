import React, { Component } from 'react';
import { Alert } from '../Layout/Alert';

export class Instances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runningInstances: [],
      runningInstancesCount: 0,
      gitlabProjects: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8002/api/v4/projects?private_token=wAdcZ3ZnnRcc5dk7Wwyn')
    .then(result=>result.json())
    .then(gitlabProjects=>this.setState({gitlabProjects}));

    fetch('http://localhost:8080/rest/process-instance/')
    .then(result=>result.json())
    .then(runningInstances=>this.setState({runningInstances}));

    fetch('http://localhost:8080/rest/process-instance/count')
    .then(result=>result.json())
    .then(responseJson => this.setState({runningInstancesCount: responseJson.count}));
  }



  createInstance(event) {
    event.preventDefault();
    const instance = {
      variables: {
        additionalArtifacts: {value: this.additionalArtifacts.checked, type: "Boolean"},
        additionalArtifactsDesc: {value: this.additionalArtifactsDesc.value, type: "String"},
        branch_name: {value: this.branch_name.value, type: "String"},
        branchType: {value: this.branchType.value, type: "String"},
        buildPipeline: {value: this.buildPipeline.checked, type: "Boolean"},
        database: {value: this.database.checked, type: "Boolean"},
        gitlabProject: {value: this.gitlabProject.value, type: "String"},
        schemaType: {value: this.schemaType.value, type: "String"},
        sonarqubeProfile: {value: this.sonarqubeProfile.value, type: "String"},
        testEnv: {value: this.testEnv.checked, type: "Boolean"},
      }
    }

    var jsonPost = JSON.stringify(instance);
    var resultId = "";
    var prevInstanceCount = this.state.runningInstancesCount;

    fetch('http://localhost:8080/rest/process-definition/key/TestBuildPipeline/submit-form', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: jsonPost
    })
    .then(res => res.json())
    .then(res => resultId = res.id)
    .then(res => this.refs.alert.generateAlert("New Instance Created", "Instance ID " + resultId + " created", "success"))
    .then(this.instanceForm.reset())
    .then(this.setState({runningInstancesCount: prevInstanceCount + 1}));

    fetch('http://localhost:8080/rest/process-instance/')
    .then(result=>result.json())
    .then(runningInstances=>this.setState({runningInstances}));
  }

  render() {
    return (
      <div>
        {this.state.runningInstances.length > 0 &&
          <div className="container">
            <h3>Running Instances ({this.state.runningInstancesCount})</h3>
            <ul>
              {this.state.runningInstances.map(runningInstances=> {
                if(!runningInstances.ended) {
                  return <li key={runningInstances.id}>
                    <a href={`http://localhost:8080/app/cockpit/default/#/process-instance/${runningInstances.id}`} target="_blank">{runningInstances.id}</a>
                  </li>
                }
              })}
            </ul>
          </div>
        }
        


        <div className="container">
          <h3>Request new Instance</h3>
          <Alert ref="alert" message="ok3" />
          <form ref={(input) => this.instanceForm = input} autoComplete="off" className="form-horizontal" onSubmit={(e) => this.createInstance(e)}>
            
            <div className="form-group">
              <label className="control-label">Branch Name</label>
              <div className="controls">
                <input ref={(input) => this.branch_name = input} required type="text" className="form-control"
                  name="branch_name" placeholder="ABCD" />
              </div>
            </div>

            <div className="form-group">
              <label>Select a Project</label>
              <select ref={(input) => this.gitlabProject = input} className="form-control" id="gitlabProject">
                {this.state.gitlabProjects.map(gitlabProjects=><option key={gitlabProjects.id} value={gitlabProjects.id}>{gitlabProjects.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input ref={(input) => this.database = input} type="checkbox" className="form-check-input" name="database"/>
                  MySQL Database
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input ref={(input) => this.buildPipeline = input} type="checkbox" className="form-check-input" name="buildPipeline"/>
                  Build Pipeline
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Select a Branch Type</label>
              <select ref={(input) => this.branchType = input} className="form-control" id="branchType">
                <option value="RELEASE">Release</option>
                <option value="HOTFIX">Hotfix</option>
                <option value="FEATURE">Feature</option>
              </select>
            </div>

            <div className="form-group">
              <label>Select a Schema Type</label>
              <select ref={(input) => this.schemaType = input} className="form-control" id="schemaType">
                <option value="RUNTIME">Runtime</option>
                <option value="UNITTEST">Unit Test</option>
                <option value="ALL">All</option>
              </select>
            </div>

            <div className="form-group">
              <label>Select a SonarQube (QA) Profile</label>
              <select ref={(input) => this.sonarqubeProfile = input} className="form-control" id="sonarqubeProfile">
                <option value="no">No QA</option>
                <option value="profile1">Profile 1</option>
                <option value="profile2">Profile 2</option>
                <option value="profile3">Profile 3</option>
              </select>
            </div>

            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input ref={(input) => this.testEnv = input} type="checkbox" className="form-check-input" name="testEnv"/>
                  Create Test Environment
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input ref={(input) => this.additionalArtifacts = input} type="checkbox" className="form-check-input" name="additionalArtifacts"/>
                  Create additional Artifacts
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="control-label">Describe what you need</label>
              <div className="controls">
                <textarea ref={(input) => this.additionalArtifactsDesc = input} className="form-control"
                  rows="4"></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Create Instance</button>
          </form>
        </div>
      </div>
    );
  }
}
