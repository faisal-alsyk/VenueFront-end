import React, {useState, useEffect} from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import resourceTimeline from "@fullcalendar/resource-timeline";
import interaction from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/timeline/main.css";
import "@fullcalendar/resource-timeline/main.css";
import { useDispatch } from 'react-redux';

export default function CalanderFull({eventsdata, resourcesData}) {

    const calendarComponentRef = React.createRef();
    

    const [ calendarWeekends, setCalenderWeekends ] =  useState(true);
    const [ calendarEvents, setcalendarEvents ] = useState();
    const [ resources, setResources ] = useState();


    console.log("tester tester",resourcesData);
    
    // useEffect( function () {
      
    //   const res = dataList["resources"];
    //   setResources(res);
    // }, [resources])
    const handleDateClick = arg => {

      console.log(arg);
        // if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
            
        //     setCalenderEvents( 
        //         calendarEvents.concat(
        //             {
        //             // creates a new array
        //             title: "New Event",
        //             start: arg.date,
        //             allDay: arg.allDay
        //             }
        //         )
        //     )
            
        // }
    };

    return (
        <>
        <FullCalendar
          defaultView= 'resourceTimelineDay'
          header= {
            {
              left: 'prev,next',
              center: 'title',
              right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
            }
          }
          editable = "true"
          schedulerLicenseKey="0239611991-fcs-1580209060"
          plugins= {[ resourceTimeline, interaction ]}
          ref = { calendarComponentRef }
          resourceLabelText= 'Rooms'
          timeZone= 'UTC'
          eventClick={handleDateClick}
         resources = {resourcesData}
          events= {eventsdata}
      />
      </>
    )

}