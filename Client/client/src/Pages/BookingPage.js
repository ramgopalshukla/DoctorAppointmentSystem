import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const [doctor, setdoctor] = useState([]);
  const { doctorId } = useParams();
  // const doctors= useSelector((state)=> state.doctors)

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setdoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>Appointments</h1>
    </Layout>
  );
};

export default BookingPage;
