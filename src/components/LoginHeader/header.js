import React from "react";
import logo from "../../assets/img/logo.svg"
import "./loginHeader.css"
function Header() {
    return (
        <nav className = "navbar navbar-expand-lg navbar-light bg-light nav-all">
         <img className="navbar-brand nav-logo"
                                src={ logo }
                                alt="admin" />
            <h2 >One Stop Management System</h2>
        </nav>
    );
}
export default Header;
