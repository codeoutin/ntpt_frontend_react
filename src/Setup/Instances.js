import React, { Component } from 'react';

export class Instances extends Component {
  constructor(props) {
    super(props);
    this.state = {gitlabProjects: []};
  }

  componentDidMount() {
    fetch('http://localhost:8002/api/v4/projects?private_token=wAdcZ3ZnnRcc5dk7Wwyn')
    .then(result=>result.json())
    .then(gitlabProjects=>this.setState({gitlabProjects}))
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
    console.log(jsonPost);

    fetch('http://localhost:8080/rest/process-definition/key/TestBuildPipeline/submit-form', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: jsonPost
    })
    .then(res => res.json())
    .then(res => console.log(res));
  }

  render() {
    return (
      <div className="container">
        <h3>Request new Instance</h3>
        <form className="form-horizontal" onSubmit={(e) => this.createInstance(e)}>
          
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
    );
  }
}
