import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, isSecurityVerified } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but security key not verified, redirect to check page
  if (!isSecurityVerified) {
    return <Navigate to="/security-check" replace />;
  }

  return children;
}
