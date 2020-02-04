import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import "./Login.css";
import { verifyAdminCode } from "../../server";
import Spinner from "../../components/common/Spinner";
import Header from "../../components/LoginHeader/header";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 4
    });
};

export default function Verification() {
    const history = useHistory();
    let data;
    let token = localStorage.getItem('token');
    if(token){
        history.push('/dashboard')
    }
    else{
        const {userData} = history.location.state;
        data = userData;
    }
    let [adminCode, setadminCode] = useState("");
    let [loading , setloading] = useState(false);

    function onVerifyAdminCode (event) {
        event.preventDefault();
        let payload = {
            verificationCode: adminCode
        };
        verifyAdminCode(payload, data.token)
            .then(response=>{
                if(response.data.status == "Success"){
                    popNotification({
                        title: response.data.status,
                        description: response.data.message,
                        type: "success"
                    });
                    localStorage.setItem('token', response.data.data.token);
                    history.push('/dashboard');
                    history.location.state = null;
                }
                else {
                    popNotification({
                        title: response.data.status,
                        description: response.data.message,
                        type: "error"
                    });
                    history.push('/login');
                }

            })
            .catch(error=> {
                setloading(false);
                popNotification({
                    title: 'Error',
                    description: error.message,
                    type: "error"
                })
                history.push('/login');
            })
    }

    let adminContent ;
    if(loading){
        adminContent =  <Spinner/>
    } else {
        adminContent = (
            <div className="AdminLogin">
                <h1 className="admin-code-heading">Admin Code</h1>
                <div className="row">
                    <div className="column img">
                        <svg width="84" className="admin-code-admin-icon" height="68" viewBox="0 0 84 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M81.6769 35.5819L66.5569 29.6756C66.0187 29.4656 64.9031 29.19 63.6431 29.6756L48.5231 35.5819C47.1187 36.1331 46.2 37.4194 46.2 38.85C46.2 53.4975 55.2169 63.63 63.6431 66.9244C64.9031 67.41 66.0056 67.1344 66.5569 66.9244C73.29 64.2994 84 55.1906 84 38.85C84 37.4194 83.0812 36.1331 81.6769 35.5819ZM65.1 60.69V35.8706L77.6344 40.7663C76.8994 52.1981 69.6412 58.5375 65.1 60.69ZM29.4 33.6C38.6794 33.6 46.2 26.0794 46.2 16.8C46.2 7.52063 38.6794 0 29.4 0C20.1206 0 12.6 7.52063 12.6 16.8C12.6 26.0794 20.1206 33.6 29.4 33.6ZM42 38.85C42 38.5219 42.105 38.22 42.1444 37.905C41.8162 37.8919 41.5012 37.8 41.16 37.8H38.9681C36.0544 39.1387 32.8125 39.9 29.4 39.9C25.9875 39.9 22.7587 39.1387 19.8319 37.8H17.64C7.90125 37.8 0 45.7012 0 55.44V60.9C0 64.3781 2.82187 67.2 6.3 67.2H52.5C53.3925 67.2 54.2456 67.0031 55.02 66.675C47.9325 61.0444 42 51.3581 42 38.85Z" fill="#005404"/>
                        </svg>
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
                    <button className="login" onClick={event => {

                        setloading(true);
                        onVerifyAdminCode(event);

                    }}>LOGIN</button>
                </form>
            </div>
        )
    }

    return (
        <div className="loginBody" style={{background: "#f8f8f8"}} >
            <Header/>
            <div className="login-div">
                {adminContent}
            </div>
        </div>
    );
}

