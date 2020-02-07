import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import { notification } from "antd";
// import DatePicker from "react-datepicker";

import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import classname from "classname";

import "react-datepicker/dist/react-datepicker.css";
import {VenueList, createBooking, createPublicBooking} from "../../../server";
import "./venueDashboard.css";
const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
};

export default  function CreateVenue({refresh}) {

    const role = localStorage.getItem("role");

    const history = useHistory();
    const [venueData, setVenueData] = useState([]);

    const [title, setTitle] = useState('');
    const [venueId, setVenueId] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState();
    const [purpose, setPurpose] = useState('');
    const [email, setEmail] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState("");

    const [err, setErr] = useState();


    useEffect(()=>{

        VenueList()
            .then(response => {
                setVenueData(response.data.data);
            })
            .catch(error => {
                alert(error.message);
            });

    },[]);

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
      }

      function disabledDateTime() {
        return {
          disabledHours: () => range(0, 24).splice(4, 20),
          disabledMinutes: () => range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }

    const onCreateBooking = event => {
        event.preventDefault();
            let payload = {
                title,
                venueId,
                start,
                end,
                purpose,
                email,
                phoneNumber
            };
            const error = {};
            if(!payload.end) {
                 error.end = "End date and time required";
                 setErr(error);
                 return
            }

            if (role === "User" || role === "Admin") {
                
                createBooking(payload)
                    .then(response =>{
                        if(response.data.status === "Success"){
                            popNotification({
                                title: response.data.status,
                                description: "Venue booking Created Successfully.",
                                type: "success"
                            })
                            refresh();
                            history.goBack();
                        }
                        else if (response.data.status === "Error"){
                            popNotification({
                                title: "Try Again",
                                description: response.data.message,
                                type: "warning"
                            })
                        }
                        setErr(response.data);
    
                    })
                    .catch(error=>{
                        popNotification({
                            title: 'Error',
                            description: error.message,
                            type: "error"
                        })
                    })
                    
            } else {

                createPublicBooking(payload)
                .then(response =>{
                    if(response.data.status === "Success"){
                        popNotification({
                            title: response.data.status,
                            description: "Venue booking Created Successfully.",
                            type: "success"
                        })
                        refresh();
                        history.goBack();
                    }
                    else if (response.data.status === "Error"){
                        popNotification({
                            title: "Try Again",
                            description: response.data.message,
                            type: "warning"
                        })
                    }
                    setErr(response.data);

                })
                .catch(error=>{
                    popNotification({
                        title: 'Error',
                        description: error.message,
                        type: "error"
                    })
                })
                
            }
    }
    const venueOption = venueData.map((data, index) =>
     <option key={index} value = { data._id }>{data.name}</option>

    )

    let errName, errStart, errVenue, errEnd, errNumber, errEmail ;
    if(err) {
        errName = err.title;
        errVenue = err.venue;
        errStart = err.start;
        errEnd = err.end;
    }


    let publicFields;

    if(role) {
        publicFields = "";
    } else {

        publicFields = <>

<div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Phone Number</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <input
                        type="text"
                        className={classname("input form-control", {
                            "is-invalid": errNumber
                            })}
                        onChange={event => {
                            setPhoneNumber(event.target.value);
                         }}
                         required
                    />
                    {errNumber && <div className="invalid-feedback">{errNumber}</div>}

                    </div>
                    </div>

                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Email</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <input
                        type="email"
                        className={classname("input form-control", {
                            "is-invalid": errEmail
                            })}
                        onChange={event => {
                            setEmail(event.target.value);
                         }}
                         required
                    />
                    {errEmail && <div className="invalid-feedback">{errEmail}</div>}

                    </div>
                    </div>

        
        </>
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-8 col-xs-12" style={{border:"unset"}}>
                <form onSubmit={event => {
                        onCreateBooking(event);}}>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking Name</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <input
                        type="text"
                        className={classname("input form-control", {
                            "is-invalid": errName
                            })}
                        onChange={event => {
                            setTitle(event.target.value);
                         }}
                         required
                    />
                    {errName && <div className="invalid-feedback">{errName}</div>}

                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Venue</label>
                    </div>
                    <div className="col-md-8 col-xs-8" style={{paddingBottom:"23px"}}>

                    <select
                        className="input custom-select"
                        value={venueId}
                        style={{width:"100%"}}
                        onChange={event => {
                            setVenueId(event.target.value);
                        }}
                        required
                    >
                       <option value="" disabled ={true}> Select Venue</option>
                       {venueOption}

                    </select>
                    {errVenue && <div className="invalid-feedback">{errVenue}</div>}

                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking Start Date</label>
                    </div>
                    <div className="col-md-8 col-xs-8" style={{paddingBottom:"23px"}}>

                         <DatePicker
                            className="input"
                            size="large"
                            format="YYYY-MM-DD HH:mm:ss"
                            defaultValue={moment(start, "YYYY-MM-DD HH:mm:ss")}
                            disabledDate={disabledDate}
                            // disabledTime={disabledDateTime}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            onChange={date => {
                                 const dateStart = moment(date._d);
                                 const startUtc = dateStart.utc()


                                setStart(date._d);
                            }}
                        />

                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking End Date</label>
                    </div>
                    <div className="col-md-8 col-xs-8" style={{paddingBottom:"23px"}}>

                         <DatePicker
                            className="input"
                            size="large"
                            format="YYYY-MM-DD HH:mm:ss"
                             //defaultValue={moment(start, "YYYY-MM-DD HH:mm:ss")}
                            disabledDate={disabledDate}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            onChange={date => {
                                const datemovement = moment(date._d);
                                var endtUtc = datemovement.utc();


                                setEnd(date._d);
                            }}
                        />
                    {errEnd && <div style={{color:"red"}}>{errEnd}</div>}
                    </div>
                    </div>
                    
                    {publicFields}

                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking Purpose</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <textarea className="input form-control" type="textarea" style={{padding:"10px", fontSize:"20px",height:"unset"}} row="3" onChange={event => {
                        setPurpose(event.target.value);
                    }}/>
                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4"></div>
                    <div className="col-md-8 col-xs-8">
                    <button  type="submit" className="button button-large" >Create</button>

                    </div>
                    </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

