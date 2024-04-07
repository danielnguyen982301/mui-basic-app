import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth.user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          backgroundLocation: location.state.backgroundLocation,
        }}
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;
