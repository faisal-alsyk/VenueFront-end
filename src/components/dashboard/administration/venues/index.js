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
        duration: 8
    });
}

export default function Users() {
    const history = useHistory();
    let [venueData, setVenueData] = useState( [] );
    useEffect(()=>{
        VenueList()
            .then(response => {
                setVenueData(response.data.data);
            })
            .catch(error => {
                alert(error.message);
            });
    },[]);
    const onDelete = id => {
        DeleteVenue(id)
            .then(response =>{
                if(response.data.status === "Deleted!"){
                    popNotification({
                        title: response.data.status,
                        description: "Venue Deleted Successfully.",
                        type: "success"
                    })
                    history.push('/admin/venues');
                    window.location.reload();
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
                    description: error.message,
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
    return (

        <div id="form">
            <Switch>
                <Route  exact path="/admin/venues">
                    
                    <ReactTable
                        data={venueData}
                        columns={columns}
                        onCreate={onCreate}
                        source ={venue}
                    />
                </Route>
                <Route  path="/admin/venues/create" render={() => < CreateVenues />}/>
                <Route  path="/admin/venues/update" render={() => < UpdateVenues />}/>
                <Route  path="/admin/venues/view" render={() => < ViewVenues />}/>
            </Switch>
        </div>

    );
}


