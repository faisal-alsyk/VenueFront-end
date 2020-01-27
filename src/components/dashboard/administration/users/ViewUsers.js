import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {DeleteUser, getUser} from "../../../../server";
import { notification } from "antd";
import './users.css';

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
};

const viewUser = function ViewUsers(props) {
    const history = useHistory();
    let path = history.location.pathname;
    let len = path.length;
    let id = path.substring(18, len);
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
    function onEdit (){
        history.push(`/admin/users/update/${id}`);
    }
    function onBack() {
        history.push('/admin/users');
    }
    function onDelete(event) {
        event.preventDefault();
        DeleteUser(userData._id)
            .then(response =>{
                if(response.data.status === "Deleted!"){
                    popNotification({
                        title: response.data.status,
                        description: "User Deleted Successfully.",
                        type: "success"
                    })
                    history.push('/admin/venues');
                    window.location.reload();
                }
                else{
                    popNotification({
                        title: "Try Again",
                        description: "Could not delete User. Please Try Again.",
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

    return (
        <div className="view-user">
            <div className="row show-user-heading">
                <div className="col-md-2">
                    <button className="button button-full" onClick={event => {
                        onBack();
                    }}>Back</button>
                </div>
                <div className="col-md-7">
                    <h4 className="user-name-heading-4">{userData.name}</h4>
                </div>
                <div className="col-md-2">
                    <button className="button button-full button-delete" onClick={event => {
                        onDelete(event);
                    }}>Delete</button>
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
                    <i className="glyphicon glyphicon-pencil icon" onClick={event => {
                        onEdit();
                    }}></i>
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
