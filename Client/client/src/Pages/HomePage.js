import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function HomePage() {
  // useEffect(() => {
  //   getUserData();
  // }, []);
  // const getUserData = async () => {
  //   try {
  //     const res = await axios.post(
  //       "/api/v1/user/getUserData",
  //       {},
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
}
