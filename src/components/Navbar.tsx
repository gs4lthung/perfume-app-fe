import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Products", path: "/products" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          LuxePerfume
        </Typography>

        {/* Centered Navigation Links */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {navLinks.map((link) => (
            <Button key={link.title} color="inherit">
              {link.title}
            </Button>
          ))}
        </Box>

        {/* Register & Login Buttons (Right Side) */}
        {authContext?.user ? (
          <>
            <Button variant="contained" color="secondary">
              Profile
            </Button>
            <Button color="inherit" onClick={authContext?.logout}>
              Logout
            </Button>
          </>
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
