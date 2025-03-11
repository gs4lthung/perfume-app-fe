import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          LuxePerfume
        </Typography>

        {/* Centered Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
          {authContext?.user?.isAdmin && (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/brands");
                }}
              >
                Brands
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/collectors");
                }}
              >
                Collectors
              </Button>
            </>
          )}
        </Box>

        {/* Register & Login Buttons (Right Side) */}
        {authContext?.user ? (
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </Button>
            <Button color="inherit" onClick={authContext?.logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
