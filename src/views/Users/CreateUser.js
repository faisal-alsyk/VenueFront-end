import React from "react";

import './users.css';

const createUser = function CreateUser() {
    return (
        <div>
            <h3>CREATE USER</h3>
            <button className="cancel-button"><b>X</b> Cancel</button>
            <hr/>
            <div className="row">
                <div className="col-md-6 column-1">
                    <label>Name</label>
                    <input className="input" type="text"/>
                    <hr/>
                    <label>Email</label>
                    <input className="input" type="text"/>
                    <hr/>
                    <label>User ID</label>
                    <div className="row">
                        <div className="col-md-6">
                            <input className="input input-short" type="text"/>
                        </div>
                        <div className="col-md-6">
                            <label className="user-label">This ID is the existence ID and can be use for user searching</label>
                        </div>
                    </div>
                    <hr/>
                    <label>Role</label>
                    <select className="select select-short">
                        <option>Staff</option>
                        <option>Faculty</option>
                    </select>
                    <hr/>
                    <label>Department</label>
                    <select className="select">
                        <option>HR- Human Resource</option>
                        <option>Security</option>
                        <option>Sales and Marketing</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <br/><br/>
                    <h4 className="col-2-heading">Credential - MFA Setups</h4><br/>
                    <label>Setup user Firsst-time password which will send via their email address and verify mobile number for MFA setups</label><br/>
                    <br/><label>First-Time Password</label>
                    <input className="input" type="text"/>
                    <div className="row gen-pass">
                        <div className="col-md-8">
                            <button className="button button-medium">Auto-Generate Password</button>
                        </div>
                        <div className="col-md-4">
                            <label className="gen-pass-label">Generate a random secure password</label>
                        </div>
                    </div>
                    <br/>
                    <label>Mobile Number</label>
                    <div className="row">
                        <div className="col-md-2">
                            <label className="country-code">(+65)</label>
                        </div>
                        <div className="col-md-7">
                            <input className="input" type="text"/>
                        </div>
                    </div>
                    <br/><br/>
                    <h3 className="tac-heading">Terms & Conditions</h3><br/>
                    <div className="tac-check"><input type="checkbox"/>
                        <label className="tac-text">
                            I hereby have read all the terms and conditon while creating and allowing user to use and access data within this application
                        </label></div>
                    <button className="button button-large">Create</button>
                </div>

            </div>
        </div>
    );
}

export default createUser;
