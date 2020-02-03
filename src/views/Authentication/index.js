import React from "react";
import {Switch, Route} from "react-router-dom";
import "./Login.css";
import LoginPage from "./loginpage";
import Verification from "./verifycode";
import Header from "../../components/LoginHeader/header";

export default function Authentication() {
    return(
        <div className="loginBody" style={{background: "#f8f8f8"}} >
            <Header/>
            <div className="login-div">
                <Switch>
                    <Route exact path="/xyz" render={()=> <LoginPage/>}/>
                    <Route path="/" render={()=> <Verification/>}/>
                </Switch>
            </div>
        </div>
    );
}
// import React from "react";
// import { Switch, Route } from "react-router-dom";
// import "./Login.css";
// import VerifyCode from "./verifycode";
// import Login from "./login";
//
// import Header from "../../components/LoginHeader/header";
//
//
// export default function Authentication() {
//     return (
//         <div className={"loginBody"} style= {{background: "#f8f8f8"}} >
//             <Header/>
//             <div className="login-div">
//                 <Switch>
//                     <Route exact path="/login" component={Login}/>
//                     <Route path="/verification" component={VerifyCode}/>
//                 </Switch>
//             </div>
//
//         </div>
//     );
// };
