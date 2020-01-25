import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../components/LoginHeader/header";
import Sidebar from "./Sidebar";
import DashBardContent from "../DashboardContent";
//import CreateUser from "./users/CreateUser";

import "./adminDashboard.css"
import Users from "./users";
export default function AdminDashboard() {
   
    return (
      <>
          <Header></Header>
         
            <div className="col-sm-12">
              <div className="col-md-12 head-div">
              <h3>Administration</h3>
              <hr></hr>
              </div>
              <div className="col-md-3 col-lg-2 col-sm-3 col-xs-4">
                <Sidebar></Sidebar>
                </div>
              <div className="col-md-9 col-lg-10 col-sm-9 col-xs-8">
                   
                    <DashBardContent>
                      <Switch>
                        <Route  path="/dashboard1/admin" render={() => <Users />} />
                      </Switch>
                    </DashBardContent>
              </div>
          </div>
        
  
      </>
    );
  }
  