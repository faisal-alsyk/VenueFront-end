import React from "react";
import logo from "../../assets/img/logo.svg";
import "./loginHeader.css";
import {useHistory, Link} from "react-router-dom";

export default function Header() {
    const role = localStorage.getItem("role")
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

            <nav className="navbar navbar-expand-lg navbar-light bg-white nav-bar-shadow">
                <Link to ={role === "Admin" ? "/dashboard" : role === "User" ? "/venuebooking/booking" : "/venuebooking/booking"} className="navbar-brand"> <img className="navbar-brand "
                                    src={ logo }
                                    alt="admin"  /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        
                         <Link className="nav-link brand-name" to ={role === "Admin" ? "/dashboard" : role === "User" ? "/venuebooking/booking" : "/venuebooking/booking"}
                         >One Stop Management System  <span className="sr-only">(current)</span></Link>
                    </li>
                    </ul>
                    <span className="navbar-text">

                        <button className={(path === "/login") || (path === "/") ? 'show-public-button' : 'hide-public-button'}
                                onClick={ () => {history.push("/venuebooking/booking") }}>
                            Proceed as Public User
                        </button>

                {role ? ( <button className={(path === "/login" || path === "/" || path === "/verification") ? 'hide-logout': 'show-logout'}
                            onClick={event => {
                                onLogout(event);
                            }}>Logout</button>) : ""}

                    </span>
                </div>
            </nav>
        </>
    );
};
