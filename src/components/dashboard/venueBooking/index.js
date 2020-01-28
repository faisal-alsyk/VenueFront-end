import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../components/LoginHeader/header";
import Sidebar from "./VenueSidebar";
import DashBardContent from "../DashboardContent";
//import CreateUser from "./users/CreateUser";

import "../administration/adminDashboard.css"
import AllBooking from "./viewAllBooking";
import CreateBooking from "./fullClender/CreateBooking";
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
              <div className="col-md-3 col-lg-2 col-sm-3 col-xs-4">
                <Sidebar></Sidebar>
                </div>
              <div className="col-md-9 col-lg-10 col-sm-9 col-xs-8">

                    <DashBardContent>
                      <Switch>
                        <Route exact path="/venuebooking" render={() => <AllBooking/>} />
                        <Route path="/venuebooking/create" render={() => <CreateBooking/>} />
                        <Route path="/venuebooking/priority" render={() => <div>testing3</div>} />
                        <Route path="/venuebooking/add" render={() => <div>testing4</div>} />
                        <Route path="/venuebooking/bulk" render={() => <div>testing5</div>} />
                      </Switch>
                    </DashBardContent>
              </div>
          </div>


      </>
    );
  }
