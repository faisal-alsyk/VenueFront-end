import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { notification } from "antd";
import "./Login.css";
import classname from "classname"
import Header from "../../components/LoginHeader/header";
import {adminLogin, userLogin   } from "../../server";
import Spinner from "../../components/common/Spinner";
import Axios from "axios";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
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
                    if(response.data.data.role === "Admin"){
                        history.push('/verification', {userData});
                    }
                    else {
                        popNotification({
                            title: "Not Authorized",
                            description: "You are not authorized to Log In as Admin.",
                            type: "warning"
                        })
                    }
                }
                else {
                    setErr(response.data);
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
    function onUserLogin (event) {
        event.preventDefault();
        let payload = {
            email: email,
            password: password
        }

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
        userLogin(payload)

            .then(response => {
                setloading(false);
                if(response.data.status === "Success"){
                    popNotification({
                        title: response.data.status,
                        description: "Successfully Logged In.",
                        type: "success"
                    });

                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('role', response.data.data.role);
                    localStorage.setItem('roleId', response.data.data._id);
                    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                    history.push("/venuebooking/booking");
                } else {

                    setErr(response.data)
                }
            })
            .catch(error => {
                setloading(false);
                popNotification({
                    title: 'Failed',
                    description: "Something went wrong. Please try again",
                    type: "error"
                });
            })
    }

    let errEmail, errPaswd  ;
    if(err) {
        errEmail = err.error.email;
        errPaswd = err.error.password;
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
                        setloading(true);
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
    return (
        <div className="loginBody" style={{background: "#f8f8f8"}} >
            <Header/>
            <div className="login-div">
                {viewContent}
            </div>
        </div>
    );
}

