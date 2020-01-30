import React, {useState} from "react";
import {useHistory} from "react-router-dom"

import {CreateNewVenue} from "../../../../server";
import { notification } from "antd";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
};

export default  function CreateVenue() {
    const history = useHistory();
    let [name, setName] = useState('');
    let [size, setSize] = useState(0);
    let [venueId, setVenueId] = useState(0);
    let [status, setStatus] = useState('Available');


    function onCreateNewVenue(event) {
        event.preventDefault();
            let payload = {
                name,
                size,
                venueId,
                status
            };
            CreateNewVenue(payload)
                .then(response =>{
                    if(response.data.status === "Success"){
                        popNotification({
                            title: response.data.status,
                            description: "Venue Created Successfully.",
                            type: "success"
                        })
                        history.push('/admin/venues');
                        window.location.reload();
                    }
                    else{
                        popNotification({
                            title: "Try Again",
                            description: "Could not create venue. Please Try Again.",
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
    const onCancel = () => {
        history.push('/admin/venues');
    }

    return (
        <div>
            <h3>CREATE VENUE</h3>
            <form>
                <div className="row">
                    <div className="col-md-6 column-1">
                        <button className="cancel-button" onClick={onCancel}>
                            <b>
                                <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
                                </svg>

                            </b> Cancel</button>
                        <label>Name</label>
                        <input className="input" type="text" required onChange={event => {
                            setName(event.target.value);
                        }}/>
                        <label>Size</label>
                        <input className="input" type="number" required onChange={event => {
                            setSize(event.target.value);
                        }}/>
                        <label>Venue ID</label>
                        <input className="input" type="number" required onChange={event => {
                            setVenueId(event.target.value);
                        }}/>
                        <label>Role</label>
                        <select className="select select-short" required onChange={event => {
                            setStatus(event.target.value);
                        }}>
                            <option>Available</option>
                            <option>Busy</option>
                        </select>
                        <input className="button button-large" type="submit" value="Create" onClick={event => {
                            onCreateNewVenue(event);
                        }}/>
                            {/*Create</input>*/}

                    </div>
                </div>
            </form>
        </div>
    );
}

