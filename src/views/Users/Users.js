import React, {useState} from "react";
import Pagination from "react-js-pagination"

import './users.css'

function ListUser(props) {
    return (
            <div className="row" onClick={()=> alert(props._id) }>
                <div className="col-md-4">
                    {props._id}
                </div>
                <div className="col-md-1">
                    {props.staffId}
                </div>
                <div className="col-md-3">
                    {props.name}
                </div>
                <div className="col-md-2">
                    {props.status}
                </div>
                <div className="col-md-2">
                    <button>edit</button>
                    <button>delete</button>
                </div>
            </div>
    );
}
const usersView = function UsersView() {
    const dummyUserData = [
        {
            _id: "12345",
            name: "Mr. Ghulam Mustafa",
            staffId: "123",
            status: "Active"
        },
        {
            _id: "12346",
            name: "Mr. Ghafoor Ahmad",
            staffId: "124",
            status: "Pending"
        }
    ];
    let [userData, setuserData] = useState( dummyUserData );
    return (
        <div>
            <div className="show-user-list">
                <div className="row">
                    <div className="col-md-4">
                        <button className="button button-small"
                        >Create User</button>
                    </div>
                    <div className="col-md-8">
                        <select className="input select select-short">
                            <option>Staff ID</option>
                            <option>Name</option>
                        </select>
                        <input className="input input-medium" type="search"/>
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            #ID
                        </div>
                        <div className="col-md-1">
                            Staff ID
                        </div>
                        <div className="col-md-3">
                            Name
                        </div>
                        <div className="col-md-2">
                            Status
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
                <div>
                    { userData.map((user, i) => {
                        // eslint-disable-next-line no-unused-expressions
                        return <ListUser key={i} name={user.name} _id={user._id} staffId={user.staffId} status={user.status}/>
                    })}
                </div>
            </div>
            <div className="hide-create-user">
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
        </div>
    );
}

export default usersView;
