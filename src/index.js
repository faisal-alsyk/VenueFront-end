import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/ProtectedRoutes/privateRoute";
import 'antd/dist/antd.css';

import "bootstrap";
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import login from "./views/Authentication/login.js"
import Dashboard from "./components/dashboard";
import AdminDashboard from "./components/dashboard/administration";
import VenueDashboard from "./components/dashboard/venueBooking";

// axios.defaults.baseURL = "http://localhost:4200/api";
 axios.defaults.baseURL = "https://venue-booking-api.herokuapp.com/api";
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

ReactDOM.render(
    <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={login}
              accessor="public"
            />
            <Route path="/login" component={login} accessor="public" />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/admin" component={AdminDashboard} />
            <PrivateRoute path="/venuebooking" component={VenueDashboard} />
          </Switch>
        </Router>
    </div>,
    document.getElementById("root")
);