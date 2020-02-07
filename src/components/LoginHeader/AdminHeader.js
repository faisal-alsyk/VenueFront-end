import React from "react";
import logo from "../../assets/img/logo.svg"
import "./loginHeader.css"
import {useHistory, Link} from "react-router-dom"
// const token = localStorage.getItem('token');

export default function AdminHeader() {
    const history = useHistory();
    const path = history.location.pathname;
    function onLogout(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        history.push('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <Link to ="/dashboard" className="navbar-brand"> <img className="navbar-brand "
                                    src={ logo }
                                    alt="admin"  /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link brand-name active" onClick={ event => history.goBack()}>One Stop Management System  <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" 
                        style= {{ color: (path === "/admin/users" ) || (path === "/admin/users/create") || (path.includes("/admin/users/view/")) || (path.includes("/admin/users/update") || (path.includes("/admin/users/resetpassword"))) ? "#005404" : ""}}
                         to="/admin/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/venues"
                          style= {{ color: (path === "/admin/venues" ) || (path === "/admin/venues/create") || (path.includes("/admin/venues/view/")) || (path.includes("/admin/venues/update")) ? "#005404" : ""}}
                        >Venues</Link>
                    </li>
                    </ul>
                    <span className="navbar-text">
                    <button className={(path === "/login" || path === "/") ? 'hide-logout': 'show-logout'}
                            onClick={event => {
                                onLogout(event);
                            }}>Logout</button>
                    </span>
                </div>
            </nav>
</>

    );
};
