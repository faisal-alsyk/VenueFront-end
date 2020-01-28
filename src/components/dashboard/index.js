import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/LoginHeader/header";
import "bootstrap/dist/css/bootstrap.min.css"
import "./dashboard.css"

export default function Dashboard(){

    return (
        <>
        <Header/>
        <div className="container">
            <div className="row div-row">

                <div className="col-md-6dashboard-container">
                    <div className="button-card col-md-6 col-xs-12">
                        <Link to="/admin/users" className="button-content">
                        <svg width="63" height="50" viewBox="0 0 84 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M81.6769 35.5819L66.5569 29.6756C66.0187 29.4656 64.9031 29.19 63.6431 29.6756L48.5231 35.5819C47.1187 36.1331 46.2 37.4194 46.2 38.85C46.2 53.4975 55.2169 63.63 63.6431 66.9244C64.9031 67.41 66.0056 67.1344 66.5569 66.9244C73.29 64.2994 84 55.1906 84 38.85C84 37.4194 83.0812 36.1331 81.6769 35.5819ZM65.1 60.69V35.8706L77.6344 40.7663C76.8994 52.1981 69.6412 58.5375 65.1 60.69ZM29.4 33.6C38.6794 33.6 46.2 26.0794 46.2 16.8C46.2 7.52063 38.6794 0 29.4 0C20.1206 0 12.6 7.52063 12.6 16.8C12.6 26.0794 20.1206 33.6 29.4 33.6ZM42 38.85C42 38.5219 42.105 38.22 42.1444 37.905C41.8162 37.8919 41.5012 37.8 41.16 37.8H38.9681C36.0544 39.1387 32.8125 39.9 29.4 39.9C25.9875 39.9 22.7587 39.1387 19.8319 37.8H17.64C7.90125 37.8 0 45.7012 0 55.44V60.9C0 64.3781 2.82187 67.2 6.3 67.2H52.5C53.3925 67.2 54.2456 67.0031 55.02 66.675C47.9325 61.0444 42 51.3581 42 38.85Z" fill="#005404"/>
                        </svg>
                            <h3>Administration</h3>
                        </Link>
                    </div>
                    <div className="button-card col-md-6 col-xs-12">
                        <Link to="/venuebooking" className="button-content">
                        <svg width="38" height="50" viewBox="0 0 38 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.823 48.9912C2.63379 28.421 0 26.3099 0 18.75C0 8.39463 8.39463 0 18.75 0C29.1054 0 37.5 8.39463 37.5 18.75C37.5 26.3099 34.8662 28.421 20.677 48.9912C19.7458 50.3363 17.7541 50.3362 16.823 48.9912ZM18.75 26.5625C23.0647 26.5625 26.5625 23.0647 26.5625 18.75C26.5625 14.4353 23.0647 10.9375 18.75 10.9375C14.4353 10.9375 10.9375 14.4353 10.9375 18.75C10.9375 23.0647 14.4353 26.5625 18.75 26.5625Z" fill="#005404"/>
                        </svg>

                            <h3>Venue Booking</h3>
                        </Link>
                    </div>
                </div>
                <div className="col-md-6"></div>
            </div>
        </div>
        </>
    );
}

