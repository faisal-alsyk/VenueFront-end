import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory} from "react-router-dom";


import "../../reactTable/reactTable.css"
import "../venueDashboard.css"
import PrivateRoute from "../../../../components/ProtectedRoutes/privateRoute";
import CreateBooking from "../CreateBooking";
import CalanderFull from '../fullClender'
import { getbooking } from '../../../../server'
import EditBooking from '../EditBooking';


export default function AllBooking () {
    const role = localStorage.getItem("role");
    const history = useHistory();
    const [eventsdata, setEventsData] = useState([]);
    const [resourcesData, setResourcesData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    // let [filter, setFilter] = useState("All");

    const getBookingData = (filter) => {
        getbooking(filter)
                .then(response => {
                    setResourcesData(response.data.resources);
                    setEventsData(response.data.events);

                })
                .catch(error => {
                    alert(error.message);
                });
    }
    useEffect(() => {

        getbooking("")
        .then(response => {
            setResourcesData(response.data.resources);
            setEventsData(response.data.events);
        })
        .catch(error => {
            alert(error.message);
        });

    }, [refresh])

    const onCreate = () => {
        history.push("/venuebooking/booking/create");
      };

    let filters = "";
    if (role === "Admin" || role === "User") {
        filters = <div>
                    <select className="select-filter" onChange={event => {
                        // setFilter(event.target.value);
                        getBookingData(event.target.value);
                    }}>
                        <option value="All">All</option>
                        <option value="Admin">Admin</option>
                        <option value="Users">Users</option>
                        <option value="Public">Public</option>
                        <option value="mybookings">My Bookings</option>
                    </select>
                </div>
    }

        return (
           <>

                <div className="col-md-12">
                <Switch>
                <Route  exact path="/venuebooking/booking">
                    <div
                        style={{
                        width:'100%',
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex",
                        flexWrap:"wrap",
                        justifyContent: "space-between"
                        }}
                    >
                        <button
                        className ="btn-create"
                        style={{paddingBottom: "9px", height: "43px"}}
                        onClick={onCreate}
                        >
                        <svg width="25" height="18" style={{marginBottom:"5px"}} viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7.75C19.0111 7.75 18.0444 8.04325 17.2221 8.59265C16.3999 9.14206 15.759 9.92295 15.3806 10.8366C15.0022 11.7502 14.9031 12.7555 15.0961 13.7255C15.289 14.6954 15.7652 15.5863 16.4645 16.2855C17.1637 16.9848 18.0546 17.461 19.0245 17.6539C19.9945 17.8469 20.9998 17.7478 21.9134 17.3694C22.827 16.991 23.6079 16.3501 24.1573 15.5279C24.7068 14.7056 25 13.7389 25 12.75C25 11.4239 24.4732 10.1521 23.5355 9.21447C22.5979 8.27678 21.3261 7.75 20 7.75ZM20 16.5C19.2583 16.5 18.5333 16.2801 17.9166 15.868C17.2999 15.456 16.8193 14.8703 16.5355 14.1851C16.2516 13.4998 16.1774 12.7458 16.3221 12.0184C16.4667 11.291 16.8239 10.6228 17.3483 10.0983C17.8728 9.5739 18.541 9.21675 19.2684 9.07206C19.9958 8.92736 20.7498 9.00162 21.4351 9.28545C22.1203 9.56928 22.706 10.0499 23.118 10.6666C23.5301 11.2833 23.75 12.0083 23.75 12.75C23.75 13.7446 23.3549 14.6984 22.6517 15.4017C21.9484 16.1049 20.9946 16.5 20 16.5ZM22.2918 11.9168H20.8332V10.4582C20.8332 10.403 20.8113 10.35 20.7722 10.311C20.7332 10.2719 20.6802 10.25 20.625 10.25H19.375C19.3198 10.25 19.2668 10.2719 19.2278 10.311C19.1887 10.35 19.1668 10.403 19.1668 10.4582V11.9168H17.7082C17.6809 11.9168 17.6538 11.9222 17.6285 11.9326C17.6033 11.9431 17.5803 11.9584 17.561 11.9778C17.5416 11.9971 17.5263 12.0201 17.5158 12.0453C17.5054 12.0706 17.5 12.0977 17.5 12.125V13.375C17.5 13.4302 17.5219 13.4832 17.561 13.5222C17.6 13.5613 17.653 13.5832 17.7082 13.5832H19.1668V15.0418C19.1668 15.097 19.1887 15.15 19.2278 15.189C19.2668 15.2281 19.3198 15.25 19.375 15.25H20.625C20.6802 15.25 20.7332 15.2281 20.7722 15.189C20.8113 15.15 20.8332 15.097 20.8332 15.0418V13.5832H22.2918C22.347 13.5832 22.4 13.5613 22.439 13.5222C22.4781 13.4832 22.5 13.4302 22.5 13.375V12.125C22.5 12.0698 22.4781 12.0168 22.439 11.9778C22.4 11.9387 22.347 11.9168 22.2918 11.9168ZM12.5 9C13.3653 9 14.2112 8.74341 14.9306 8.26268C15.6501 7.78195 16.2108 7.09867 16.542 6.29924C16.8731 5.49981 16.9597 4.62015 16.7909 3.77148C16.6221 2.92281 16.2054 2.14326 15.5936 1.53141C14.9817 0.919555 14.2022 0.502877 13.3535 0.334066C12.5049 0.165256 11.6252 0.251896 10.8258 0.583029C10.0263 0.914162 9.34305 1.47492 8.86232 2.19438C8.38159 2.91385 8.125 3.75971 8.125 4.625C8.12469 5.19962 8.23764 5.76867 8.4574 6.29961C8.67715 6.83054 8.9994 7.31296 9.40572 7.71928C9.81204 8.1256 10.2945 8.44785 10.8254 8.6676C11.3563 8.88736 11.9254 9.00031 12.5 9ZM12.5 1.5C13.1181 1.5 13.7223 1.68328 14.2362 2.02666C14.7501 2.37004 15.1506 2.8581 15.3871 3.42912C15.6236 4.00013 15.6855 4.62847 15.565 5.23466C15.4444 5.84085 15.1467 6.39767 14.7097 6.83471C14.2727 7.27175 13.7158 7.56938 13.1097 7.68996C12.5035 7.81053 11.8751 7.74865 11.3041 7.51213C10.7331 7.2756 10.245 6.87506 9.90166 6.36116C9.55828 5.84725 9.375 5.24307 9.375 4.625C9.37614 3.79655 9.70574 3.00235 10.2915 2.41655C10.8774 1.83074 11.6715 1.50114 12.5 1.5ZM3.75 7.75C4.36807 7.75 4.97225 7.56672 5.48616 7.22334C6.00006 6.87996 6.4006 6.39191 6.63712 5.82089C6.87365 5.24987 6.93553 4.62153 6.81495 4.01534C6.69438 3.40915 6.39675 2.85233 5.95971 2.41529C5.52267 1.97825 4.96585 1.68063 4.35966 1.56005C3.75347 1.43947 3.12513 1.50135 2.55411 1.73788C1.9831 1.9744 1.49504 2.37494 1.15166 2.88884C0.808278 3.40275 0.625 4.00693 0.625 4.625C0.625 5.4538 0.95424 6.24866 1.54029 6.83471C2.12634 7.42076 2.9212 7.75 3.75 7.75ZM3.75 2.75C4.12084 2.75 4.48335 2.85997 4.79169 3.066C5.10004 3.27202 5.34036 3.56486 5.48227 3.90747C5.62419 4.25008 5.66132 4.62708 5.58897 4.9908C5.51663 5.35451 5.33805 5.6886 5.07583 5.95083C4.8136 6.21305 4.47951 6.39163 4.11579 6.46397C3.75208 6.53632 3.37508 6.49919 3.03247 6.35728C2.68986 6.21536 2.39702 5.97504 2.19099 5.6667C1.98497 5.35835 1.875 4.99584 1.875 4.625C1.875 4.12772 2.07254 3.65081 2.42417 3.29918C2.77581 2.94755 3.25272 2.75 3.75 2.75ZM15.0316 16.5H6.875C6.70924 16.5 6.55027 16.4342 6.43306 16.3169C6.31585 16.1997 6.25 16.0408 6.25 15.875V14.125C6.24925 13.4795 6.44102 12.8484 6.80078 12.3125C7.33984 11.5117 8.30078 11.0313 9.36719 11.0313C10.4336 11.0313 10.8203 11.5 12.5 11.5C12.9769 11.5053 13.4529 11.4573 13.9191 11.357C14.0375 10.8616 14.2169 10.3829 14.4531 9.93164C13.9113 10.0688 13.4332 10.25 12.5 10.25C11 10.25 10.6758 9.78125 9.37109 9.78125C7.95312 9.78125 6.57422 10.4141 5.76562 11.6133C5.26506 12.3552 4.99838 13.2301 5 14.125V15.875C5 16.3723 5.19754 16.8492 5.54917 17.2008C5.90081 17.5525 6.37772 17.75 6.875 17.75H16.2891C15.813 17.3948 15.3896 16.974 15.0316 16.5ZM6.13672 9.50391C5.66462 9.1779 5.10497 9.00224 4.53125 9H2.96875C1.33203 9 0 10.4023 0 12.125C0 12.2908 0.065848 12.4497 0.183058 12.5669C0.300269 12.6842 0.45924 12.75 0.625 12.75C0.79076 12.75 0.949732 12.6842 1.06694 12.5669C1.18415 12.4497 1.25 12.2908 1.25 12.125C1.25 11.0898 2.02344 10.25 2.96875 10.25H4.53125C4.74231 10.2509 4.95098 10.2947 5.14453 10.3789C5.43829 10.0478 5.7715 9.75397 6.13672 9.50391Z" fill="white"/>
                        </svg>

                        <span className="btn-text">Create Booking</span>
                        </button>
                        {filters}
                    </div>
                    <div className = "clendar-div">
                     <CalanderFull eventsdata= {eventsdata} resourcesData={resourcesData} refresh = { () => {
                    const changeRefresh = !refresh;
                    setRefresh(changeRefresh)}}></CalanderFull>
                    </div>

                </Route>
                <Route path="/venuebooking/booking/create" render={() => <CreateBooking  refresh = { () => {
                    const changeRefresh = !refresh;
                    setRefresh(changeRefresh)}}/>}
                />
                <Route path="/venuebooking/booking/update" render={() => role === "User" || role === "Admin" ? <EditBooking  refresh = { () => {
                    const changeRefresh = !refresh;
                    setRefresh(changeRefresh)}}/>: `${history.push("/venuebooking/booking/")}` }
                 />



                </Switch>


                </div>

           </>
        )

}
