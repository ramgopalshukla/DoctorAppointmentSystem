import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { Table } from "antd";

const Appointments = () => {
  const [appointment, setAppointment] = useState([]);

  const getAppointment = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAppointment(res.data.data);
        console.log(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },

    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   rendor: (text, record) => {
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>;
    //   },
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   rendor: (text, record) => {
    //     <span>{record.doctorId.phone} </span>;
    //   },
    // },

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
  ];
  return (
    <Layout>
      <h1>Appointments</h1>

      <Table columns={columns} dataSource={appointment}/>
    </Layout>
  );
};

export default Appointments;
