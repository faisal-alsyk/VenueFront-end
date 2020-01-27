import React, {useState, useEffect} from "react";
//import { useDispatch, useSelector } from "react-redux";
import {Button, notification, Table} from "antd";
import { Link, Route, Switch, useHistory} from "react-router-dom";
import ReactTable from "../../reactTable";
//import FieldList from "./FieldList";
//import Form from "../Form";
import col from "./colums";
import CreateUser from "./CreateUser";
import UpdateUser from "./EditUsers";
import ViewUser from "./ViewUsers";
import { UserList, DeleteUser } from "../../../../server.js";
//import { deleteType } from "../../../actions/typeActions";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
}

export default function Users() {
 const history = useHistory();
    let [userData, setuserData] = useState( [] );
    useEffect(()=>{
        UserList()
            .then(response => {
                setuserData(response.data.data);
            })
            .catch(error => {
                alert(error.message);
            });
    },[]);
    const onDelete = id => {
        DeleteUser(id)
            .then(response =>{
                if(response.data.status === "Deleted!"){
                    popNotification({
                        title: response.data.status,
                        description: "User Deleted Successfully.",
                        type: "success"
                    })
                    history.push('/admin/venues');
                    window.location.reload();
                }
                else{
                    popNotification({
                        title: "Try Again",
                        description: "Could not delete User. Please Try Again.",
                        type: "warning"
                    })
                }

            })
            .catch(error=>{
                popNotification({
                    title: 'Error',
                    description: error.message,
                    type: "error"
                })
            })
    }
  const onCreate = () => {
    history.push("/admin/users/create");
  };
  const onView = id => {
   history.push(`/admin/users/view/${id}`);
  };
   const columns = col(onView, onDelete);
  return (

        <div id="form">
        <Switch>
        <Route  exact path="/admin/users">
        <ReactTable
                    data={userData}
                    columns={columns}
                    onCreate={onCreate}
        />
        </Route>
        <Route  path="/admin/users/create" render={() => < CreateUser />}/>
        <Route  path="/admin/users/update" render={() => < UpdateUser />}/>
        <Route  path="/admin/users/view" render={() => < ViewUser />}/>
        </Switch>
        </div>

  );
}


