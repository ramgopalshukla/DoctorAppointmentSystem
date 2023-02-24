import React from "react";
import { Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { hideLoading, showLoading } from "./Redux/features/alertSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./styles/register.css";

export default function Login() {
  const navigate = useNavigate();
const dispatch= useDispatch();
  const onfinishhadler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        message.success("Login successfully");
        navigate("/");
      } else {
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
          <h3 className="text-center">Login Form</h3>

          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required></Input>
          </Form.Item>

          <Link to="/register" className="m-2">
            not a user register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
}
