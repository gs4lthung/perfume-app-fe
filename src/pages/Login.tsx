import { useContext, useState } from "react";
import { TextField, Button, Typography, Box, Paper, Link } from "@mui/material";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Member } from "../interfaces/app.interface";

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  interface FormData {
    email: string;
    password: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  interface Errors {
    email?: string;
    password?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 20) {
      newErrors.password = "Password must be at most 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogin = async () => {
    try {
      if (!validate()) return;
      const response = await API.post("/auth/login", formData);
      toast.success("Login successful");
      console.log(response.data);
      const decoded = jwtDecode<JwtPayload & Member>(
        response.data.access_token
      );
      authContext?.login(response.data.access_token, {
        _id: decoded.sub || "",
        email: decoded.email,
        isAdmin: decoded.isAdmin,
        avatar: decoded.avatar,
        name: decoded.name,
        yob: decoded.yob,
        gender: decoded.gender,
        password: "***",
      });
      setTimeout(() => {
        navigate(-1);
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
          Login
        </Typography>

        {/* Email Input */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
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
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
        />

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Links */}
        <Box mt={1}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/register" variant="body2">
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
