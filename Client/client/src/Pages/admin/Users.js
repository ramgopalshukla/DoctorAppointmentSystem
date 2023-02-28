import React from "react";
import Layout from "../../Components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const[data, setdata] = useState([]);

  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    try {
      const users = await  axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (users.data.success){
        setdata(users.data.data);
      } 

    } catch (error) {
      console.log(error);
    }
  };


  // antDtable column

  const columns= [
    {
      title:"Name",
      dataIndex:'name'
    },
    {
      title:'Email',
      dataIndex:'email'
    }, {
      title:"Doctor",
      dataIndex: "isDoctor",
      render: (text, record)=> <span>{record.isDoctor ? "Yes": "No"}</span>
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record)=>(
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      )
    }
  ]

  return (
    <>
      <Layout>
        <h1>Users List</h1>
        <Table columns={columns} dataSource={data}/>
      </Layout>
    </>
  );
};

export default Users;
