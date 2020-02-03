import React from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";

import {Row, Col } from 'antd';

import Header from "../../../components/LoginHeader/header";
import Sidebar from "./VenueSidebar";
import DashBardContent from "../DashboardContent";
//import CreateUser from "./users/CreateUser";

import "../administration/adminDashboard.css"
import AllBooking from "./viewAllBooking";
import AdminBooking from "./viewAdminBooking";
import PriorityBooking from "./viewPriorityBooking/PriorityBooking";
import BulkBooking from "./bulkBooking";
import VenueHeader from "../../LoginHeader/VenueHeader";
// import Users from "./users";
// import Venues from "./venues";
export default function VenueDashboard() {
  const history = useHistory();

    return (
      <>
          <Row>
            <div className="show-header">
              <Header></Header>
            </div>
            <div className="show-v-header">
              <VenueHeader></VenueHeader>
            </div>

            
              <div className="col-md-12 head-div" style={{width:"auto"}}>
             
              <h3 style={{width:"auto"}}>Venue Booking</h3>
              
              {/* <button className="btn-back" style={{marginLeft:"10px", marginTop: "34px"}} onClick={event => {
                        history.goBack();
                    }} > <svg className="btn-back-svg" width="10" height="14"  viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.07874 6.46949L7.15218 0.396367C7.44499 0.103555 7.91999 0.103555 8.2128 0.396367L8.92124 1.1048C9.21374 1.3973 9.21405 1.87105 8.92249 2.16418L4.10905 6.9998L8.92218 11.8357C9.21405 12.1289 9.21343 12.6026 8.92093 12.8951L8.21249 13.6036C7.91968 13.8964 7.44468 13.8964 7.15187 13.6036L1.07874 7.53012C0.785928 7.2373 0.785928 6.7623 1.07874 6.46949Z" fill="white"/>
                    </svg>
                    Back
               </button> */}
               
              <hr></hr>
              </div>
              <div className="col-md-12">
              <Col lg={4} className="show-header">
                <Sidebar></Sidebar>
                </Col>
                <Col lg={20}>

                    <DashBardContent>
                      <Switch>
                        <Route path="/venuebooking/booking" render={() => <AllBooking/>} />
                        <Route path="/venuebooking/admin" render={() => <AdminBooking/>} />
                        <Route path="/venuebooking/priority" render={() => <PriorityBooking/>} />
                        <Route path="/venuebooking/bulk" render={() => <BulkBooking/>} />
                      </Switch>
                    </DashBardContent>
              </Col>
              </div>
          </Row>


      </>
    );
  }
