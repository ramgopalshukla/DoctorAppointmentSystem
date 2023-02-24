import React from "react";
import Layout from "../Components/Layout";
import { Tabs, TabPane, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "./Redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NotificationPage() {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { user } = useSelector((state) => {
    return state.user;
  });

  console.log(user?.notification);

  const handleDeleteAllread = () => {};
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notofication",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res)

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.massage);
      }
    } catch(error) {
        dispatch(hideLoading())
      console.log(error)
      message.error("something went wrong")

    }
  };
  return (
    <>
      <Layout>
        <h4 className="p-3 text-center">Notification Page</h4>

        <Tabs>
          <Tabs.TabPane tab="unRead" key={0}>
            <div
              className="d-flex justify-content-end"
              style={{ cursor: "pointer" }}
            >
              <h4 className="p-2" onClick={handleMarkAllRead}>
                Mark All Read
              </h4>
            </div>
            {user?.notification.map((item) => {
              return (
                <div
                  className="card"
             
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-text"     onClick={()=>navigate(item.onclickPath)}>{item.message}</div>
                </div>
              );
            })}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <h4 className="p-2" onClick={handleDeleteAllread}>
                Delete All Read
              </h4>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </>
  );
}
