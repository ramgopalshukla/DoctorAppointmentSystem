import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";

import moment from "moment";
import { showLoading, hideLoading } from "./Redux/features/alertSlice";

const BookingPage = () => {
  const [doctor, setdoctor] = useState([]);

  const[date, setDate]= useState();
  const[time, settime]= useState();
  const[isAvailable, setisAvailable]= useState(false);
  const params = useParams();
  const dispatch= useDispatch();
  // const doctors= useSelector((state)=> state.doctors)


  const {user}= useSelector((state)=> state.user);
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
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
    
    // eslint-disabled-next-line

  }, []);


//  booking function

const handlebooking= async()=>{

   try{



   if(!date && !time){
      return alert("Date and time required")
   }
    dispatch(showLoading())
    const res= axios.post('/api/v1/user//book-appointment', {
      doctorId: params.doctorId,
      userId: user._id,
      doctorInfo:doctor,
      userInfo: user,
      date: date,
      time:time
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    dispatch(hideLoading());

    if(res.success){
      message.success(res.data.message);
    }
   }  catch(error){
        dispatch(hideLoading())
        console.log(error)
   }


}

const handleAvailability = async()=>{
try{

    dispatch(showLoading());

    const res= await axios.post('/api/v1/user/booking-availibility', {
      doctorId: params.doctorId, date, time
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   
    dispatch(hideLoading())

    if(res.data.success){
   

      message.success(res.data.message)
    }

  } catch(error){
    dispatch(hideLoading())
    console.log(error)
  }
}


  return (

    <Layout>
      <h1>AppointmentBooking Page</h1>

      <div className="container">
        {doctor && (
          <div>
          <h4>Dr. {doctor.firstName} {doctor.lastName}  </h4>
          <h4>Fees {doctor.feesPerCunsaltation}</h4>
          {/* <h4>Timing {doctor.timing[0]}- {doctor.timing[1]}</h4> */}

          <div className="d-flex flex-column w-50">

            <DatePicker format="DD-MM-YYYY" onChange={(value)=>{ 
              setisAvailable(false);
              setDate(moment(value).format("DD-MM-YYYY"))}}/>
    <TimePicker format="HH:mm" className="m-2" onChange={(value)=> { 
    
      settime(
      moment(value).format("HH:mm"),
    

    )}} />
    <button className="btn btn-primary mt-2" onClick={()=>handleAvailability()}>Check Availability</button>
    <button className="btn btn-dark mt-2" onClick={()=> handlebooking()}>Book now</button>
          </div>
          
          </div>
        )}
      </div>
    </Layout>

  );
};

export default BookingPage;
