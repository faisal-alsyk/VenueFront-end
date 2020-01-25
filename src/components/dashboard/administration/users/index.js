import React  from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "antd";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import ReactTable from "../../reactTable";
//import FieldList from "./FieldList";
//import Form from "../Form";
import col from "./colums";
import CreateUser from "./CreateUser";
//import { deleteType } from "../../../actions/typeActions";
export default function Users() {
 const history = useHistory();
  const dummyUserData = [
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa hamza ",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa hamza ",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa hamza ",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghulam Mustafa",
        staffId: "123",
        status: "Active",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    },
    {
        _id: "507f191e810c19729de860ea",
        name: "Mr. Ghafoor Ahmad",
        staffId: "124",
        status: "Pending",
        countryCode: "+65",
        phoneNumber: "123456789",
        createdAt: "21 Jan 2020",
        email: "mgm@xyz.com",
        department: "Security",
        role: "Staff"
    }
];
  //const [currentId, setCurrentId] = useState();
  const onCreate = () => {
    history.push("/dashboard1/admin/create");
  };
  const onEdit = id => {
    //setCurrentId(id);
    //let type = types.filter(u => u._id === id)[0];

   // history.push("/dashboard/types/update", { type });
  };
  const onDelete = id => {
    //mainDispatch(deleteType(id));
  };
   const columns = col(onEdit, onDelete);
  return (

        <div id="form">
        <Switch>
        <Route  exact path="/dashboard1/admin/">
        <ReactTable
                    data={dummyUserData}
                    columns={columns}
                    onCreate={onCreate}
        />
        </Route>
        <Route  path="/dashboard1/admin/create" render={() => < CreateUser />}>

        </Route>
        </Switch>
        </div>

  );
}


