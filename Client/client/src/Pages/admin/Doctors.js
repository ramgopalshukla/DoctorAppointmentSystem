import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { Table, message } from "antd";
export default function Doctors() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getdoctors();
  }, []);

  const getdoctors = async () => {
    try {
      const users = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (users.data.success) {
        setdata(users.data.data);
      }
  
    } catch (error) {
    console.log(error)
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // antDtable column

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName}, {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <Layout>
        <h1>Doctors List</h1>
        <Table columns={columns} dataSource={data} />
      </Layout>
    </>
  );
}
