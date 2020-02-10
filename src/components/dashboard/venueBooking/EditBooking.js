import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import { notification } from "antd";

import { DatePicker } from 'antd';
import moment from 'moment';
import classname from "classname";
import "react-datepicker/dist/react-datepicker.css";
import {VenueList, getbookingbyId, updateBoking} from "../../../server";
import "./venueDashboard.css";
const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
};

export default  function EditBooking({refresh}) {

    const history = useHistory();
    const [venueData, setVenueData] = useState([]);

    const [title, setTitle] = useState("");
    const [venueId, setVenueId] = useState('0');
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [purpose, setPurpose] = useState("");
    const {bookingData} = history.location.state;

    const [err, setErr] = useState();
    useEffect(()=>{

        VenueList()
            .then(response => {
                setVenueData(response.data.data);
            })
            .catch(error => {
                alert(error.message);
            });

        getbookingbyId(bookingData.id)
            .then(response => {

                const editData = response.data.data.booking;
                setTitle(editData.title);
                setVenueId(editData.venueId);
                setStart(editData.start);
                setEnd(editData.end);
                setPurpose(editData.purpose);
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

    const  onupdateBoking = event => {
        event.preventDefault();
            let payload = {
                title,
                venueId,
                start,
                end,
                purpose
            };

            const error = {};
            if(!payload.start) {
                 error.start = "Start date and time required";
                 setErr(error);
            }
            if(!payload.end) {
                error.end = "End date and time required";
                setErr(error);
           }

           if (error.start || error.end) {
               return error;

           }

            updateBoking(bookingData.id, payload)
                .then(response =>{
                    if(response.data.status === "Updated"){
                        popNotification({
                            title: response.data.status,
                            description: "Venue booking update Successfully.",
                            type: "success"
                        })
                        refresh();
                        history.goBack();
                    }
                    else{
                        popNotification({
                            title: "Try Again",
                            description: response.data.message,
                            type: "warning"
                        })
                        setErr(response.data.error)
                    }

                })
                .catch(error=>{
                    popNotification({
                        title: 'Error',
                        description: "Could not update venue booking. Please Try Again.",
                        type: "error"
                    })
                })
    }

    const onCancel = () => {
        history.goBack();
    }

    const venueOption = venueData.map((data, index) =>
     <option key={index} value = { data._id }>{data.name}</option>

    )

    let errName, errStart, errVenue, errEnd  ;
    if(err) {
        errName = err.title;
        errVenue = err.venueId;
        errStart = err.start;
        errEnd = err.end;
    }

    return (
        <div>
            <div className="row">

            <div className="col-md-4">
                            <h3 className="edit-profile-heading">Edit booking Detail</h3>
                        </div>
                        <div className="col-md-4">
                            <button className="cancel-button"
                             onClick={onCancel}
                            >
                                <b>
                                    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
                                    </svg>

                                </b> Cancel</button>
                        </div>



                <div className="col-md-8 col-xs-12" style={{border:"unset"}}>
                    <hr></hr>
                <form onSubmit={event => {
                        onupdateBoking(event);}}>
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
                        value= {title}
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
                    <div className="col-md-8 col-xs-8">
                    <select
                          className={classname("input custom-select", {
                            "is-invalid": errVenue
                            })}
                        value={venueId}
                        style={{width:"100%"}}
                        onChange={event => {
                            setVenueId(event.target.value);
                        }}
                        required
                    >
                       <option value="0" disabled ={true}> Select Venue</option>
                       {venueOption}

                    </select>
                    {errVenue && <div className="invalid-feedback">{errVenue}</div>}

                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking Start Date</label>
                    </div>
                    <div className="col-md-8 col-xs-8">

                         <DatePicker
                            className={classname("input form-control", {
                                "is-invalid": errStart
                                })}
                            size="large"
                            format="YYYY-MM-DD HH:mm:ss"
                            value={moment(start)}
                            disabledDate={disabledDate}
                            // disabledTime={disabledDateTime}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            onChange={date => {
                                if ( moment(date, "YYYY-M-DD HH:mm:ss", true).isValid() ){
                                    const dateStart = moment(date._d);
                                    const startUtc = dateStart.utc()
                                    setStart(date._d);
                                }
                            }}
                        />
                    {errStart && <div className="invalid-feedback">{errStart}</div>}
                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking End Date</label>
                    </div>
                    <div className="col-md-8 col-xs-8">

                         <DatePicker
                           className={classname("input form-control", {
                            "is-invalid": errEnd
                            })}
                            size="large"
                            format="YYYY-MM-DD HH:mm:ss"
                             value = {moment(end)}
                            disabledDate={disabledDate}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            onChange={date => {
                                if ( moment(date, "YYYY-M-DD HH:mm:ss", true).isValid() ){
                                    const dateStart = moment(date._d);
                                    const startUtc = dateStart.utc()
                                    setEnd(date._d);
                                }
                            }}
                        />
                    {errEnd && <div className="invalid-feedback">{errEnd}</div>}
                       </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking Purpose</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <textarea className="input form-control" value ={purpose} type="textarea" style={{padding:"10px", fontSize:"20px",height:"unset"}} row="3" onChange={event => {
                        setPurpose(event.target.value);
                    }}/>
                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4"></div>
                    <div className="col-md-8 col-xs-8">
                    <button type="submit" className="button button-large" >Update</button>

                    </div>
                    </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

