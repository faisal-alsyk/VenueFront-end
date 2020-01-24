import React from "react";

import './users.css';

const editProfile = function EditUser(props) {
    return (
        <div>
            <div className="row">
                <div className="col-md-6 column-1">
                    <h3 className="edit-profile-heading">Edit User Detail</h3>
                    <hr/>
                    <label>Name</label>
                    <input className="input" type="text"/>
                    <label>Email</label>
                    <input className="input" type="text"/>
                    <label>Account Status</label>
                    <input className="input" type="text"/>
                    <label>Role</label>
                    <select className="select select-short">
                        <option>Staff</option>
                        <option>Faculty</option>
                    </select>
                    <label>Department</label>
                    <select className="select">
                        <option>HR- Human Resource</option>
                        <option>Security</option>
                        <option>Sales and Marketing</option>
                    </select>
                    <button className="button button-med-2">Update</button>
                </div>
            </div>
        </div>
    );
}

export default editProfile;
