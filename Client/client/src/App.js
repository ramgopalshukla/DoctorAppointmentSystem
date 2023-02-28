import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Spinner from "./Components/Spinner";
import Proctectedroute from "./Components/Proctectedroute";
import Publicrouter from "./Components/Publicrouter";
import { useSelector } from "react-redux";
import ApplyDoctor from "./Pages/ApplyDoctor";
import NotificationPage from "./Pages/NotificationPage";
import Users from "./Pages/admin/Users";
import Doctors from "./Pages/admin/Doctors";
import Profile from "./Pages/doctor/Profile";
import BookingPage from "./Pages/BookingPage";
import Appointments from "./Pages/Appointments";
import DoctorAppointment from "./Pages/doctor/DoctorAppointment";

function App() {
  const { loading } = useSelector((state) => {
    return state.alerts;
  });

 
  return (
    <>
      <BrowserRouter>
        {loading && <Spinner />}

        <Routes>
          <Route
            path="/"
            element={
              <Proctectedroute>
                <HomePage />
              </Proctectedroute>
            }
          ></Route>
          <Route
            path="/apply-doctor"
            element={
              <Proctectedroute>
                <ApplyDoctor />
              </Proctectedroute>
            }
          ></Route>
          <Route
            path="/notifications"
            element={
              <Proctectedroute>
                <NotificationPage />
              </Proctectedroute>
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              <Proctectedroute>
                <Users />
              </Proctectedroute>
            }
          ></Route>
          <Route
            path="/admin/doctors"
            element={
              <Proctectedroute>
                <Doctors />
              </Proctectedroute>
            }
          ></Route>
            <Route
            path="/doctors/profile/:id"
            element={
              <Proctectedroute>
                <Profile />
              </Proctectedroute>
            }
          ></Route>

           <Route
            path="/doctors/book-appointment/:doctorId"
            element={
              <Proctectedroute>
                <BookingPage />
              </Proctectedroute>
            }
          ></Route>

            <Route
            path="/appointments"
            element={
              <Proctectedroute>
                <Appointments/>
              </Proctectedroute>
            }
          ></Route>

          <Route
            path="/doctor-appointments"
            element={
              <Proctectedroute>
                <DoctorAppointment/>
              </Proctectedroute>
            }
          ></Route>

          <Route
            path="/login"
            element={
              <Publicrouter>
                <Login />
              </Publicrouter>
            }
          ></Route>

          <Route
            path="/register"
            element={
              <Publicrouter>
                <Register />
              </Publicrouter>
            }
          ></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
