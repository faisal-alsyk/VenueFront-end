import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import {Row, Col } from 'antd';

import Header from "../../../components/LoginHeader/header";
import Sidebar from "./VenueSidebar";
import DashBardContent from "../DashboardContent";
//import CreateUser from "./users/CreateUser";

import "../administration/adminDashboard.css"
import AllBooking from "./viewAllBooking";
import AdminBooking from "./viewAdminBooking";
import PriorityBooking from "./viewPriorityBooking/PriorityBooking";
// import Users from "./users";
// import Venues from "./venues";
export default function VenueDashboard() {

    return (
      <>
          <Row>
          <Header></Header>

            
              <div className="col-md-12 head-div">
              <h3>Venue Booking</h3>
              <hr></hr>
              </div>
              <div className="col-md-12">
              <Col lg={4} sm={8} md={8}>
                <Sidebar></Sidebar>
                </Col>
                <Col lg={20} sm={16} md={16}>

                    <DashBardContent>
                      <Switch>
                        <Route path="/venuebooking/booking" render={() => <AllBooking/>} />
                        <Route path="/venuebooking/admin" render={() => <AdminBooking/>} />
                        <Route path="/venuebooking/priority" render={() => <PriorityBooking/>} />
                        <Route path="/venuebooking/bulk" render={() => <div>testing5</div>} />
                      </Switch>
                    </DashBardContent>
              </Col>
              </div>
          </Row>


      </>
    );
  }
