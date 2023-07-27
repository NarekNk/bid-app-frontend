import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Profile from "./pages/Profile/Profile";
import Jobs from "./pages/Jobs/Jobs";
import { ROUTES } from "./constants/routes";
import JobDetails from "./pages/JobDetails/JobDetails";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { setUsername } from "./features/User/userSlice";
import "./css/app.scss";

const App = () => {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageUsername = localStorage.getItem("username");

    if (localStorageUsername) {
      dispatch(setUsername(localStorageUsername));
    }
  }, [dispatch]);

  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Routes>
          {(!username || username.length === 0) && (
            <>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
            </>
          )}
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute username={username}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.JOBS}
            element={
              <ProtectedRoute username={username}>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.JOBS}/:id`}
            element={
              <ProtectedRoute username={username}>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={ROUTES.PROFILE} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
