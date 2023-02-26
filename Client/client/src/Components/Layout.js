import React from "react";
import "../Pages/styles/Layoutstyles.css";
import { userMenu, adminMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";
export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => {
    return state.user;
  });

  console.log(user?.notification.length);
  //  Logout functio

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Succesfully");
    navigate("/login");
  };
  //  rendoring menu list

  // doctor menu ===============

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },

    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctors/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor? doctorMenu: userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path; // for changing class with diffrent pages
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notifications");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
