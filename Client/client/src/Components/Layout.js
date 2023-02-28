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
      path: "/doctor-appointments",
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
              <h6>LIVEVAIDYA</h6>
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

              <div style={{marginRight:"30px"}}>
              <img src="https://img.freepik.com/premium-vector/doctor-profile-with-medical-service-icon_617655-48.jpg?w=2000" alt="" width="100px" />
              <img src="https://previews.123rf.com/images/fizkes/fizkes2105/fizkes210500606/168696506-thank-you-doctor-smiling-thankful-mature-sick-man-holding-young-female-medic-nurse-hand.jpg" alt="" width="150px" />
              <img src="https://previews.123rf.com/images/liudmilachernetska/liudmilachernetska2112/liudmilachernetska211201754/178464949-gynecologist-demonstrating-model-of-female-reproductive-system-to-young-woman-in-clinic.jpg" alt="" width="150px" />
              <img src="https://previews.123rf.com/images/serezniy/serezniy2101/serezniy210105526/162671057-male-patient-at-urologist-s-office.jpg" alt="" width="150px" />
              <img src="https://previews.123rf.com/images/liudmilachernetska/liudmilachernetska2112/liudmilachernetska211201754/178464949-gynecologist-demonstrating-model-of-female-reproductive-system-to-young-woman-in-clinic.jpg" alt="" width="150px" />
              <img src="https://previews.123rf.com/images/vichie81/vichie811911/vichie81191100127/136079244-asian-confidence-doctor-using-digital-tablet-expressing-health-concerns-with-old-elderly-woman.jpg" alt="" width="150px" />
              <img src="https://previews.123rf.com/images/fizkes/fizkes2012/fizkes201201914/160970111-attentive-young-caucasian-female-doctor-talk-consult-mature-male-patient-in-clinic-caring-woman-gp.jpg" alt="" width="80px" height="100px" />
              </div>
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
