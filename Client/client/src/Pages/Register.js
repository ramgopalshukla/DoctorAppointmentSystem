import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "./Redux/features/alertSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles/register.css";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishhadler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("register Succesfully!");
        navigate("/login");
      } else {
        console.log("some thiung went wrong");
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishhadler}
          className="register-form"
        >
          <h3 className="text-center">Register Form</h3>

          <Form.Item label="Name" name="name">
            <Input type="text" required></Input>
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required></Input>
          </Form.Item>

          <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
}
