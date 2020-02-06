import React, { useState } from "react";
import {useHistory, Switch, Route} from "react-router-dom";
import { notification } from "antd";
import "./Login.css";
import classname from "classname"
import Header from "../../components/LoginHeader/header";
import {adminLogin, verifyAdminCode} from "../../server";
import Spinner from "../../components/common/Spinner";
import Verification from "./verifycode";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 4
    });
};

export default function LoginPage(props) {
    const history = useHistory();
    let token = localStorage.getItem('token');
    if(token){
        history.push('/dashboard');
    }
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading , setloading] = useState(false);
    const [err, setErr] = useState();

    function onAdminLogin(event) {
        event.preventDefault();
        let payload = {
            email: email,
            password: password
        };

        const errorData = {};
            errorData.error ={}
        
            if(!payload.email) {
                errorData.error.email  = "Email field required";
                
            }
            if(!payload.password){
                errorData.error.password = "Password field required";
                
            }

        if(errorData.error.email || errorData.error.password) {
            setErr(errorData);
            setloading(false);
            return;
        }
        adminLogin(payload)
            .then(response => {
                setloading(false);
                if(response.data.status == "Success"){
                    popNotification({
                        title: response.data.status,
                        description: "To Sign-In as Admin, Enter Verification Code to Confirm that you are Admin.",
                        type: "success"
                    });
                    let userData = response.data.data;
                    history.push('/verification', {userData});
                }
                else {
                    // popNotification({
                    //     title: response.data.status,
                    //     description: response.data.error.email,
                    //     type: "error"
                    // });
                    setErr(response.data)
                }
            })
            .catch(error=>{
                setloading(false);
                popNotification({
                    title: 'Error',
                    description: error.message,
                    type: "error"
                })

            })
    }

    let errEmail, errPaswd  ;
    if(err) {
        errEmail = err.error.email;
        errPaswd = err.error.password;
        console.log("zahid login message",err.error);
        
    }
    
    function onUserLogin (event) {
        event.preventDefault();
        popNotification({
            title: 'Not Allowed',
            description: "Please Sign is as Admin",
            type: "info"
        })
    }


    let viewContent;

    if(loading) {
        viewContent = <Spinner/>
    } else {
        viewContent = (
            <div className="Login div-login">
                <form>
                    <label className="form-heading">Login</label>
                    <label className="login-label">EMAIL</label>
                    <input 
                    type="email"
                     className={classname("email form-control", {
                        "is-invalid": errEmail
                        })}  
                           onChange={event => {
                               setEmail(event.target.value);
                           }} required
                    />
                    
                    {errEmail && <div style={{color:"red"}}>{errEmail}</div>}

                    <label className="login-label" style={{paddingTop:"24px"}}>PASSWORD</label>
                    <input 
                    className={classname("password form-control", {
                        "is-invalid": errPaswd
                        })} 
                    type="password"
                           onChange={event => {
                               setPassword(event.target.value);
                           }} required
                    />
                    {errPaswd && <div style={{color:"red"}}>{errPaswd}</div>}
                    <button className="login"
                    style={{marginTop:"24px"}}
                    onClick={event=>{
                        onUserLogin(event);
                    }}>
                        LOGIN
                    </button>
                    <button className="loginAsAdmin"
                            onClick={ (event) => {
                                setloading(true);
                                onAdminLogin(event);
                            }} >
                        <b>LOGIN AS ADMIN</b>
                        <span>
                    <svg width="23" className="admin-icon" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8777 9.53086L17.8277 7.94883C17.6836 7.89258 17.3848 7.81875 17.0473 7.94883L12.9973 9.53086C12.6211 9.67852 12.375 10.023 12.375 10.4062C12.375 14.3297 14.7902 17.0437 17.0473 17.9262C17.3848 18.0562 17.6801 17.9824 17.8277 17.9262C19.6313 17.223 22.5 14.7832 22.5 10.4062C22.5 10.023 22.2539 9.67852 21.8777 9.53086ZM17.4375 16.2563V9.6082L20.7949 10.9195C20.598 13.9816 18.6539 15.6797 17.4375 16.2563ZM7.875 9C10.3605 9 12.375 6.98555 12.375 4.5C12.375 2.01445 10.3605 0 7.875 0C5.38945 0 3.375 2.01445 3.375 4.5C3.375 6.98555 5.38945 9 7.875 9ZM11.25 10.4062C11.25 10.3184 11.2781 10.2375 11.2887 10.1531C11.2008 10.1496 11.1164 10.125 11.025 10.125H10.4379C9.65742 10.4836 8.78906 10.6875 7.875 10.6875C6.96094 10.6875 6.09609 10.4836 5.31211 10.125H4.725C2.11641 10.125 0 12.2414 0 14.85V16.3125C0 17.2441 0.755859 18 1.6875 18H14.0625C14.3016 18 14.5301 17.9473 14.7375 17.8594C12.8391 16.3512 11.25 13.7566 11.25 10.4062Z" fill="#505051"/>
                    </svg>
                </span>
                    </button>
                </form>
            </div>
        )
    }

    // let adminContent ;
    // if(loading && !showLoginForm){
    //     adminContent =  <Spinner/>
    // } else {
    //     adminContent = (
    //         <div className={showLoginForm === false ? 'AdminLogin' : 'hideAdminLogin'}>
    //         <h1 className="admin-code-heading">Admin Code</h1>
    //         <div className="row">
    //             <div className="column img">
    //                 <svg width="84" className="admin-code-admin-icon" height="68" viewBox="0 0 84 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M81.6769 35.5819L66.5569 29.6756C66.0187 29.4656 64.9031 29.19 63.6431 29.6756L48.5231 35.5819C47.1187 36.1331 46.2 37.4194 46.2 38.85C46.2 53.4975 55.2169 63.63 63.6431 66.9244C64.9031 67.41 66.0056 67.1344 66.5569 66.9244C73.29 64.2994 84 55.1906 84 38.85C84 37.4194 83.0812 36.1331 81.6769 35.5819ZM65.1 60.69V35.8706L77.6344 40.7663C76.8994 52.1981 69.6412 58.5375 65.1 60.69ZM29.4 33.6C38.6794 33.6 46.2 26.0794 46.2 16.8C46.2 7.52063 38.6794 0 29.4 0C20.1206 0 12.6 7.52063 12.6 16.8C12.6 26.0794 20.1206 33.6 29.4 33.6ZM42 38.85C42 38.5219 42.105 38.22 42.1444 37.905C41.8162 37.8919 41.5012 37.8 41.16 37.8H38.9681C36.0544 39.1387 32.8125 39.9 29.4 39.9C25.9875 39.9 22.7587 39.1387 19.8319 37.8H17.64C7.90125 37.8 0 45.7012 0 55.44V60.9C0 64.3781 2.82187 67.2 6.3 67.2H52.5C53.3925 67.2 54.2456 67.0031 55.02 66.675C47.9325 61.0444 42 51.3581 42 38.85Z" fill="#005404"/>
    //                 </svg>
    //             </div>
    //             <div className="column text">
    //                 <label className="admin-code-label">
    //                     As an admin, we need to be sure that you are an authorized aministrator
    //                 </label>
    //             </div>
    //         </div>
    //         <form>
    //             <label className="login-label">Admin Code</label>
    //             <input className="admin-code"
    //                    onChange={event => {
    //                        setadminCode(event.target.value);
    //                    }}
    //             />
    //             <button className="login" onClick={event => {
    //
    //                 setloading(true);
    //                 onVerifyAdminCode(event);
    //
    //             }}>LOGIN</button>
    //         </form>
    //     </div>
    //     )
    // }

    return (
        <div className="loginBody" style={{background: "#f8f8f8"}} >
            <Header/>
            <div className="login-div">
                {viewContent}
            </div>
        </div>
    );
}

