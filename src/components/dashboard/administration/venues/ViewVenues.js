import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {DeleteVenue, getVenue} from "../../../../server";
import { notification } from "antd";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
};

const ViewVenue = function ViewVenue(props) {
    const history = useHistory();
    let path = history.location.pathname;
    console.log(path);
    let len = path.length;
    let id = path.substring(19, len);
    console.log(id);
    let [venueData, setVenueData] = useState({});
    useEffect(()=>{
        getVenue(id)
            .then(response=>{
                setVenueData(response.data.data);
            })
            .catch(error => {
                alert(error);
            })
    },[]);
    function onEdit (){
        history.push(`/admin/venues/update/${id}`);
    }
    function onBack() {
        history.push('/admin/venues');
    }
    function onDelete(event) {
        event.preventDefault();
        DeleteVenue(venueData._id)
            .then(response =>{
                if(response.data.status === "Deleted!"){
                    popNotification({
                        title: response.data.status,
                        description: "Venue Deleted Successfully.",
                        type: "success"
                    })
                    history.push('/admin/venues');
                    window.location.reload();
                }
                else{
                    popNotification({
                        title: "Try Again",
                        description: "Could not delete venue. Please Try Again.",
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
                    <h4 className="user-name-heading-4">{venueData.name}</h4>
                </div>
                <div className="col-md-2">
                    <button className="button button-full button-delete" onClick={event => {
                        onDelete(event);
                    }}>Delete</button>
                </div>
            </div>
            <div className="user-detail">
                <div className="user-detail-container">
                    <label className="user-detail-label">#ID: </label>
                    <label className="user-detail-label label-1">{venueData._id}</label>
                    <i className="glyphicon glyphicon-pencil icon" onClick={event => {
                        onEdit();
                    }}/>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Venue Created At: </label>
                    <label className="user-detail-label label-1">{venueData.createdAt}</label>
                </div>
                <hr/>
                <div className="user-detail-container">
                    <label className="user-detail-label">Venue ID: </label>
                    <label className="user-detail-label label-1">{venueData.venueId}</label>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Size: </label>
                    <label className="user-detail-label label-1">{venueData.size}</label>
                </div>
                <div className="user-detail-container">
                    <label className="user-detail-label">Availability Status: </label>
                    <label className="user-detail-label label-1">{venueData.status}</label>
                </div>

            </div>
        </div>
    );
}

export default ViewVenue;
