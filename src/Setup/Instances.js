import React, { Component } from 'react';


export class Instances extends Component {
  render() {
    return (
      <div className="container">
        <h3>Request new Instance</h3>
        <form>

        <form role="form" className="form-horizontal">
          <div className="control-group">
            <label className="control-label">Branch Name</label>
            <div className="controls">
              <input required type="text" className="form-control"
                cam-variable-name="branch_name" cam-variable-type="String"
                placeholder="ABCD" ng-minlength="2" ng-maxlength="20" />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">MySQL Database</label>
            <div className="controls">
              <input type="checkbox" className="form-control"
                cam-variable-name="database" cam-variable-type="Boolean" />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Build Pipeline</label>
            <div className="controls">
              <input type="checkbox" className="form-control"
                cam-variable-name="buildPipeline" cam-variable-type="Boolean" />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Branch Type</label>
            <div className="controls">
              <select cam-variable-name="branchType" cam-variable-type="String">
                <option value="release">RELEASE</option>
                <option value="hotfix">HOTFIX</option>
                <option value="feature">FEATURE</option>
              </select>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">SonarQube (QA)</label>
            <div className="controls">
              <select cam-variable-name="schemaType" cam-variable-type="String">
                <option value="runtime">RUNTIME</option>
                <option value="unittest">UNITTEST</option>
                <option value="all">ALL</option>
              </select>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Project</label>
            <div className="controls">
              <select cam-variable-name="project" cam-variable-type="String">
              </select>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">SonarQube (QA)</label>
            <div className="controls">
              <select cam-variable-name="sonarqubeProfile"
                cam-variable-type="String">
                <option value="no">No QA</option>
                <option value="profile1">Profile 1</option>
                <option value="profile2">Profile 2</option>
                <option value="profile3">Profile 3</option>
              </select>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Test Environment</label>
            <div className="controls">
              <input type="checkbox" className="form-control"
                cam-variable-name="testEnv" cam-variable-type="Boolean" />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Additional Artifacts needed?</label>
            <div className="controls">
              <input type="checkbox" className="form-control"
                cam-variable-name="additionalArtifacts" cam-variable-type="Boolean" />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">What do you need?</label>
            <div className="controls">
              <textarea className="form-control"
                cam-variable-name="additionalArtifactsDesc"
                cam-variable-type="String" rows="4"></textarea>
            </div>
          </div>

        </form>




          <hr />
          <fieldset>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
              <label for="exampleSelect1">Example select</label>
              <select className="form-control" id="exampleSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="form-group">
              <label for="exampleSelect2">Example multiple select</label>
              <select multiple="" className="form-control" id="exampleSelect2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="form-group">
              <label for="exampleTextarea">Example textarea</label>
              <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
            </div>
            <div className="form-group">
              <label for="exampleInputFile">File input</label>
              <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
              <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
            </div>
            <fieldset className="form-group">
              <legend>Radio buttons</legend>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked="" />
                  Option one is this and that—be sure to include why it's great
                            </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2" />
                  Option two can be something else and selecting it will deselect option one
                            </label>
              </div>
              <div className="form-check disabled">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled="" />
                  Option three is disabled
                            </label>
              </div>
            </fieldset>
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Check me out
                        </label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </fieldset>
        </form>
      </div>
    );
  }
}
