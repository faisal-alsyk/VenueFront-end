import React, {useState, useEffect} from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "antd";
import { Link, Route, Switch, useHistory} from "react-router-dom";
import ReactTable from "../../reactTable";
//import FieldList from "./FieldList";
//import Form from "../Form";
import col from "./colums";
import CreateVenues from "./CreateVenues";
import UpdateVenues from "./EditVenues";
import ViewVenues from "./ViewVenues";
import {VenueList, DeleteVenue} from "../../../../server";
//import { deleteType } from "../../../actions/typeActions";
import { notification } from "antd";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
}

export default function Users() {
    const role = localStorage.getItem("role")
    const history = useHistory();
    let [venueData, setVenueData] = useState( [] );
    let [refresh, setrefresh] = useState(false);

    useEffect(()=>{
        VenueList()
            .then(response => {
                setVenueData(response.data.data);
            })
            .catch(error => {
                alert(error.message);
            });
    },[]);

    useEffect(()=>{
        VenueList()
            .then(response => {
                setVenueData(response.data.data);
            })
            .catch(error => {
                alert(error.message);
            });
    },[refresh]);

    const onDelete = id => {
        DeleteVenue(id)
            .then(response =>{
                if(response.data.status === "Deleted!"){
                    popNotification({
                        title: response.data.status,
                        description: "Venue Deleted Successfully.",
                        type: "success"
                    })
                    const reRender = !refresh;
                    setrefresh(reRender);
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
    const onCreate = () => {
        history.push("/admin/venues/create");
    };
    const onView = id => {
        history.push(`/admin/venues/view/${id}`);
    };

    const columns = col(onView, onDelete);
    const venue = {
        create: "Create Venue",
        id: "venue ID",
        name: "Name"
    }
    let adminDashboard;
    if (role === "Admin") {
        adminDashboard =  <div id="form" className="col-md-12 col-xs-12">
            <Switch>
                <Route  exact path="/admin/venues">

                    <ReactTable
                        data={venueData}
                        columns={columns}
                        onCreate={onCreate}
                        source ={venue}
                        type = "venue"
                    />
                </Route>
                <Route  path="/admin/venues/create" render={() => < CreateVenues refresh = { () => {
                    const changeRefresh = !refresh;
                    setrefresh(changeRefresh)}}/>}/>
                <Route  path="/admin/venues/update" render={() => < UpdateVenues refresh = { () => {
                    const changeRefresh = !refresh;
                    setrefresh(changeRefresh)}}/>}/>
                <Route  path="/admin/venues/view" render={() => < ViewVenues refresh = { () => {
                    const changeRefresh = !refresh;
                    setrefresh(changeRefresh)}}/>}/>
            </Switch>
        </div>
     } else if (role === "User") {

        history.push("/venuebooking/booking")
           
       }
    return (
        <>
        {adminDashboard}
        </>


    );
}


