import React, { useState } from "react";
import Header from "../../components/LoginHeader/header";

import "./Login.css";
import adminLogo from "../../assets/img/admin.png";

let login = function Login(props) {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [adminCode, setadminCode] = useState("");
    let [showLoginForm , setshowLoginForm] = useState(true);

    return (
        <div className={"loginBody"}>
            <Header/>
            <hr/>
            <div className={ showLoginForm === true ? 'Login' : 'hideLogin'}>
                <form>
                    <label className="login-label">EMAIL</label>
                    <input className="email"
                           onChange={event => {
                               setEmail(event.target.value);
                           }}
                    />
                    <label className="login-label">PASSWORD</label>
                    <input className="password"
                           onChange={event => {
                               setPassword(event.target.value);
                           }}
                    />
                    <button className="login">
                        LOGIN
                    </button>
                    <button className="loginAsAdmin"
                            onClick={ (event) => {
                                event.preventDefault();
                                setshowLoginForm(false);
                        }} >
                        <b>LOGIN AS ADMIN</b>
                        <span>
                            <img className="admin-icon"
                                src={ adminLogo }
                                alt="admin" />
                        </span>
                    </button>
                </form>
            </div>
            <div className={showLoginForm === false ? 'AdminLogin' : 'hideAdminLogin'}>
                <h1 className="admin-code-heading">Admin Code</h1>
                <div className="row">
                    <div className="column img">
                        <img className="admin-code-admin-icon" src={ adminLogo }/>
                    </div>
                    <div className="column text">
                        <label className="admin-code-label">
                            As an admin, we need to be sure that you are an authorized aministrator
                        </label>
                    </div>
                </div>
                <form>
                    <label className="login-label">Admin Code</label>
                    <input className="admin-code"
                           onChange={event => {
                               setadminCode(event.target.value);
                           }}
                    />
                    <button className="login">LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default login

