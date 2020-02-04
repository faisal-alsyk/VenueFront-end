import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import './users.css';
import { createNewUser } from "../../../../server";
import { notification } from "antd";
import classname from "classname";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
};

export default  function CreateUser( {refresh}) {
    const history = useHistory();

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [staffId, setStaffId] = useState(0);
    let [role, setRole] = useState('');
    let [department, setDepartment] = useState('');
    let [phoneNumber, setPhoneNumber] = useState('');
    let [password, setPassword] = useState('');
    let [tnc, settnc] = useState(false);
    const [err, setErr] = useState();

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
                        });
                        refresh();
                        history.push('/admin/users')
                    }
                    else{
                        popNotification({
                            title: "Try Again",
                            description: "Could not create User. Please Try Again.",
                            type: "warning"
                        })

                        setErr(response.data);
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

    let errName, errEmail, errStaffId, errRole, errNumber, errPaswd, errDept;
    if(err) {
        errName = err.name;
        errStaffId = err.staffId;
        errEmail = err.email;
        errRole = err.role;
        errNumber = err.phoneNumber;
        errPaswd = err.password;
        errDept = err.department;

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
            <form onSubmit={event => {
                onCreateNewUser(event);}}>
            <div className="row">
                <div className="col-md-6 column-1">
                    <label>Name</label>
                    <input 
                     className={classname("input form-control", {
                        "is-invalid": errName
                        })} 
                    type="text" 
                    onChange={event => {
                        setName(event.target.value);
                    }} required/>
                    {errName && <div className="invalid-feedback">{errName}</div>}

                    <label>Email</label>
                    <input 
                     className={classname("input form-control", {
                        "is-invalid": errEmail
                        })} 
                    type="email" 
                    onChange={event => {
                        setEmail(event.target.value);
                    }} required/>
                    {errEmail && <div className="invalid-feedback">{errEmail}</div>}

                    <label>User ID</label>
                    <div className="row">
                        <div className="col-md-6">
                            <input 
                            className={classname("input form-control", {
                                "is-invalid": errStaffId
                                })} 
                            type="number" 
                            onChange={event => {
                                setStaffId(event.target.value);
                            }} required/>
                    {errStaffId && <div className="invalid-feedback">{errStaffId}</div>}

                        </div>
                        <div className="col-md-6">
                            <label className="_label">This ID is the existence ID and can be use for user searching</label>
                        </div>
                    </div>
                    <label>Role</label>
                    <select
                    className={classname("select custom-select select-short", {
                        "is-invalid": errRole
                        })}  
                    onChange={event => {
                        setRole(event.target.value);
                    }} required>
                        <option value = ""> Select Role</option>
                        <option>User</option>
                        <option>Admin</option>
                        <option>Public</option>
                    </select>
                    {errRole && <div className="invalid-feedback">{errRole}</div>}

                    <label>Department</label>
                    <select 
                    className={classname("select custom-select select-short", {
                        "is-invalid": errDept
                        })}  
                     onChange={event => {
                        setDepartment(event.target.value);
                    }} required>
                        <option value = ""> Select Department</option>
                        <option>HR- Human Resource</option>
                        <option>Security</option>
                        <option>Sales and Marketing</option>
                    </select>
                    {errDept && <div className="invalid-feedback">{errDept}</div>}
                </div>
                <div className="col-md-6 col-right">
                    <br/><br/>
                    <h4 className="col-2-heading">Credential - MFA Setups</h4><br/>
                    <label className="_label">Setup user Firsst-time password which will send via their email address and verify mobile number for MFA setups</label><br/>
                    <br/><label>First-Time Password</label>
                    <input 
                    className={
                        classname("input form-control", {
                        "is-invalid": errPaswd
                        })}  
                     id="Password" type="text" 
                     value={password} 
                     onChange={event => {
                        setPassword(event.target.value);
                    }} required/>
                    {errPaswd && <div className="invalid-feedback">{errPaswd}</div>}

                    <div className="row gen-pass">
                        <div className="col-md-6">
                            <button className="button button-medium" style={{marginTop:"23px"}} onClick={event => {
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
                            <input 
                           className={
                            classname("input form-control", {
                            "is-invalid": errNumber
                            })} 
                            type="Number" 
                            onChange={event => {
                                setPhoneNumber(event.target.value);
                            }} required/>
                    {errNumber && <div className="invalid-feedback">{errNumber}</div>}

                        </div>
                    </div>
                    <br/><br/>
                    <h3 className="tac-heading">Terms & Conditions</h3><br/>
                    <div className="tac-check">
                        <input type="checkbox" required
                         onChange={event =>settnc(!tnc)
                    }/>
                        <label className="tac-text">
                            I hereby have read all the terms and conditon while creating and allowing user to use and access data within this application
                        </label></div>
                    <button type="submit" className="button button-large" >Create</button>
                </div>

            </div>
            </form>
        </div>
    );
}

