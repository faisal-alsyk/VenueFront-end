import React from "react";

import "bootstrap/dist/css/bootstrap.min.css"
import adminIcon from "../../assets/img/admin.png"
import "./dashboard.css"

const dashboard = function dashboard(){

    return (
        <div className="dashboard-container">
            <div className="button-card">
                <button className="button-content">
                    <img className="admin-icon" src={ adminIcon } />
                    <h3>Administration</h3>
                </button>
            </div>
            <div className="button-card">
                <button className="button-content">
                    <img className="admin-icon" src={ adminIcon }/>
                    <h3>Venue Booking</h3>
                </button>
            </div>
        </div>
    );
}

export default dashboard
