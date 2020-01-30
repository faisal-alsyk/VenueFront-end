import React, { useEffect, useState } from 'react'
import { Link, useHistory} from 'react-router-dom'


import "../../reactTable/reactTable.css"
import "../venueDashboard.css"
import CalanderFull from '../fullClender'
import { getbookingByAdmin } from '../../../../server'


export default function AdminBooking () {

    const history = useHistory();
    const [data, setData] = useState([]);

    const [eventsdata, setEventsData] = useState([]);
    const [resourcesData, setResourcesData] = useState([]);

    const [refresh, setRefresh] = useState([]);
    const role = "admin";

    useEffect(() => {

        getbookingByAdmin(role)
        .then(response => {
            setResourcesData(response.data.resources);
            setEventsData(response.data.events);
        })
        .catch(error => {
            alert(error.message);
        });

    }, [])

    useEffect(() => {

        getbookingByAdmin(role)
        .then(response => {
            setResourcesData(response.data.resources);
            setEventsData(response.data.events);
        })
        .catch(error => {
            alert(error.message);
        });

    }, [refresh])
    
    return (
        <>
            <div className = "clendar-div">
                <CalanderFull eventsdata= {eventsdata} resourcesData={resourcesData} refresh = { () => {
                    const changeRefresh = !refresh;
                    setRefresh(changeRefresh)}}></CalanderFull>
            </div>
        </>
    )
    
}