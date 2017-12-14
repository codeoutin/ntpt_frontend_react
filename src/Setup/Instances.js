import React, { Component } from 'react';
import { Alert } from '../Layout/Alert';

export class Instances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runningInstances: [],
      gitProjects: [],
      gitCommits: [],
      camundaEngine: [],
      BP: false,
      DB: false,
      AddArtifacts: false
    };
    this.handleBP = this.handleBP.bind(this);
    this.handleDB = this.handleDB.bind(this);
    this.handleAddArtifacts = this.handleAddArtifacts.bind(this);
    this.changeProject = this.changeProject.bind(this);
  }

  componentDidMount() {
    fetch('http://' + this.props.servers.gitlabServer + '/api/v4/projects?private_token=' + this.props.servers.gitlabToken)
    .then(result=>result.json())
    .then(gitProjects=>this.setState({gitProjects}));

    fetch('http://' + this.props.servers.camundaServer + '/rest/process-instance/')
    .then(result=>result.json())
    .then(runningInstances=>this.setState({runningInstances}));

    fetch('http://' + this.props.servers.camundaServer + '/rest/engine/')
    .then(result=>result.json())
    .then(camundaEngine=>this.setState({camundaEngine}));
  }

  handleBP(e) {this.setState({BP: !this.state.BP})}
  handleDB(e) {this.setState({DB: !this.state.DB})}
  handleAddArtifacts(e) {this.setState({AddArtifacts: !this.state.AddArtifacts})}

  changeProject(e) {
    const projectId = e.target.value;
    fetch('http://' + this.props.servers.gitlabServer + '/api/v4/projects/'+ projectId +'/repository/commits', 
    {headers: {'PRIVATE-TOKEN': this.props.servers.gitlabToken}})
    .then(result=>result.json())
    .then(gitCommits=>this.setState({gitCommits}));
  }

  createInstance(e) {
    e.preventDefault();
    var instance = {
      variables: {
        //prefix: {value:  + "_" + this.git_branch_name.value , type: "String"},

        additional_artifacts: {value: this.state.AddArtifacts, type: "Boolean"}, //input
        additional_artifacts_text: (this.state.AddArtifacts ? {value: this.additional_artifacts_text.value, type: "String"} : undefined), //input

        bp_branch_type: (this.state.BP ? {value: this.bp_branch_type.value, type: "String"} : {value: "no", type: "String"}), //input
        bp_schema_type: (this.state.BP ? {value: this.bp_schema_type.value, type: "String"} : {value: "no", type: "String"}), //input
        bp_url: {value: this.props.servers.jenkinsServer, type: "String"},
        
        db_url: (this.state.DB ? {value: this.props.servers.mongodbServer, type: "String"} : undefined),

        git_branch_name: {value: this.git_branch_name.value, type: "String"}, //input
        git_token: {value: this.props.servers.gitlabToken, type: "String"},
        git_project: {value: this.git_project.value, type: "String"}, //input
        git_commit: {value: this.git_commit.value, type: "String"}, //input
        git_url: {value: this.props.servers.gitlabServer, type: "String"},

        sonarqube_profile: {value: this.sonarqube_profile.value, type: "String"}, //input
        sonarqube_url: {value: this.props.servers.sonarqubeServer, type: "String"},

        test_environment: {value: this.test_environment.checked, type: "Boolean"}, //input
      }
    }

    var jsonPost = JSON.stringify(instance);
    console.log(jsonPost);
    var resultId = "";

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
    .then(this.instanceForm.reset());
  }

  render() {
    return (
      <div>
        {this.state.camundaEngine.length === 0 && 
          <div className="alert alert-dismissible alert-warning">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <h4 className="alert-heading">Camunda Engine offline!</h4>
            <p className="mb-0">Camunda is currently not running. Make sure to start the server, before you request a new Instance.</p>
          </div>
        }

        {this.state.runningInstances.length > 0 &&
          <div className="container">
            <h3>Running Instances ({this.state.runningInstances.length})</h3>
            <ul>
              {this.state.runningInstances.map(runningInstances=>{
                if(!runningInstances.ended) {
                  return 
                  <li key={runningInstances.id}>
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
            
            {/* Git */}
            <div className="form-group">
              <label className="control-label">Branch Name</label>
              <div className="controls">
                <input ref={(input) => this.git_branch_name = input} required type="text" className="form-control"
                  name="git_branch_name" placeholder="ABCD" />
              </div>
            </div>

            
            {this.state.gitProjects.length > 0 &&
              <div className="form-group">
                <label>Select a Project</label>
                <select ref={(input) => this.git_project = input} className="form-control" id="git_project" onChange={this.changeProject}>
                  {this.state.gitProjects.map(gitProjects => <option key={gitProjects.name} value={gitProjects.id}>{gitProjects.name}</option>)}
                </select>
              </div>
            }

            <div className="form-group">
              <label>Select a Commit</label>
              <select ref={(input) => this.git_commit = input} className="form-control" id="git_commit">
                {this.state.gitCommits.map(gitCommits=><option key={gitCommits.short_id} value={gitCommits.short_id}>[{gitCommits.short_id}] {gitCommits.title}</option>)}
                <option value="HEAD">HEAD</option>
              </select>
            </div> 

            {/* Database */}
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" onChange={this.handleDB} checked={this.state.DB} />
                  Create Database
                </label>
              </div>
            </div>

            {/* Build Pipeline */}
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" onChange={this.handleBP} checked={this.state.BP} />
                  Build Pipeline
                </label>
              </div>
            </div>

            { this.state.BP &&
              <div>
                <div className="form-group">
                  <label>Select a Branch Type</label>
                  <select ref={(input) => this.bp_branch_type = input} className="form-control" id="bp_branch_type">
                    <option value="RELEASE">Release</option>
                    <option value="HOTFIX">Hotfix</option>
                    <option value="FEATURE">Feature</option>
                  </select>
                </div>

                <div className="form-group">
                <label>Select a Schema Type</label>
                <select ref={(input) => this.bp_schema_type = input} className="form-control" id="bp_schema_type">
                  <option value="RUNTIME">Runtime</option>
                  <option value="UNITTEST">Unit Test</option>
                  <option value="ALL">All</option>
                </select>
                </div>
              </div>
            }

            {/* SonarQube */}
            <div className="form-group">
              <label>Select a SonarQube (QA) Profile</label>
              <select ref={(input) => this.sonarqube_profile = input} className="form-control" id="sonarqube_profile">
                <option value="no">No QA</option>
                <option value="profile1">Profile 1</option>
                <option value="profile2">Profile 2</option>
                <option value="profile3">Profile 3</option>
              </select>
            </div>

            {/* Test Environment */}
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" ref={(input) => this.test_environment = input} name="test_environment"/>
                  Create Test Environment
                </label>
              </div>
            </div>
            
            {/* Additional Artifacts */}
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" ref={(input) => this.additional_artifacts = input} name="additional_artifacts"
                   onChange={this.handleAddArtifacts} checked={this.state.AddArtifacts} />
                  Create additional Artifacts
                </label>
              </div>
            </div>

            { this.state.AddArtifacts &&
              <div className="form-group">
                <label className="control-label">Describe what you need</label>
                <div className="controls">
                  <textarea ref={(input) => this.additional_artifacts_text = input} className="form-control"
                    rows="4" name="additional_artifacts_text"></textarea>
                </div>
              </div>
            }

            {/* Submit */}
            <button type="submit" className="btn btn-primary">Create Instance</button>
          </form>
        </div>
      </div>
    );
  }
}
