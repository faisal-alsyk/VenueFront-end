import React from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../components/LoginHeader/header";
import Sidebar from "./Sidebar";
import DashBardContent from "../DashboardContent";
//import CreateUser from "./users/CreateUser";

import "./adminDashboard.css"
import Users from "./users";
import Venues from "./venues";
export default function AdminDashboard() {
  const history =  useHistory();

    return (
      <>
          <Header></Header>

            <div className="col-sm-12">
              <div className="col-md-12 head-div">
              <h3 style={{width:"auto"}}>Administration</h3>
              <button className="btn-back" style={{marginLeft:"10px", marginTop: "34px"}} onClick={event => {
                        history.goBack();
                    }} > <svg className="btn-back-svg" width="10" height="14"  viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.07874 6.46949L7.15218 0.396367C7.44499 0.103555 7.91999 0.103555 8.2128 0.396367L8.92124 1.1048C9.21374 1.3973 9.21405 1.87105 8.92249 2.16418L4.10905 6.9998L8.92218 11.8357C9.21405 12.1289 9.21343 12.6026 8.92093 12.8951L8.21249 13.6036C7.91968 13.8964 7.44468 13.8964 7.15187 13.6036L1.07874 7.53012C0.785928 7.2373 0.785928 6.7623 1.07874 6.46949Z" fill="white"/>
                    </svg>
                    Back
               </button>
              <hr></hr>
              </div>
              <div className="col-md-3 col-lg-2 col-sm-3 col-xs-4">
                <Sidebar></Sidebar>
                </div>
              <div className="col-md-9 col-lg-10 col-sm-9 col-xs-8">

                    <DashBardContent>
                      <Switch>
                        <Route path="/admin/users" render={() => <Users />} />
                        <Route path="/admin/venues" render={() => <Venues/>} />
                      </Switch>
                    </DashBardContent>
              </div>
          </div>


      </>
    );
  }
