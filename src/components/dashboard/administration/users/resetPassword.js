import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import {resetUserPassword} from "../../../../server";
import Spinner from "../../../common/Spinner";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
};


let resetPassword = function ResetPassword() {
    const history = useHistory();
    const {userData} = history.location.state;
    let [password, setPassword] = useState("");
    let [loading , setloading] = useState(false);

    function onResetPassword (event) {
        setloading(true);
        event.preventDefault();
        let payload = {
            id: userData._id,
            password: password
        };
        resetUserPassword(payload)
            .then(response=>{
                setloading(false)
                popNotification({
                    title: response.data.status,
                    description: response.data.message,
                    type: "success"
                })
                history.push(`/admin/users/view/${userData._id}`);

            })
            .catch(error=> {
                setloading(false);
                popNotification({
                    title: 'Error',
                    description: error.message,
                    type: "error"
                })
                history.push(`/admin/users/view/${userData._id}`);
            });
    }
    function onGeneratePassword(event) {
        event.preventDefault();
        setPassword((Math.random().toString(36).substring(2, 15)));
        document.getElementById('Password').value = password;
    }
    const onCancel = () => {
        history.push(`/admin/users/view/${userData._id}`);
    }


    let viewContent;

    if(loading) {
        viewContent = <Spinner/>
    }
    else {
        viewContent = (
            <div className="div-reset-password">
                <label className="form-heading-rp">Reset Password</label>
                <button className="cancel-button cancel-button-rp" style={{height: "37px", width: "107px"}} onClick={onCancel}>
                    <b>
                        <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
                        </svg>

                    </b> Cancel</button>
                <form>
                    <label className="login-label">PASSWORD</label>
                    <input className="password" type="text" id="Password" value={password}
                           onChange={event => {
                               setPassword(event.target.value);
                           }}
                    />
                    <button className="login" onClick={event => {
                        onGeneratePassword(event);
                    }}>Generate Password
                    </button>
                    <button className="login" onClick={event=>{
                        onResetPassword(event);
                    }}>Change Password</button>
                </form>
            </div>
        )
    }
    return (
        <div className={"loginBody"} style= {{background: "#f8f8f8"}} >
            <div className="login-div">
                {viewContent}
            </div>
        </div>
    );
};

export default resetPassword;

