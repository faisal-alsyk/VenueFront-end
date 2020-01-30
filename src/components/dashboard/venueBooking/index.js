import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../components/LoginHeader/header";
import Sidebar from "./VenueSidebar";
import DashBardContent from "../DashboardContent";
//import CreateUser from "./users/CreateUser";

import "../administration/adminDashboard.css"
import AllBooking from "./viewAllBooking";
import CreateBooking from "./CreateBooking";
import AdminBooking from "./viewAdminBooking";
// import Users from "./users";
// import Venues from "./venues";
export default function VenueDashboard() {

    return (
      <>
          <Header></Header>

            <div className="col-sm-12">
              <div className="col-md-12 head-div">
              <h3>Venue Booking</h3>
              <hr></hr>
              </div>
              <div className="col-md-4 col-lg-3 col-sm-4 col-xs-12">
                <Sidebar></Sidebar>
                </div>
              <div className="col-md-8 col-lg-9 col-sm-8 col-xs-12">

                    <DashBardContent>
                      <Switch>
                        <Route exact path="/venuebooking" render={() => <AllBooking/>} />
                        <Route path="/venuebooking/create" render={() => <CreateBooking/>} />
                        <Route path="/venuebooking/admin" render={() => <AdminBooking/>} />
                        <Route path="/venuebooking/priority" render={() => <div>testing3</div>} />
                        <Route path="/venuebooking/bulk" render={() => <div>testing5</div>} />
                      </Switch>
                    </DashBardContent>
              </div>
          </div>


      </>
    );
  }
