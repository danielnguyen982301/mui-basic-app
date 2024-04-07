import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

function AuthStatus() {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      flexGrow={1}
      alignItems="center"
    >
      {auth.user ? (
        <>
          <span>Welcome, {auth.user}</span>
          <Button
            className="auth-button"
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "bold",
              mx: "10px",
            }}
            variant="outlined"
            onClick={() => auth.signout(() => navigate("/"))}
          >
            Log Out
          </Button>
        </>
      ) : (
        <>
          <span>You are not logged in</span>
          <Button
            className="auth-button"
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "bold",
              mx: "10px",
            }}
            variant="outlined"
            onClick={() =>
              navigate("/login", {
                state: { backgroundLocation: location },
                replace: true,
              })
            }
          >
            Log In
          </Button>
        </>
      )}
    </Box>
  );
}

export default AuthStatus;
