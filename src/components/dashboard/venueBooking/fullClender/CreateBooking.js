import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import { notification } from "antd";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {createBooking} from "../../../../server";
import "./fullCalander.css";
const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
};

export default  function CreateVenue({refresh}) {

    const history = useHistory();

    const [bookingName, setBookingName] = useState('');
    const [name, setName] = useState('');
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [detail, setdetail] = useState('');




    function onCreateBooking(event) {
        event.preventDefault();
            let payload = {
                bookingName,
                name,
                venue,
                date,
                startTime,
                endTime,
                detail
            };
            createBooking(payload)
                .then(response =>{
                    if(response.data.status === "Success"){
                        popNotification({
                            title: response.data.status,
                            description: "Venue booking Created Successfully.",
                            type: "success"
                        })
                        refresh();
                        history.push('/venuebooking');
                    }
                    else{
                        popNotification({
                            title: "Try Again",
                            description: "Could not create venue booking. Please Try Again.",
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
        <div>
            <div className="row">
                <div className="col-md-8" style={{border:"unset"}}>
                    <div className="col-md-4">
                    <label className="input-label">Booking Name</label>
                    </div>
                    <div className="col-md-8">
                    <input className="input" type="text" onChange={event => {

                        setBookingName(event.target.value);
                    }}/>
                    </div>
                    <div className="col-md-4">
                    <label className="input-label">Venue</label>
                    </div>
                    <div className="col-md-8">
                    <input className="input form-control" type="text" onChange={event => {
                        setName(event.target.value);
                    }}/>
                    </div>
                    <div className="col-md-4">
                    <label className="input-label">Booking Date</label>
                    </div>
                    <div className="col-md-8" style={{paddingBottom:"23px"}}>
                        {/* <span class="input-group-text">
                        <i class="fab fa-twitter"></i>
                        </span>
                    <input className="input" type="Date" onChange={event => {
                        setDate(event.target.value);
                    }}/> */}
                        {/* <input type="text" class="form-control input" onChange={event => {
                        setDate(event.target.value);}}/> */}
                        <DatePicker 
                            className ="datepicker input"
                            selected={date} 
                            onChange={date => {
                            setDate(date);
                        }}/> 
                       
                    </div>
                    <div className="col-md-4">
                    <label className="input-label">Booking Start Time</label>
                    </div>
                    <div className="col-md-8">
                    <input className="input" type="time" onChange={event => {
                        setStartTime(event.target.value);
                    }}/>
                    </div>

                    <div className="col-md-4">
                    <label className="input-label">Booking End Time</label>
                    </div>
                    <div className="col-md-8">
                    <input className="input" type="time" onChange={event => {
                        setEndTime(event.target.value);
                    }}/>
                    </div>

                    <div className="col-md-4">
                    <label className="input-label">Booking Purpose</label>
                    </div>
                    <div className="col-md-8">
                    <textarea className="input" type="textarea" style={{padding:"10px", fontSize:"40px",height:"unset"}} row="3" onChange={event => {
                        setdetail(event.target.value);
                    }}/>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                    <button className="button button-large" style={{paddingBottom:"20px"}} onClick={event => {
                        onCreateBooking(event);
                    }}>Create</button>

                    </div>

                </div>
            </div>
        </div>
    );
}

