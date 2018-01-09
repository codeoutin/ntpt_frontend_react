import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Displays a Navbar Menu as Header Element
 * 
 * @param {*} props 
 * @author Patrick Steger
 * @see {@link https://github.com/stegerpa/ntpt_frontend_react|GitHub}
 */
export const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            {/* Logo */}
            <NavLink exact to="/" className="navbar-brand">{props.title}</NavLink>
            
            {/* Responsive Menu Toggle Button */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar */}
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink exact to="/" className="nav-link" activeStyle={{ color: "red" }}>Home <span className="sr-only">(current)</span></NavLink>
                    </li>

                    {props.menuItems.map(item => 
                    <li key={item.id} className="nav-item">
                        <NavLink to={item.link} className="nav-link" activeStyle={{ color: "red" }}>{item.name}</NavLink>
                    </li>)}
                </ul>
            </div>
        </nav>
    );
}