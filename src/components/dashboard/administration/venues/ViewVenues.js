import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {DeleteVenue, getVenue} from "../../../../server";

import { notification, Popconfirm } from "antd";

import "./venue.css";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
};

const ViewVenue = function ViewVenue({refresh}) {
    const history = useHistory();
    let path = history.location.pathname;
    let len = path.length;
    let id = path.substring(19, len);
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
        history.push(`/admin/venues/update/${id}`, {venueData});
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
                    refresh();
                    history.push('/admin/venues');
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
                    description: "Could not delete venue. Please Try Again.",

                    type: "error"
                })
            })
    }

    return (
        <>
        <div className="view-user">
        <div className="show-venue-heading">

            <div style={{display:"flex"}}>
                   <button className="btn-back" style={{marginLeft:"unset"}} onClick={event => {
                        onBack();
                    }}><svg className="btn-back-svg" width="10" height="14"  viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.07874 6.46949L7.15218 0.396367C7.44499 0.103555 7.91999 0.103555 8.2128 0.396367L8.92124 1.1048C9.21374 1.3973 9.21405 1.87105 8.92249 2.16418L4.10905 6.9998L8.92218 11.8357C9.21405 12.1289 9.21343 12.6026 8.92093 12.8951L8.21249 13.6036C7.91968 13.8964 7.44468 13.8964 7.15187 13.6036L1.07874 7.53012C0.785928 7.2373 0.785928 6.7623 1.07874 6.46949Z" fill="white"/>
                    </svg>
                    Back</button>
                <h4 className="user-name-heading-4" style={{fontWeight: "bold",marginLeft:"unset", fontSize: "24px", lineHeight: "30px"}}>{venueData.name}</h4>

                </div>
                <div className="" >
                <Popconfirm
                    title="Are you sure delete this venue?"
                    onConfirm={event => {
                        onDelete(event);
                     }}
                    okText="Yes"
                    cancelText="No"
                >

                <button className="btn-delete" style={{marginTop:"unset", marginRight:"unset"}}>
            <b>
            <svg className="btn-delete-svg" width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
            </svg>
                </b> Delete venue</button></Popconfirm>
              </div>
              {/* <div className="col-md-8">
                   {/* <button className="button button-full button-delete" onClick={event => {
                       onDelete(event);
                    }}>Delete</button> */}
              {/* </div> */}
              </div>
              <div className="user-detail">
                <div className="user-detail-container venue-content">
                    <label className="user-detail-label">#ID: </label>
                     <label className="user-detail-label label-1">{venueData._id}</label>
                     <a><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon" onClick={event => {
                        onEdit();
                    }}>
                        <path d="M12.4928 4.00608L17.9937 9.50694L6.04881 21.4518L1.14436 21.9932C0.487796 22.0659 -0.0669308 21.5107 0.00611607 20.8541L0.551819 15.9462L12.4928 4.00608ZM21.396 3.1871L18.8131 0.604248C18.0074 -0.201416 16.7008 -0.201416 15.8951 0.604248L13.4652 3.03413L18.9661 8.53499L21.396 6.10511C22.2016 5.29901 22.2016 3.99276 21.396 3.1871Z" fill="#005404"/>


                    </svg>
                     </a>
                </div>
                <div className="user-detail-container venue-content">
                    <label className="user-detail-label" >Venue Created At: </label>
                    <label className="user-detail-label label-1 vew-date">{venueData.createdAt}</label>
                </div>
                <hr/>
                <div className="user-detail-container venue-content" style={{marginBottom:"10px!important", marginLeft:"32px"}}>
                    <label className="user-detail-label">Venue ID: </label>
                    <label className="user-detail-label label-1">{venueData.venueId}</label>
                </div>
                <div className="user-detail-container venue-content" style={{marginBottom:"10px !important", marginLeft:"32px"}}>
                    <label className="user-detail-label">Size: </label>
                    <label className="user-detail-label label-1">{venueData.size}</label>
                </div>
                <div className="user-detail-container venue-content" style={{marginBottom:"10px !important", marginLeft:"32px"}}>
                    <label className="user-detail-label">Availability Status: </label>
                    <label className="user-detail-label label-1">{venueData.status}</label>
                </div>

            </div>
        </div>
        </>
    );
}

export default ViewVenue;
