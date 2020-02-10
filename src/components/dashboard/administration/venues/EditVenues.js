import React, {useEffect, useState} from "react";

import {useHistory} from "react-router-dom";
import {getVenue, UpdateVenue} from "../../../../server";
import { notification } from "antd";
import classname from "classname";


const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
};

const updateVenue = function EditVenue({refresh}) {
    const history = useHistory();
    let path = history.location.pathname;
    let len = path.length;
    let id = path.substring(21, len);
    //let [venueData, setVenueData] = useState({});
    // useEffect(()=>{
    //     getVenue(id)
    //         .then(response=>{
    //             setVenueData(response.data.data);
    //         })
    //         .catch(error => {
    //             alert(error);
    //         })
    // },[]);
    const {venueData} = history.location.state;

    let [name, setName] = useState(venueData.name);
    let [size, setSize] = useState(venueData.size);

    let [status, setStatus] = useState(venueData.status);

    const [err, setErr] = useState();


    function onUpdate(event){
        event.preventDefault();
        let payload = {
            name,
            size,
            status
        }
        UpdateVenue(venueData._id, payload)
            .then(response =>{
                if(response.data.status === "Updated"){
                    popNotification({
                        title: response.data.status,
                        description: "Venue Updated Successfully.",
                        type: "success"
                    })

                    refresh();
                    history.push(`/admin/venues/view/${id}`);
                }
                else{
                    popNotification({
                        title: "Try Again",
                        description: "Could not Update Venue. Please Try Again.",
                        type: "warning"
                    })

                    setErr(response.data);
                }

            })
            .catch(error=>{
                popNotification({
                    title: 'Error',
                    description: "Could not Update Venue. Please Try Again.",
                    type: "error"
                })
            })
    }
    const onCancel = () => {
        history.push(`/admin/venues/view/${id}`);
    }

    let errName, errSize, errRole ;
    if(err) {
        console.log(err.role)
        errName = err.name;
        errRole = err.role;
        errSize = err.size;
    }

    return (
        <div>
            <form onSubmit={event => {
                             onUpdate(event);
                        }}>
            <div className="row">
                <div className="col-md-6 column-1" style={{paddingTop:"unset"}}>
                    <div className="row">
                        <div className="col-md-8">
                            <h3 className="edit-profile-heading">Edit Venue Detail</h3>
                        </div>
                        <div className="col-md-4">
                            <button className="cancel-button" onClick={onCancel}>
                                <b>
                                    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
                                    </svg>

                                </b> Cancel</button>
                        </div>
                    </div>
                    <hr/>
                    <label>Name</label>
                    <input
                     className={classname("input form-control", {
                        "is-invalid": errName
                        })}
                    type="text"
                    value={name}
                    onChange={event => {
                        setName(event.target.value);
                    }}
                    required
                    />
                    {errName && <div className="invalid-feedback">{errName}</div>}

                    <label>Size</label>
                    <input
                     className={classname("input form-control", {
                        "is-invalid": errSize
                    })}
                    type="Number"
                    value={size}
                    onChange={event => {
                        setSize(event.target.value);
                    }}
                    required
                    />
                   {errRole && <div className="invalid-feedback">{errRole}</div>}

                    <label>Status</label>
                    <select
                    className={classname("select select-short custom-select", {
                        "is-invalid": errRole
                        })}
                    value={status} onChange={event => {
                        setStatus(event.target.value);
                    }}
                    required
                    >
                         <option value = "">Select Status</option>
                        <option>Available</option>
                        <option>Busy</option>
                    </select>
                    {errRole && <div className="invalid-feedback">{errRole}</div>}

                    <button className="button button-large" >Update</button>
                </div>
            </div>
            </form>
        </div>
    );
}

export default updateVenue;
