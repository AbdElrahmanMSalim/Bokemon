import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Factories/AuthContext";
import Main from "../Screens/Main";

export default function PrivateRoute(props) {
  const { currentUser } = useAuth();

  return currentUser ? <Main {...props} /> : <Navigate to="/login" />;
}
