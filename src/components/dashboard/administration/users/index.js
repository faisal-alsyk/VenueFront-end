import React, {useState, useEffect} from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "antd";
import { Link, Route, Switch, useHistory} from "react-router-dom";
import ReactTable from "../../reactTable";
//import FieldList from "./FieldList";
//import Form from "../Form";
import col from "./colums";
import CreateUser from "./CreateUser";
import UpdateUser from "./EditUsers";
import ViewUser from "./ViewUsers";
import { UserList, DeleteUser } from "../../../../server.js";
import { useContext } from "react";
//import { deleteType } from "../../../actions/typeActions";
export default function Users() {
 const history = useHistory();
    let [userData, setuserData] = useState( [] );
    let [refresh, setrefresh] = useState(true);
    useEffect(()=>{
        UserList()
            .then(response => {
                setuserData(response.data.data);
            })
            .catch(error => {
                alert(error.message);
            });
    },[]);

useEffect(function() {
    UserList()
    .then(response => {
        setuserData(response.data.data);
    })
    .catch(error => {
        alert(error.message);
    });
  }, [refresh]);
    const onDelete = id => {
        DeleteUser(id)
            .then(response => {
                alert(`User with Name: ${response.data.data.staffId}  is Deleted.`);
            })
            .catch(error =>{
                alert(error.message);
            })
    }
  const onCreate = () => {
    history.push("/admin/users/create");
  };
  const onView = id => {
   history.push(`/admin/users/view/${id}`);
  };
   const columns = col(onView, onDelete);
   const user = {
       create: "Create User",
       id: "Staff ID",
       name: "Name"
   }
  return (

        <div id="form">
        <Switch>
        <Route  exact path="/admin/users">
        <ReactTable
                    data={userData}
                    columns={columns}
                    onCreate={onCreate}
                    source = {user}
        />
        </Route>
        <Route  path="/admin/users/create" render={() => < CreateUser/>}/>
        <Route  path="/admin/users/update" render={() => < UpdateUser />}/>
        <Route  path="/admin/users/view" render={() => < ViewUser />}/>
        </Switch>
        </div>

  );
}


