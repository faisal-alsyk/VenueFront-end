import React, {useState} from "react";
import {useHistory} from "react-router-dom"

import {CreateNewVenue} from "../../../../server";
import { notification } from "antd";
import classname from "classname";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
};

export default  function CreateVenue({refresh}) {
    const history = useHistory();
    let [name, setName] = useState();
    let [size, setSize] = useState(0);
    let [venueId, setVenueId] = useState(0);
    let [status, setStatus] = useState('Available');

    const [err, setErr] = useState();



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
                        refresh();
                        history.push('/admin/venues');
                    }
                    else{
                        popNotification({
                            title: "Try Again",
                            description: "Could not create venue. Please Try Again.",
                            type: "warning"
                        })
                    setErr(response.data);
                    }

                })
                .catch(error=>{
                    popNotification({
                        title: 'Error',
                        description: "Could not create venue. Please Try Again.",
                        type: "error"
                    })
                })
    }

    const onCancel = () => {
        history.push('/admin/venues');
    }

    let errName, errSize, errVenue, errRole  ;
    if(err) {
        errName = err.name;
        errVenue = err.venueId;
        errSize = err.size;
        errRole = err.role
    }
    

    return (
        <div>
            <h3>CREATE VENUE</h3>
            <form onSubmit={event => {
                            onCreateNewVenue(event);
                        }}>  
                <div className="row">
                    <div className="col-md-6 column-1">
                        <button className="cancel-button" onClick={onCancel}>
                            <b>
                                <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
                                </svg>

                            </b> Cancel</button>
                         
                        <label>Name</label>
                        <input 
                            type="text" 
                            className={classname("input form-control", {
                            "is-invalid": errName
                            })}
                            onChange={event => {
                            setName(event.target.value);
                        }} 
                        required
                        />
                        {errName && <div className="invalid-feedback">{errName}</div>}

                        <label>Size</label>
                        <input
                         type="number"
                         className={classname("input form-control", {
                            "is-invalid": errSize
                        })}
                         onChange={event => {
                             setSize(event.target.value);
                            }}
                            required
                            />
                          {errSize && <div className="invalid-feedback">{errSize}</div>}
                             
                        <label>Venue ID</label>
                        <input 
                         className={classname("input form-control", {
                            "is-invalid": errVenue
                        })}
                        type="number" 
                         
                        onChange={event => {
                            setVenueId(event.target.value);
                        }}
                        required
                        />
                          {errVenue && <div className="invalid-feedback">{errVenue}</div>}

                        <label>Status</label>
                        <select 
                        className={classname("select select-short custom-select", {
                            "is-invalid": errRole
                            })} 
                        onChange={event => {
                            setStatus(event.target.value);
                        }}
                        required
                        >
                            <option value = "">select status</option>
                            <option>Available</option>
                            <option>Busy</option>
                        </select>
                        {errRole && <div className="invalid-feedback">{errRole}</div>}
                        <input type="submit" className="button button-large" type="submit" value="Create"/>
                            {/*Create</input>*/}
                    </div>
                </div>
                    </form> 
           
        </div>
    );
}

