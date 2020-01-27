import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import './users.css';
import { createNewUser } from "../../../../server";
import { notification } from "antd";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
};

export default  function CreateUser() {
    const history = useHistory();

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [staffId, setStaffId] = useState('');
    let [role, setRole] = useState('Staff');
    let [department, setDepartment] = useState('HR- Human Resource');
    let [phoneNumber, setPhoneNumber] = useState('');
    let [password, setPassword] = useState('');
    let [tnc, settnc] = useState(false);

    function onCreateNewUser(event) {
        event.preventDefault();
        if(tnc){
            let payload = {
                name,
                email,
                staffId,
                role,
                department,
                phoneNumber,
                password
            };
            createNewUser(payload)
                .then(response =>{
                    if(response.data.status === "Success"){
                        popNotification({
                            title: response.data.status,
                            description: "User Created Successfully.",
                            type: "success"
                        })
                        history.push('/admin/users');
                        window.location.reload();
                    }
                    else{
                        popNotification({
                            title: "Try Again",
                            description: "Could not create User. Please Try Again.",
                            type: "warning"
                        })
                    }

                })
                .catch(error=>{
                    popNotification({
                        title: 'Error',
                        description: error.message,
                        type: "error"
                    })
                })
        }
        else{
            alert('Please Select to agree with the Terms & Condition');
        }
    }
    function onGeneratePassword(event) {
        event.preventDefault();
        setPassword((Math.random().toString(36).substring(2, 15)));
        document.getElementById('Password').value = password;
    }
    const onCancel = () => {
        history.push('/admin/users');
    }

    return (
        <div>
            <h3>CREATE USER</h3>
            <button className="cancel-button" onClick={onCancel}>
                <b>
                <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
                </svg>

                    </b> Cancel</button>
            <div className="row">
                <div className="col-md-6 column-1">
                    <label>Name</label>
                    <input className="input" type="text" onChange={event => {
                        setName(event.target.value);
                    }}/>
                    <label>Email</label>
                    <input className="input" type="text" onChange={event => {
                        setEmail(event.target.value);
                    }}/>
                    <label>User ID</label>
                    <div className="row">
                        <div className="col-md-6">
                            <input className="input input-short" type="text" onChange={event => {
                                setStaffId(event.target.value);
                            }}/>
                        </div>
                        <div className="col-md-6">
                            <label className="_label">This ID is the existence ID and can be use for user searching</label>
                        </div>
                    </div>
                    <label>Actual user role</label>
                    <select className="select select-short" onChange={event => {
                        setRole(event.target.value);
                    }}>
                        <option>User</option>
                        <option>Staff</option>
                    </select>
                    <label>Department</label>
                    <select className="select" onChange={event => {
                        setDepartment(event.target.value);
                    }}>
                        <option>HR- Human Resource</option>
                        <option>Security</option>
                        <option>Sales and Marketing</option>
                    </select>
                </div>
                <div className="col-md-6 col-right">
                    <br/><br/>
                    <h4 className="col-2-heading">Credential - MFA Setups</h4><br/>
                    <label className="_label">Setup user Firsst-time password which will send via their email address and verify mobile number for MFA setups</label><br/>
                    <br/><label>First-Time Password</label>
                    <input className="input" id="Password" type="text" value={password} onChange={event => {
                        setPassword(event.target.value);
                    }}/>
                    <div className="row gen-pass">
                        <div className="col-md-6">
                            <button className="button button-medium" onClick={event => {
                                onGeneratePassword(event);
                            }}>Auto-Generate Password</button>
                        </div>
                        <div className="col-md-4">
                            <label className="_label">Generate a random secure password</label>
                        </div>
                    </div>
                    <br/>
                    <label>Mobile Number</label>
                    <div className="row" style={{paddingBottom: "14px"}}>
                        <div className="col-md-2 country-code">
                             (+65)
                        </div>
                        <div className="col-md-9 mobile-input">
                            <input className="input" type="text" onChange={event => {
                                setPhoneNumber(event.target.value);
                            }}/>
                        </div>
                    </div>
                    <br/><br/>
                    <h3 className="tac-heading">Terms & Conditions</h3><br/>
                    <div className="tac-check"><input type="checkbox" onChange={event =>settnc(!tnc)
                    }/>
                        <label className="tac-text">
                            I hereby have read all the terms and conditon while creating and allowing user to use and access data within this application
                        </label></div>
                    <button className="button button-large" onClick={event => {
                        onCreateNewUser(event);
                    }}>Create</button>
                </div>

            </div>
        </div>
    );
}

