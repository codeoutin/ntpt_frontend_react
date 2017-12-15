import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';  

export const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            
            <NavLink exact to="/" className="navbar-brand">{props.title}</NavLink>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink exact to="/" className="nav-link" activeStyle={{ color: "red" }}>Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/camunda-server" className="nav-link" activeStyle={{ color: "red" }}>Camunda Server</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/servers" className="nav-link" activeStyle={{ color: "red" }}>Servers</NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink to="/admin" className="nav-link" activeStyle={{ color: "red" }}>Admin</NavLink>
                    </li> */}
                    <li className="nav-item">
                    <   NavLink to="/instances" className="nav-link" activeStyle={{ color: "red" }}>Instances</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}