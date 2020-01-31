import React from "react";
import logo from "../../assets/img/logo.svg"
import "./loginHeader.css"
import {useHistory} from "react-router-dom"
// const token = localStorage.getItem('token');

export default function Header() {
    const history = useHistory();
    const path = history.location.pathname;
    function onLogout(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        history.push('/login');
    }
    return (
        <nav className = "navbar navbar-expand-lg navbar-light bg-light nav-all">
            <div className="nav-bar">
                <img className="navbar-brand nav-logo"
                     src={ logo }
                     alt="admin" />
                <h2 className="nav-heading">One Stop Management System</h2>
            </div>

            <button className={(path === "/login" || path === "/") ? 'hide-logout': 'show-logout'}
            onClick={event => {
                onLogout(event);
            }}>Logout</button>
        </nav>
    );
};
