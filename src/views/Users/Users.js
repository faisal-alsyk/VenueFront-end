import React, {useState} from "react";
import Pagination from "react-js-pagination"

import './users.css';
import ViewUser from './ViewUsers';
import CreateUser from './CreateUser';
import EditUsers from './EditUsers';

const usersView = function UsersView() {
    const dummyUserData = [
        {
            _id: "12345",
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
            _id: "12346",
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
            _id: "12345",
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
            _id: "12346",
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
            _id: "12345",
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
            _id: "12346",
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
            _id: "12345",
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
            _id: "12346",
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
            _id: "12345",
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
            _id: "12346",
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
    let [userData, setuserData] = useState( dummyUserData );

    function ListUser(props) {
        return (
            <div>
                <div className="row" onClick={()=> alert(props._id) }>
                    <div className="col-md-3 table-index-1">
                        {props._id}
                    </div>
                    <div className="col-md-2 table-index-2">
                        {props.staffId}
                    </div>
                    <div className="col-md-3 table-index-3">
                        {props.name}
                    </div>
                    <div className="col-md-2 table-index-4">
                        {props.status}
                    </div>
                    <div className="col-md-2 table-index-5">
                        <button>View</button>
                        <button>delete</button>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }

    return (
        <div>
            <div className="show-user-list">
                <div className="row">
                    <div className="col-md-4">
                        <button className="button button-small"
                            onClick={()=> <CreateUser/>}
                        >Create User</button>
                    </div>
                    <div className="col-md-8">
                        <select className="input select select-short">
                            <option>Staff ID</option>
                            <option>Name</option>
                        </select>
                        <input className="input input-medium-2" type="search"/>
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="row">
                        <div className="col-md-3 table-index-1">
                            #ID
                        </div>
                        <div className="col-md-2 table-index-2">
                            Staff ID
                        </div>
                        <div className="col-md-3 table-index-3">
                            Name
                        </div>
                        <div className="col-md-2 table-index-4">
                            Status
                        </div>
                        <div className="col-md-2 table-index-5"></div>
                    </div>
                    <hr/>
                </div>
                <div className="user-list">
                    { userData.map((user, i) => {
                        // eslint-disable-next-line no-unused-expressions
                        return <ListUser data= {userData} key={i} name={user.name} _id={user._id} staffId={user.staffId} status={user.status}/>
                    })}
                </div>
            </div>
        </div>
    );
}

export default usersView;
