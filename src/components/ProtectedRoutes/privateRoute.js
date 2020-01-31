import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

function getToken (){
    return localStorage.getItem('token');
}
const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            getToken() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
        />
)
export default (PrivateRoute);
