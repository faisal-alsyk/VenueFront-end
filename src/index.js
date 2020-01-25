import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css'; 
import "./assets/css/material-dashboard-react.css?v=1.8.0";
import "bootstrap";
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from "./components/dashboard/administration/users/CreateUser";

import  Store  from "./Redux/store";
import { Provider } from "react-redux";
import setAuthorizationToken from "./Redux/utils/setAuthToken";
import axios from "axios";
import login from "./views/Authentication/login.js"
import Dashboard from "./components/dashboard";
import AdminDashboard from "./components/dashboard/administration";
//import { ProtectedRoute } from "./routers/ProtectedRoute";
axios.defaults.baseURL = "https://aasan-ticket-backend.herokuapp.com";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";
// import setAuthToken from "./Redux/utils/setAuthToken";

// // core components
// import Admin from "./layouts/Admin.js";
// import login from "./views/Authentication/login.js"
// import Dashboard from "./components/dashboard";


//const hist = createBrowserHistory();

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
    // <Router history={hist}>
    //     <Switch>
    //         {/* <Route path="/admin" component={ Admin } /> */}
    //         <Route exact path="/dashboard1" component={Dashboard} />
    //          <Route exact path="/dashboard1/admin" component={AdminDashboard} />
    //         {/* <Route path="/login" component={ login } />
    //         <Redirect from="/" to="/login" /> */}
    //     </Switch>
    // </Router>,
    <div className="App">
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={login}
              accessor="public"
            />
            <Route path="/login" component={login} accessor="public" />
            <Route exact path="/dashboard1" component={Dashboard} />
            <Route path="/dashboard1/admin" component={AdminDashboard} />
            {/* <Route path="/dashboard1/admin/create" component={CreateUser}> */}
             
        {/* </Route> */}
          </Switch>
        </Router>
      </Provider>
    </div>,
    document.getElementById("root")
);


// axios.defaults.baseURL = process.env.SERVER_URL;
//setAuthorizationToken(localStorage.jwtToken);
// function App() {
//   return (
//   );
// }

// export default App;
