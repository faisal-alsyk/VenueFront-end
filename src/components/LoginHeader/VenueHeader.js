import React from "react";
import logo from "../../assets/img/logo.svg"
import "./loginHeader.css"
import {useHistory, Link} from "react-router-dom"
// const token = localStorage.getItem('token');

export default function VenueHeader() {
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

    let hideMenue ;
    let logoutBtn;
    console.log("DSDSDSD",role);
    if (role === "User") {
        hideMenue = <>
                 <li className="nav-item">
                        <Link className="nav-link" to="/venuebooking/bulk"
                         style = {{color:(path === "/venuebooking/bulk")? "#005404" : "" }}
                        >Bulk Booking</Link>
                    </li>
            </>;
        logoutBtn = <>
        
        <button className={(path === "/login" || path === "/") ? 'hide-logout': 'show-logout'}
                            onClick={event => {
                                onLogout(event);
                            }}>Logout</button>
        </>
        
    } else if(role === "Admin"){
        hideMenue = <>
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
        
                 </>;
         logoutBtn = <>
        
         <button className={(path === "/login" || path === "/") ? 'hide-logout': 'show-logout'}
                             onClick={event => {
                                 onLogout(event);
                             }}>Logout</button>
         </>
        
    } else if(role === null){
        hideMenue = <></>;
        logoutBtn = <></>;

    }


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
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
                    <li className="nav-item">
                        <Link className="nav-link" to="/venuebooking/booking"
                        style = {{color:(path === "/venuebooking/booking") || (path === "/venuebooking/booking/create") ? "#005404" : "" }}
                        >View All Booking</Link>
                    </li>
                   {hideMenue}
                    </ul>
                    <span className="navbar-text">
                       {logoutBtn}
                    </span>
                </div>
            </nav>
</>
    );
};
