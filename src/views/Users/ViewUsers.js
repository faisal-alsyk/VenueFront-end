import React from 'react';

import './users.css';

const viewUser = function ViewUsers(props) {
    let userData = props.data
    let x = props.iteration;
    return (
        <div className="view-user">
            <div className="row show-user-heading">
                <div className="col-md-2">
                    <button className="button button-full">Back</button>
                </div>
                <div className="col-md-7">
                    <h4 className="user-name-heading-4">{userData.name}</h4>
                </div>
                <div className="col-md-2">
                    <button className="button button-full button-delete">Delete</button>
                </div>

            </div>
            <div className="user-detail">
                <div className="user-detail-container">
                    <label className="user-detail-label">Account ID: </label>
                    <label className="user-detail-label label-1">{userData._id}</label>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Password: </label>
                    <label className="user-detail-label label-1">User Custom</label>
                    <a className="change-password">Change Password</a>
                </div>
                <hr/>
                <div className="user-detail-container">
                    <label className="user-detail-label">User Created At: </label>
                    <label className="user-detail-label label-1">{userData.createdAt}</label>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Role: </label>
                    <label className="user-detail-label label-1">{userData.role}</label>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Account Status: </label>
                    <label className="user-detail-label label-1">{userData.status}</label>
                </div>
                <hr/>
                <div className="user-detail-container">
                    <label className="user-detail-label">Employee ID: </label>
                    <label className="user-detail-label label-1">{userData.staffId}</label>
                    <i className="glyphicon glyphicon-pencil icon"></i>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Email: </label>
                    <label className="user-detail-label label-1">{userData.email}</label>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Phone Number: </label>
                    <span className="span-ph-num">
                        <label className="user-detail-label label-simple">(+65) </label>
                        <label className="user-detail-label label-1 label-simple">{userData.phoneNumber}</label>
                    </span>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Department: </label>
                    <label className="user-detail-label label-1">{userData.department}</label>
                </div>
            </div>
        </div>
    );
}

export default viewUser;
