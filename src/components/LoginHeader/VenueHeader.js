import React from "react";
import logo from "../../assets/img/logo.svg"
import "./loginHeader.css"
import {useHistory, Link} from "react-router-dom"
// const token = localStorage.getItem('token');

export default function VenueHeader() {
    const history = useHistory();
    const path = history.location.pathname;
    function onLogout(event) {
        event.preventDefault();
        localStorage.removeItem('token');
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
                        <a className="nav-link brand-name" onClick={ event => history.goBack()}>One Stop Management System  <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/venuebooking/booking"
                        style = {{color:(path === "/venuebooking/booking") || (path === "/venuebooking/booking/create") ? "#005404" : "" }}
                        >View All Booking</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/venuebooking/admin"
                         style = {{color:(path === "/venuebooking/admin")? "#005404" : "" }}
                        >View Admin Booking</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/venuebooking/priority"
                         style = {{color:(path === "/venuebooking/priority")? "#005404" : "" }}
                        >Priority Booking </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/venuebooking/bulk"
                         style = {{color:(path === "/venuebooking/bulk")? "#005404" : "" }}
                        >Bulk Booking</Link>
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
