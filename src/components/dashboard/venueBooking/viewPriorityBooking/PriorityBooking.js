import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import { notification } from "antd";
// import DatePicker from "react-datepicker";

import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import classname from "classname";
import "react-datepicker/dist/react-datepicker.css";
import {VenueList, priorityBooking} from "../../../../server";
import "../venueDashboard.css";
const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
};

export default  function PriorityBooking() {

    const history = useHistory();
    const [venueData, setVenueData] = useState([]);

    const [title, setTitle] = useState('');
    const [venueId, setVenueId] = useState('');
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [purpose, setPurpose] = useState('');
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
            priorityBooking(payload)
                .then(response =>{
                    if(response.data.status === "Success"){
                        popNotification({
                            title: response.data.status,
                            description: "Venue booking Created Successfully.",
                            type: "success"
                        })
                        history.push('/venuebooking/booking');
                    }
                    else{
                        popNotification({
                            title: "Try Again",
                            description: response.data.message,
                            type: "warning"
                        })

                        setErr(response.data.error);
                    }

                })
                .catch(error=>{
                    popNotification({
                        title: 'Error',
                        description: "Could not Created Venue booking. Please Try Again.",
                        type: "error"
                    })
                })
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
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-8 col-xs-12" style={{border:"unset"}}>
                <form  onSubmit={event => {
                        onCreateBooking(event);}}>
                <div className="form-group row">

                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking Name</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <input
                        className={classname("input form-control", {
                            "is-invalid": errName
                            })}
                        type="text"
                        onChange={event => {
                            setTitle(event.target.value);
                         }}
                         required
                    />
                    {errName && <div className="invalid-feedback"> {errName}</div>}
                    </div>
                    </div>

                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Venue</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <select
                        className={classname("input custom-select" , {"is-invalid": errVenue })}
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
                    <div className="col-md-8 col-xs-8">

                         <DatePicker
                            className={classname("input form-control", {"is-invalid" : errStart})}
                            size="large"
                            format="YYYY-MM-DD HH:mm:ss"
                            // defaultValue={moment(start, "YYYY-MM-DD HH:mm:ss")}
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
                    <div className="col-md-4 col-xs-6">
                    <label className="input-label">Booking End Date</label>
                    </div>
                    <div className="col-md-8 col-xs-8">

                         <DatePicker
                            className={classname("input form-control", {"is-invalid":errEnd})}
                            size="large"
                            format="YYYY-MM-DD HH:mm:ss"
                             //defaultValue={moment(start, "YYYY-MM-DD HH:mm:ss")}
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
                    <textarea className="input form-control" type="textarea" style={{padding:"10px", fontSize:"20px",height:"unset"}} row="3" onChange={event => {
                        setPurpose(event.target.value);
                    }}/>
                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4"></div>
                    <div className="col-md-8 col-xs-8">
                    <button type="submit" className="button button-large"
                    >Create</button>

                    </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

