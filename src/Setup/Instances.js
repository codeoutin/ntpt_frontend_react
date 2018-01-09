import React, { Component } from 'react';
import { Alert } from '../Layout/Alert';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {Running} from './Instances/Running';

/**
 * Renders the page to create a new Camunda Process Instance
 * Theres React-Select (https://github.com/JedWatson/react-select) included, a great Package for Select Elements. It adds functions
 * for Searching, Asychnronous Loading, and more.
 * @author Patrick Steger
 * @see {@link https://github.com/stegerpa/ntpt_frontend_react|GitHub}
 */
export class Instances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gitProjects: [],
      gitCommits: [],
      sqQualityGates: [{qualitygates: []}],
      git_branch_name: '',
      selectedProject: '',
      selectedCommit: '',
      selectedQualityGate: '',
      camundaEngine: [],
      BP: false,
      DB: false,
      AddArtifacts: false
    };

    this.handleBP = this.handleBP.bind(this);
    this.handleDB = this.handleDB.bind(this);
    this.handleAddArtifacts = this.handleAddArtifacts.bind(this);
    this.handleBranchNameChange = this.handleBranchNameChange.bind(this);
    //this.changeProject = this.changeProject.bind(this);
  }

  /**
   * Bug: Error when you switch page before Alerts could be displayed
   */
  componentDidMount() {
    const gitUrl = 'http://' + this.props.servers.gitlabServer;
    const sqUrl = 'http://' + this.props.servers.sonarqubeServer;
    const camundaUrl = 'http://' + this.props.servers.camundaServer;

    fetch(gitUrl + '/api/v4/projects?private_token=' + this.props.servers.gitlabToken)
    .then(result => result.json())
    .then(gitProjects => this.setState({gitProjects}))
    .catch(error => {
      this.refs.alert.generateAlert("Connection failed", "Failed to connect to GitLab Server. Check Server Page.", "info");
    });

    fetch(camundaUrl + '/rest/engine/')
    .then(result => result.json())
    .then(camundaEngine => this.setState({camundaEngine}))
    .catch(error => {
      console.log(error);
    });

    fetch(sqUrl + '/api/qualitygates/list')
    .then(result => result.json())
    .then(sqQualityGates => this.setState({sqQualityGates}))
    .catch(error => {
      this.refs.alert.generateAlert("Connection failed", "Failed to connect to SonarQube. Check Server Page.", "info");
    });
  }

  handleBP(e) {this.setState({BP: !this.state.BP})}
  handleDB(e) {this.setState({DB: !this.state.DB})}
  handleAddArtifacts(e) {this.setState({AddArtifacts: !this.state.AddArtifacts})}

  /**
   * Creates a new Process Instance with entered Form Data
   * @param {*} e 
   */
  createInstance(e) {
    e.preventDefault();
    console.log(this.state.selectedProject.value);
    //used for prefix
    var project_name;
    for(var i = 0; i < this.state.gitProjects.length; i++) {
      if(this.state.gitProjects[i].id == this.state.selectedProject.value) {
        project_name = this.state.gitProjects[i].name;
      }
    }
    console.log(project_name);

    //create camunda-variables
    var instance = {
      variables: {
        prefix: {value: project_name + "_" + this.state.git_branch_name , type: "String"},

        additional_artifacts: {value: this.state.AddArtifacts, type: "Boolean"}, //input
        additional_artifacts_text: (this.state.AddArtifacts ? {value: this.additional_artifacts_text.value, type: "String"} : undefined), //input

        bp_branch_type: (this.state.BP ? {value: this.bp_branch_type.value, type: "String"} : {value: "no", type: "String"}), //input
        bp_schema_type: (this.state.BP ? {value: this.bp_schema_type.value, type: "String"} : {value: "no", type: "String"}), //input
        bp_url: {value: this.props.servers.jenkinsServer, type: "String"},
        
        db_url: (this.state.DB ? {value: this.props.servers.mongodbServer, type: "String"} : undefined),

        git_branch_name: {value: this.state.git_branch_name, type: "String"}, //input
        git_token: {value: this.props.servers.gitlabToken, type: "String"},
        git_project: {value: this.state.selectedProject.value, type: "String"}, //input
        git_commit: {value: this.state.selectedCommit.value, type: "String"}, //input
        git_url: {value: this.props.servers.gitlabServer, type: "String"},

        sonarqube_profile: {value: this.state.selectedQualityGate.value, type: "String"}, //input
        sonarqube_url: {value: this.props.servers.sonarqubeServer, type: "String"},

        test_environment: {value: this.test_environment.checked, type: "Boolean"}, //input
      }
    }

    //generate json object out of instance object
    var jsonPost = JSON.stringify(instance);
    console.log(jsonPost);
    var resultId = "";

    //connect to camunda engine
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
    .then(res => console.log("resultID: " + resultId))
    .then(this.setState({
      git_branch_name: '',
      selectedProject: '',
      selectedCommit: '',
      selectedQualityGate: '',
    }))
    .then(this.instanceForm.reset());
  }

  handleBranchNameChange = (e) => {
    this.setState({git_branch_name: e.target.value.replace(/[^a-zA-Z0-9.]/,'')}); //only alphanumeric symbols, no spaces
  }

  /**
   * Everytime a user changes the project we need to get the new Branches / Commits for this Project
   */
  handleProjectChange = (selectedProject) => {
    this.setState({ selectedProject });
    const projectId = selectedProject.value;
    fetch('http://' + this.props.servers.gitlabServer + '/api/v4/projects/'+ projectId +'/repository/commits', 
    {headers: {'PRIVATE-TOKEN': this.props.servers.gitlabToken}})
    .then(result=>result.json())
    .then(gitCommits=>this.setState({gitCommits}));
  }

  handleCommitChange = (selectedCommit) => {
    this.setState({ selectedCommit });
  }

  handleSQChange = (selectedQualityGate) => {
    this.setState({ selectedQualityGate });
  }

  render() {
    const getProjects = this.state.gitProjects.map (project => ({ 
      value: project.id, 
      label: project.path_with_namespace
    }));
    
    const getCommits = this.state.gitCommits.map (commit => ({ 
      value: commit.id, 
      label: '['+ commit.short_id+'] ' + commit.title
    }));
    getCommits.push({value: 'HEAD', label: 'HEAD'});
    
    // This is empty at first render, but gets filled later. Trying to access .qualitygates throws exception because its not defined at first render.
    // Solution working: Define Object and check if qualitygates !== undefined ...
    var getQualityGates = [];
    if(this.state.sqQualityGates.qualitygates !== undefined) {
      getQualityGates = this.state.sqQualityGates.qualitygates.map (gate => ({ 
        value: gate.id, 
        label: gate.name
      }));
    }
    getQualityGates.push({value: 'no', label: 'No Quality Check'});
    //console.log(getQualityGates);
    
    return (
      <div className="container">
        <Alert ref="alert" />
        {this.state.camundaEngine.length === 0 && 
          <div className="alert alert-dismissible alert-warning">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <h4 className="alert-heading">Camunda Engine offline!</h4>
            <p className="mb-0">Camunda is currently not running. Make sure to start the server, before you request a new Instance.</p>
          </div>
        }
        
        <h1>Instances</h1>
        <Running camundaServer={this.props.servers.camundaServer} /><br />
        
        <div>
          <legend>Request new Instance</legend>
          <form ref={(input) => this.instanceForm = input} autoComplete="off" className="form-horizontal" onSubmit={(e) => this.createInstance(e)}>
            
            {/* Git */}
            <div className="form-group">
              <label className="control-label">Branch Name</label>
              <div className="controls">
                <input type="text" key="git_branch_name" onChange={this.handleBranchNameChange} required className="form-control"
                  name="git_branch_name" placeholder="Branch Name" value={this.state.git_branch_name} />
                <small className="form-text text-muted">Use letters and numbers only. No spaces, no special characters</small>
              </div>
            </div>

            
            {this.state.gitProjects.length > 0 &&
              <div className="form-group">
                <label>Select a Project</label>
                <Select 
                  required
                  //ref={(input) => this.git_project = input} 
                  id="git_project" 
                  value={this.state.selectedProject}
                  onChange={this.handleProjectChange}
                  options={getProjects}
                />
              </div>
            }

            {/* {this.state.gitProjects.length > 0 &&
              <div className="form-group">
                <label>Select a Project</label>
                <select required ref={(input) => this.git_project = input} className="form-control" id="git_project" onChange={this.changeProject}>
                  <option value="" disabled selected>Select a Project</option>
                  {this.state.gitProjects.map(gitProjects => <option key={gitProjects.name} value={gitProjects.id}>{gitProjects.name}</option>)}
                </select>
              </div>
            } */}

            { this.state.selectedProject !== '' && this.state.gitCommits.length === 0 &&
              <p className="text-danger">GitLab Project has no Commits. Create a initial Commit to proceed!</p>
            }

            {this.state.gitCommits.length > 0 && 
              <div className="form-group">
                <label>Select a Commit</label>
                <Select 
                  name="git_commit"
                  id="git_commit"
                  required
                  value={this.state.selectedCommit}
                  //ref={(input) => this.git_commit = input} 
                  onChange = {this.handleCommitChange}
                  options={getCommits}
                />
              </div> 
            }

            {/* {this.state.gitCommits.length > 0 && 
              <div className="form-group">
                <label>Select a Commit</label>
                <select ref={(input) => this.git_commit = input} className="form-control" id="git_commit">
                  {this.state.gitCommits.map(gitCommits=><option key={gitCommits.short_id} value={gitCommits.short_id}>[{gitCommits.short_id}] {gitCommits.title}</option>)}
                  <option value="HEAD">HEAD</option>
                </select>
              </div> 
            } */}

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
            {this.state.sqQualityGates &&
              <div className="form-group">
                <label>Select a SonarQube Quality Gate</label>
                <Select
                  id="sonarqube_profile" 
                  value={this.state.selectedQualityGate}
                  onChange={this.handleSQChange}
                  options={getQualityGates}
                  searchable={false}
                />
              </div>
            }

            {/* <div className="form-group">
              <label>Select a SonarQube (QA) Profile</label>
              <select ref={(input) => this.sonarqube_profile = input} className="form-control" id="sonarqube_profile">
                <option value="no">No QA</option>
                <option value="profile1">SonarQube High Quality Gate</option>
                <option value="profile2">SonarQube Medium Quality Gate</option>
              </select>
            </div> */}

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
            { this.state.gitProjects.length === 0 &&
              <p className="text-danger">GitLab Server is offline!</p>
            }
            <button disabled={this.state.gitCommits.length === 0} type="submit" className="btn btn-primary">Create Instance</button>
          </form>
        </div>

      </div>
    );
  }
}