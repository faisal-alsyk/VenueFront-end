import React, { useState } from "react";
import {Row, Col, notification} from "antd";
import CsvParse from '@vtex/react-csv-parse';
import { AddCsv } from "../../../../server"
import { useHistory } from "react-router-dom";

const popNotification = (data) => {
    notification[data.type]({
        message: data.title,
        description: data.description,
        duration: 2
    });
};

export default function  BulkBooking () {
    const history = useHistory();
    const [ csvData, setCsvData ] =useState([]);
    const [ active, setActive ] =useState(true);
    const [err, setErr] = useState();
    const [clashMsg, setClashMsg] = useState();
   const  handleData = data => {
        setCsvData(data);
      }

      const  handleError = data => {
          
      }
    
    const keys = [
    "title",
    "venueName",
    "startDate",
    "startTime",
    "endDate",
    "endTime",
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
                    if (response.data.clashMessages) {
                        setClashMsg(response.data.clashMessages);
                    }
                }
                else{
                  
                    setErr(response.data.message);
                    setClashMsg(response.data.clashMessages);
                }

            })
            .catch(error=>{
                popNotification({
                    title: 'Error',
                    description: "Could not upload file. Please Try Again.",
                    type: "error"
                })

            })

        

    }

let clashError = "";

if(clashMsg) {
    clashError = clashMsg.map((msg, index) => <li key= {index}>{msg}</li>
    )

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
                        render={onChange => <input type="file" onChange={onChange} accept=".csv" />}
                    />
                    {err && <div style={{color:"red"}}>{err}</div>}
                    
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
                {clashMsg && <div style={{color:"red"}}><ul>{clashError}</ul></div>}
                </Col>

            </Row>
        </>
    )
}