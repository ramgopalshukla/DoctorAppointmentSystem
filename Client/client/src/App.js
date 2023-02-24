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

function App() {
  const { loading } = useSelector((state) => {
    return state.alerts;
  });

  console.log(loading);

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
                <NotificationPage/>
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
