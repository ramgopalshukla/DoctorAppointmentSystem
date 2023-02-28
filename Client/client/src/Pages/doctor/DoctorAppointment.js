import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { Table, message } from "antd";

const DoctorAppointment = () => {

    const [appointment, setAppointment] = useState([]);

    const {user}= useSelector((state)=> state.user);

  const getAppointment = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

 

      if (res.data.success) {
        setAppointment(res.data.data);
     
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);


  const handleStatus= async (record, status)=>{

    try{

        const res= await  axios.post('/api/v1/doctor/update-status', {appointmentsId: record._id, status}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

     if(res.data.success){
        message.success(res.data.message);
        getAppointment();

     }
         
       
           
        

    } catch(error){
         console.log(error)
         message.error("Something went wrong")
    

    }

  }
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },

    

    {
      title: "Date & Time",
      dataIndex: "date",
      rendor: (text, record) => {
        <span>
          {moment(record.date).format("DD-MM-YYYY")}
         {moment(record.time).format("HH:mm")}
          
        </span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
        title: "Actions",
        dataIndex:'actions',
        render: (text, record)=>(
              <div className="d-flex">
                {record.status==="pending" && (
                    <div className="d-flex">
                        <button className="btn btn-success" onClick={()=> handleStatus(record, 'approved')}>Approved</button>
                        <button className="btn btn-danger ms-2" onClick={()=> handleStatus(record, 'reject')}>Reject</button>
                    </div>
                )}
              </div>
        )
    }
  ];
  return (
    <Layout>
    <h1>Appointments</h1>

    <Table columns={columns} dataSource={appointment}/>
  </Layout>
  )
}

export  default  DoctorAppointment;
