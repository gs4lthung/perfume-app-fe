import { useState } from "react";
import { TextField, Button, Typography, Box, Paper, Link } from "@mui/material";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    await API.post("/member", formData);
    toast.success("Registration successful!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Register
        </Typography>

        {/* Full Name Input */}
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />

        {/* Email Input */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />

        {/* Password Input */}
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />

        {/* Confirm Password Input */}
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />

        {/* Register Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        {/* Login Link */}
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="#" variant="body2">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
