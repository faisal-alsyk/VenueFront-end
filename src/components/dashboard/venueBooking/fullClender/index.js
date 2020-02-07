import React, {useState, useEffect} from 'react'

import { Modal, Row, Col, notification, Popconfirm } from 'antd';

import FullCalendar from '@fullcalendar/react'
import resourceTimeline from "@fullcalendar/resource-timeline";
import interaction from "@fullcalendar/interaction";
import classname from "classname"
import "@fullcalendar/core/main.css";
import "@fullcalendar/timeline/main.css";
import "@fullcalendar/resource-timeline/main.css";
import moment from 'moment';
import "./fullCalander.css"
import { useHistory } from 'react-router-dom';
import { deleteBooking, getbookingbyId, deletePublicBooking} from '../../../../server';

const popNotification = (data) => {
  notification[data.type]({
      message: data.title,
      description: data.description,
      duration: 100
  });
};
export default function CalanderFull({eventsdata, resourcesData, refresh}) {
  const role = localStorage.getItem("role");
  const tokenId = localStorage.getItem("roleId");

    const history = useHistory();
    const calendarComponentRef = React.createRef();
    const [modalVisible, SetModalVisible] = useState(false);
    const [deleteModalVisible, SetDeleteModalVisible] = useState(false);

    const [bookingData, setBookingData ] = useState({});
   const [venueUser, setVenueUser ] = useState({});
   const [email, setEmail ] = useState("");
   const [err, setErr] = useState();

    const  setModal = (modal) =>{
      SetModalVisible({ modal });

    }

    useEffect( function () {
      refresh();
          calendarComponentRef.current.getApi().setOption('height', 600);
         }, [])

    const eventDetail = data => {
      getbookingbyId(data.event.id)
      .then(response => {

        const venueUser = response.data.data.user;
         console.log("user detail", venueUser)
         setVenueUser(venueUser)
         const startMoment = moment(data.event.start);
         const startDate =startMoment.format('YYYY-MM-DD HH:mm:ss')
          const endMoment =moment(data.event.end);
          const endDate =endMoment.format('YYYY-MM-DD HH:mm:ss')
          console.log("user detail", venueUser)

          SetModalVisible(true);

          const booking = {
            title: data.event.title,
            id: data.event.id,
            start: `${startDate}`,
            end:`${endDate}`,
            name: venueUser.name?venueUser.name:"",
            email:venueUser.email?venueUser.email:"",
            role: venueUser.role?venueUser.role:"",
            number:venueUser.phoneNumber?venueUser.phoneNumber:""
          }

          setBookingData(booking);
      })
      .catch(error => {
    });



    }

    const deleteModal = (event) => {
      event.preventDefault();

      SetDeleteModalVisible(true);


    }

    const onPublicDelete = event => {
      event.preventDefault();

      const payload = {
        email: email
      }
      deletePublicBooking(bookingData.id, payload)
            .then(response =>{
                if(response.data.status === "Deleted!"){
                    popNotification({
                        title: response.data.status,
                        description: "Booking Deleted Successfully.",
                        type: "success"
                    })
                    refresh();
                    SetModalVisible(false);
                    SetDeleteModalVisible(false);

                }
                else{
                    // popNotification({
                    //     title: "Try Again",
                    //     description: response.data.message,
                    //     type: "warning"
                    // })
                    
                    setErr(response.data.email);
                }

            })
          .catch(error=>{
              popNotification({
                  title: 'Error',
                  description: error.message,
                  type: "error"
              })
              SetModalVisible(false);
              SetDeleteModalVisible(false);
          })

    }

    const  onEdit = () => {
      history.push(`/venuebooking/booking/update`, {bookingData});
     }

     const onDelete = () => {
        deleteBooking(bookingData.id)
            .then(response =>{
                if(response.data.status === "Deleted!"){
                    popNotification({
                        title: response.data.status,
                        description: "Booking Deleted Successfully.",
                        type: "success"
                    })
                    refresh();
                    SetModalVisible(false);
                }
                else{
                    popNotification({
                        title: "Try Again",
                        description: response.data.message,
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

    let deleteBtn ;
    let editBtn;
    let userDetail ;

    if(role === "User") {

      if(venueUser._id === tokenId) {

        deleteBtn =
        <Popconfirm
        title="Are you sure delete this event?"
        onConfirm={event => {
          onDelete();
      }}
        okText="Yes"
        cancelText="No"
    >
        <button   className="btn-delete pull-right" style={{marginTop:"unset",float:"right", marginRight:"unset"}}>
        <b>
        <svg className="btn-delete-svg" width="16" height="16" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
        </svg>

            </b> Delete Event</button>
            </Popconfirm>;

      editBtn =  <a><svg width="20" height="20" className="pull-right" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon" onClick={event => {
        onEdit();
   }}>
       <path d="M12.4928 4.00608L17.9937 9.50694L6.04881 21.4518L1.14436 21.9932C0.487796 22.0659 -0.0669308 21.5107 0.00611607 20.8541L0.551819 15.9462L12.4928 4.00608ZM21.396 3.1871L18.8131 0.604248C18.0074 -0.201416 16.7008 -0.201416 15.8951 0.604248L13.4652 3.03413L18.9661 8.53499L21.396 6.10511C22.2016 5.29901 22.2016 3.99276 21.396 3.1871Z" fill="#005404"/>


   </svg></a>
          userDetail = <>
              <Col  md={4}>
                  <span className="modal-span">Name</span>
              </Col>
              <Col  md={20}>
                  <p className="modal-p">{venueUser && venueUser.name ? venueUser.name : "Public User"}</p>
              </Col>
              <Col  md={4}>
                  <span className="modal-span">Email </span>
              </Col>
              <Col  md={20}>
                  <p className="modal-p">{venueUser ? venueUser.email : "Email is not found"}</p>
              </Col>
              <Col  md={4}>
                  <span className="modal-span">Role </span>
              </Col>
              <Col  md={20}>
                  <p className="modal-p">{venueUser?venueUser.role:"Role is not found"}</p>
              </Col>
              <Col  md={4}>
                  <span className="modal-span">number </span>
              </Col>
              <Col  md={20}>
                  <p className="modal-p">{venueUser?venueUser.phoneNumber:"Number is not found"}</p>
              </Col>
              <Col  md={24}> <hr></hr></Col>
          </>

      } else {
        deleteBtn = ""
        editBtn = ""
          userDetail = <>
              <Col  md={4}>
                  <span className="modal-span">Name</span>
              </Col>
              <Col  md={20}>
                  <p className="modal-p">{venueUser && venueUser.name? venueUser.name : "Public User"}</p>
              </Col>
              <Col  md={4}>
                  <span className="modal-span">Email </span>
              </Col>
              <Col  md={20}>
                  <p className="modal-p">{venueUser ? venueUser.email : "Email is not found"}</p>
              </Col>
              <Col  md={4}>
                  <span className="modal-span">Role </span>
              </Col>
              <Col  md={20}>
                  <p className="modal-p">{venueUser?venueUser.role:"Role is not found"}</p>
              </Col>
              <Col  md={4}>
                  <span className="modal-span">number </span>
              </Col>
              <Col  md={20}>
                  <p className="modal-p">{venueUser?venueUser.phoneNumber:"Number is not found"}</p>
              </Col>
              <Col  md={24}> <hr></hr></Col>
          </>
      }
    } else if(role === "Admin") {


      deleteBtn =
      <Popconfirm
      title="Are you sure delete this event?"
      onConfirm={event => {
        onDelete();
    }}
      okText="Yes"
      cancelText="No"
  >
      <button  className="btn-delete pull-right" style={{marginTop:"unset",float:"right", marginRight:"unset"}}>
      <b>
      <svg className="btn-delete-svg" width="16" height="16" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
      </svg>

          </b> Delete Event</button>
          </Popconfirm>;


editBtn =  <a><svg width="20" height="20" className="pull-right" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon" onClick={event => {
  onEdit();
}}>
 <path d="M12.4928 4.00608L17.9937 9.50694L6.04881 21.4518L1.14436 21.9932C0.487796 22.0659 -0.0669308 21.5107 0.00611607 20.8541L0.551819 15.9462L12.4928 4.00608ZM21.396 3.1871L18.8131 0.604248C18.0074 -0.201416 16.7008 -0.201416 15.8951 0.604248L13.4652 3.03413L18.9661 8.53499L21.396 6.10511C22.2016 5.29901 22.2016 3.99276 21.396 3.1871Z" fill="#005404"/>


</svg></a>;
        userDetail = <>
            <Col  md={4}>
                <span className="modal-span">Name</span>
            </Col>
            <Col  md={20}>
                <p className="modal-p">{venueUser && venueUser.name? venueUser.name : "Public User"}</p>
            </Col>
            <Col  md={4}>
                <span className="modal-span">Email </span>
            </Col>
            <Col  md={20}>
                <p className="modal-p">{venueUser ? venueUser.email : "Email is not found"}</p>
            </Col>
            <Col  md={4}>
                <span className="modal-span">Role </span>
            </Col>
            <Col  md={20}>
                <p className="modal-p">{venueUser?venueUser.role:"Role is not found"}</p>
            </Col>
            <Col  md={4}>
                <span className="modal-span">number </span>
            </Col>
            <Col  md={20}>
                <p className="modal-p">{venueUser?venueUser.phoneNumber:"Number is not found"}</p>
            </Col>
            <Col  md={24}> <hr></hr></Col>
        </>

    } else {


      deleteBtn =
      <button  className="btn-delete pull-right"
      style={{marginTop:"unset",float:"right", marginRight:"unset"}}
      onClick = {(event) => deleteModal(event)}
      >
      <b>
      <svg className="btn-delete-svg" width="16" height="16" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5001 7.17969 17.5001 5C17.5001 2.23828 15.2618 0 12.5001 0C9.87898 0 7.75398 2.02344 7.54304 4.58594L1.77741 0.132812C1.50398 -0.078125 1.11335 -0.03125 0.898508 0.242188L0.132883 1.22656C-0.0780546 1.5 -0.0311796 1.89062 0.242258 2.10156L23.2266 19.8633C23.5001 20.0742 23.8907 20.0273 24.1055 19.7539L24.8712 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75007 16.5V18.125C3.75007 19.1602 4.58991 20 5.62507 20H19.3048L8.10163 11.3398C5.63288 11.7695 3.75007 13.9062 3.75007 16.5Z" fill="white"/>
      </svg>

          </b> Delete Event</button>
      editBtn = "";
        userDetail = "";



    }
    if (role !== "Admin" || role !=="User") {
    }
    else {

    }

    return (
        <>
        <FullCalendar
          defaultView= 'resourceTimelineDay'
          header= {
            {
              left: 'prev,next',
              center: 'title',
              right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
            }
          }
          editable = "true"
          schedulerLicenseKey="0239611991-fcs-1580209060"
          plugins= {[ resourceTimeline, interaction ]}
          resourceLabelText= 'Rooms'
          ref = { calendarComponentRef }
          eventClick={eventDetail}
         resources = {resourcesData}
          events= {eventsdata}
      />
       <Modal
          title=""
          centered
          visible={deleteModalVisible}
          onOk={() => {
            setEmail(" ");
            setErr("");
             SetDeleteModalVisible(false)}}
          onCancel={() =>  {
            setEmail(" ");
            setErr("");  
            SetDeleteModalVisible(false)}}
        >
         <Row>
         <form onSubmit = {(event) => {
           onPublicDelete(event)
           }}>

         <div className="form-group row">
                    <div className="col-md-4 col-xs-4">
                    <label className="">Email</label>
                    </div>
                    <div className="col-md-8 col-xs-8">
                    <input style = {{marginTop:"20px"}}
                        type="email"
                        className={classname("form-control", {
                            "is-invalid": err
                            })}
                        onChange={event => {
                            setEmail(event.target.value);
                         }}
                         required
                    />
                    {err && <div className="invalid-feedback">{err}</div>}


                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-4 col-xs-4"></div>
                    <div className="col-md-8 col-xs-8">
                    <button  type="submit" style={{marginTop:"unset"}} className="button button-large" >Delete</button>

                    </div>
                    </div>
         </form>
          </Row>

      </Modal>

      <Modal
          title={bookingData.title}
          centered
          visible={modalVisible}
          onOk={() => SetModalVisible(false)}
          onCancel={() =>SetModalVisible(false)}
        >
          <Row>
            <Col md={24} style={{marginTop:"24px"}}>

           {deleteBtn}

            </Col>

              {userDetail}
            <Col  md={4}>
              <span className="modal-span">Start Date: </span>
            </Col>
            <Col  md={20}>
            <p className="modal-p">{bookingData.start}</p>
            </Col>
            <Col  md={4}>
              <span className="modal-span">End Date: </span>
            </Col>
            <Col  md={20}>
            <p className="modal-p">{bookingData.end}</p>
            </Col>
            <Col md={24}>
            {editBtn}

            </Col>

          </Row>

      </Modal>


      </>
    )

}
