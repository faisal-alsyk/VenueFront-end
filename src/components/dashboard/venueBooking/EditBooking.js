import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import { notification } from "antd";
// import DatePicker from "react-datepicker";

import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import {VenueList, getbookingbyId, updateBoking} from "../../../server";
import "./venueDashboard.css";
const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
};

export default  function EditBooking({refresh}) {

    const history = useHistory();
    const [venueData, setVenueData] = useState([]);

    const [title, setTitle] = useState("");
    const [venueId, setVenueId] = useState('0');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState();
    const [purpose, setPurpose] = useState("");

    const {bookingData} = history.location.state;
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

                const editData = response.data.data;
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
    console.log(title);

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
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
                            description: "Could not update venue booking. Please Try Again.",
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

    const venueOption = venueData.map((data, index) => 
     <option key={index} value = { data._id }>{data.name}</option>

    )

    return (
        <div>
            <div className="row">
                <div className="col-md-8 col-xs-12" style={{border:"unset"}}>
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking Name</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <input 

                        className="input"
                        type="text"
                        value= {title} 
                        onChange={event => {
                            setTitle(event.target.value);
                         }}
                    />
                    </div>
                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Venue</label>
                    </div>
                    <div className="col-md-8 col-xs-8" style={{paddingBottom:"23px"}}>
                    <select 
                        className="input" 
                        value={venueId} 
                        style={{width:"100%"}} 
                        onChange={event => {
                            setVenueId(event.target.value);
                        }}
                    >
                       <option value="0" disabled ={true}> Select Venue</option>
                       {venueOption}

                    </select>
                    </div>

                    <div className="col-md-4 col-xs-6">
                    <label className="input-label">Booking Start Date</label>
                    </div>
                    <div className="col-md-8 col-xs-8" style={{paddingBottom:"23px"}}>

                         <DatePicker
                            className="input"
                            size="large"  
                            format="YYYY-MM-DD HH:mm:ss"
                            value={moment(start)}
                            disabledDate={disabledDate}
                            // disabledTime={disabledDateTime}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            onChange={date => {
                                const dateStart = moment(date._d);
                                const startUtc = dateStart.utc()
                                setStart(startUtc);
                            }}
                        />
                       
                    </div>

                    <div className="col-md-4 col-xs-6">
                    <label className="input-label">Booking End Date</label>
                    </div>
                    <div className="col-md-8 col-xs-8" style={{paddingBottom:"23px"}}>
                        
                         <DatePicker
                            className="input"
                            size="large"  
                            format="YYYY-MM-DD HH:mm:ss"
                             value = {moment(end)}
                            disabledDate={disabledDate}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            onChange={date => {
                                const datemovement = moment(date._d);
                                var endUtc = datemovement.utc()

                                setEnd(endUtc);
                            }}
                        />
                       
                    </div>

                    <div className="col-md-4 col-xs-4">
                    <label className="input-label">Booking Purpose</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <textarea className="input" value ={purpose} type="textarea" style={{padding:"10px", fontSize:"20px",height:"unset"}} row="3" onChange={event => {
                        setPurpose(event.target.value);
                    }}/>
                    </div>
                    <div className="col-md-4 col-xs-4"></div>
                    <div className="col-md-8 col-xs-8">
                    <button className="button button-large" style={{paddingBottom:"20px", paddingTop:"5px"}} onClick={event => {
                        onupdateBoking(event);
                    }}>Update</button>

                    </div>

                </div>
            </div>
        </div>
    );
}

