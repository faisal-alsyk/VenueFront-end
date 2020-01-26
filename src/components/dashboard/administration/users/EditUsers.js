import React, {useEffect, useState} from "react";

import './users.css';
import {useHistory} from "react-router-dom";
import {getUser, UpdateUser} from "../../../../server";

const editProfile = function EditUser(props) {
    const history = useHistory();
    let path = history.location.pathname;
    let len = path.length;
    let id = path.substring(20, len);
    let [userData, setUserData] = useState({});
    useEffect(()=>{
        getUser(id)
            .then(response=>{
                setUserData(response.data.data);
            })
            .catch(error => {
                alert(error);
            })
    },[]);
    let [name, setName] = useState(userData.name);
    let [email, setEmail] = useState(userData.email);
    let [role, setRole] = useState(userData.role);
    let [department, setDepartment] = useState(userData.department);
    let [status, setStatus] = useState(userData.status);

    function onUpdate(event){
        event.preventDefault();
        let payload = {
            name,
            email,
            role,
            department,
            status
        }
        UpdateUser(userData._id, payload)
            .then(response => {
                alert(response.data.message);
                history.push(`/admin/users/view/${id}`);
            })
            .catch(error => {
                alert(error);
            })
    }
    const onCancel = () => {
        history.push(`/admin/users/view/${id}`);
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6 column-1">
                    <h3 className="edit-profile-heading">Edit User Detail</h3>
                    <button className="cancel-button" onClick={onCancel}>
                        <b>
                            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
                            </svg>

                        </b> Cancel</button>
                    <hr/>
                    <label>Name</label>
                    <input className="input" type="text" value={userData.name} onChange={event => {
                        setName(event.target.value);
                    }}/>
                    <label>Email</label>
                    <input className="input" type="text" value={userData.email} onChange={event => {
                        setEmail(event.target.value);
                    }}/>
                    <label>Account Status</label>
                    <select className="select select-short" value={userData.status} onChange={event => {
                        setStatus(event.target.value);
                    }}>
                        <option>Active</option>
                        <option>Pending</option>
                    </select>
                    <label>Role</label>
                    <select className="select select-short" value={userData.role} onChange={event => {
                        setRole(event.target.value);
                    }}>
                        <option>Staff</option>
                        <option>Faculty</option>
                    </select>
                    <label>Department</label>
                    <select className="select" value={userData.department} onChange={event => {
                        setDepartment(event.target.value);
                    }}>
                        <option>HR- Human Resource</option>
                        <option>Security</option>
                        <option>Sales and Marketing</option>
                    </select>
                    <button className="button button-med-2 button-full" onClick={event=>{
                        onUpdate(event);
                    }}>Update</button>
                </div>
            </div>
        </div>
    );
}

export default editProfile;
