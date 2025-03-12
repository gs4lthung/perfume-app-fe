import React, { useContext, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../services/api";
import toast from "react-hot-toast";
import AuthContext from "../contexts/AuthContext";

export default function ChangePassword() {
  const authContext = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Add logic to handle password change
    await API.put(`/member/${authContext?.user?._id}`, {
      password: currentPassword,
      newPassword: newPassword,
    });
    toast.success("Password changed successfully");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={newPassword !== confirmPassword}
            helperText={
              newPassword !== confirmPassword ? "Passwords do not match" : ""
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={newPassword !== confirmPassword}
          >
            Change Password
          </Button>
        </form>
      </Box>
    </Container>
  );
}
