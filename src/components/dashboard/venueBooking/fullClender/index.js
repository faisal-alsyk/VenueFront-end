import React, {useState, useEffect} from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { useDispatch } from 'react-redux';

export default function CalanderFull() {

    const calendarComponentRef = React.createRef();

    const [ calendarWeekends, setCalenderWeekends ] =  useState(true);
    const [ calendarEvents, setcalendarEvents ] = useState([{ title: "Event Now", start: new Date() }]);

    useEffect( function () {
    //  calendarComponentRef.current.getApi().setOption('height', 500); 
    }, [])
    const handleDateClick = arg => {
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

            defaultView="dayGridMonth"
            header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins ={ [dayGridPlugin, timeGridPlugin, interactionPlugin] }
          //  ref = { calendarComponentRef }
            weekends = { calendarWeekends }
            events = { calendarEvents }
            dateClick = { event => handleDateClick(event) }
      />
      </>
    )

}