import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Pages/Redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../Pages/Redux/features/userSlice";

export default function Proctectedroute({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  console.log(user);

 useEffect(() => {
    getUser();
  }, []);
  // getuser
  const getUser = async () => {
    try {
       dispatch(showLoading)
            const res = await axios.post(
              "/api/v1/user/getUserData",
              {},
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
          
      dispatch(hideLoading());
      console.log(res);
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };



  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
