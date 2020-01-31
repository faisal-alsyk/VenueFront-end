import React, { useState } from "react";
import {Row, Col, notification} from "antd";
import CsvParse from '@vtex/react-csv-parse';
import { AddCsv } from "../../../../server"

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 8
    });
};

export default function  BulkBooking () {

    const [ csvData, setCsvData ] =useState([]);
    const [ active, setActive ] =useState(false);
   const  handleData = data => {
        setCsvData(data);
        setActive(true);
        console.log(data);
      }

      const  handleError = data => {
          
          console.log(data);
      }
    
    const keys = [
    "title",
    "venueId",
    "start",
    "end",
    "purpose",
    ]

    const UploadData = () => {

        AddCsv(csvData)
            .then(response =>{
                if(response.data.status === "Success"){
                    popNotification({
                        title: response.data.status,
                        description: "File upload successfully.",
                        type: "success"
                    })
                   
                }
                else{
                    popNotification({
                        title: "Try Again",
                        description: "Could not upload file. Please Try Again.",
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
    return (
        <>
            <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Col md={18} sm={18} xs={24} style={{background:"#ffff"}}>
                <Col md={8} sm={8} xs ={24}>
                    <h3 style={{textAlign:"center"}}>Booking File</h3>
                </Col>
                <Col md={16} sm={16} xs={24} >
                    <CsvParse
                        keys={keys}
                        onDataUploaded={handleData}
                        onError={handleError}
                        render={onChange => <input type="file" onChange={onChange} />}
                    />
                </Col>
                <Col md={8} sm={8} xs ={24}>
                </Col>
                <Col md={16} sm={16} xs ={24} >
                {
                    active ? 
                    <button type="button" className="btn btn-success btn-lg"
                     onClick = { UploadData } style={{marginLeft:"1rem", marginTop:"1rem"}}>Upload</button>
                    :
                    <button type="button" className="btn btn-success btn-lg" disabled
                    onClick = { UploadData } style={{marginLeft:"1rem", marginTop:"1rem"}}>Upload</button>
                    }
                </Col>

                </Col>

            </Row>
        </>
    )
}