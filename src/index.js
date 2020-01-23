import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import setAuthToken from "./Redux/utils/setAuthToken";

// core components
import Admin from "./layouts/Admin.js";
import login from "./views/Authentication/login.js"
// import dashboard from "./views/Admin Dashboard/dashboard.js"

import "./assets/css/material-dashboard-react.css?v=1.8.0";
import "bootstrap";
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const hist = createBrowserHistory();

// Check for token
// if (localStorage.jwtToken) {
//     // Set auth token header auth
//     setAuthToken(localStorage.jwtToken);
//     // Decode token and get user info and exp
//     const decoded = jwt_decode(localStorage.jwtToken);
//     // Set user and isAuthenticated
//     store.dispatch(setCurrentUser(decoded));
//     // Check for expired token
//     const currentTime = Date.now() / 1000;
//     if (decoded.exp < currentTime) {
//         // Logout user
//         store.dispatch(logoutUser());
//         // Clear current Profile
//         store.dispatch(clearCurrentProfile());
//         // Redirect to login
//         window.location.href = '/login';
//     }
// }

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/admin" component={ Admin } />
            <Route path="/login" component={ login } />
            <Redirect from="/" to="/login" />
        </Switch>
    </Router>,
    document.getElementById("root")
);
