import React, { Component } from 'react';


export class Admin extends Component {
  render() {
    return (
      <div className="container">
        <h3>Create Admin Login {this.props.arsch}</h3>
        <form>
          <fieldset>
            <legend>Legend</legend>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="inputPassword1" placeholder="Password" />
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </fieldset>
        </form>

      </div>
    );
  }
}
