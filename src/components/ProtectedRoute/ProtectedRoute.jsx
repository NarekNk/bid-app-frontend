import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ username, children }) => {
  if (!username || username.length === 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
