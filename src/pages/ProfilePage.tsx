import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Badge,
  Select,
  MenuItem,
} from "@mui/material";
import { Member } from "../interfaces/app.interface";
import AuthContext from "../contexts/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Member | null>({
    _id: authContext?.user?._id || "",
    name: authContext?.user?.name || "",
    email: authContext?.user?.email || "",
    yob: authContext?.user?.yob || 0,
    avatar: authContext?.user?.avatar || "",
    gender: authContext?.user?.gender || true,
    isAdmin: authContext?.user?.isAdmin || false,
    password: "",
  });

  useEffect(() => {
    setFormData({
      _id: authContext?.user?._id || "",
      name: authContext?.user?.name || "",
      email: authContext?.user?.email || "",
      yob: authContext?.user?.yob || 0,
      avatar: authContext?.user?.avatar || "",
      gender: authContext?.user?.gender || true,
      isAdmin: authContext?.user?.isAdmin || false,
      password: "",
    });
  }, [authContext?.user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    const response = await API.patch(`/member/${authContext?.user?._id}`, {
      name: formData?.name,
      email: formData?.email,
      yob: formData?.yob,
      avatar: formData?.avatar,
      gender: formData?.gender,
    });
    authContext?.setUser(response.data);
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = () => {
    console.log("Change password");
  };

  const handleDelete = () => {
    console.log("Delete account");
    setOpenDeleteDialog(false);
  };

  const handleCancle = () => {
    setIsEditing(false);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 5, p: 3 }}>
      <Card sx={{ textAlign: "center", p: 3, boxShadow: 3, borderRadius: 3 }}>
        <Avatar
          src={authContext?.user?.avatar}
          alt={authContext?.user?.name}
          sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
        />
        <CardContent sx={{ flexDirection: "column", display: "flex", gap: 1 }}>
          {isEditing ? (
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formData?.name}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="h5" fontWeight="bold">
              {authContext?.user?.name}
            </Typography>
          )}
          {!isEditing && (
            <center>
              <Badge
                color={authContext?.user?.isAdmin ? "error" : "primary"}
                badgeContent={authContext?.user?.isAdmin ? "Admin" : "Member"}
              ></Badge>
            </center>
          )}

          {isEditing ? (
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formData?.email}
            />
          ) : (
            <Typography color="textSecondary">
              {authContext?.user?.email}
            </Typography>
          )}

          {isEditing ? (
            <TextField
              fullWidth
              name="yob"
              label="Year of Birth"
              value={formData?.yob}
            />
          ) : (
            <Typography>Year of Birth: {authContext?.user?.yob}</Typography>
          )}

          {isEditing ? (
            <Select name="gender" value={formData?.gender}>
              <MenuItem value={true}>Male</MenuItem>
              <MenuItem value={false}>Female</MenuItem>
            </Select>
          ) : (
            <Typography>
              Gender: {authContext?.user?.gender ? "♂️" : "♀️"}
            </Typography>
          )}

          {isEditing && (
            <TextField
              fullWidth
              name="avatar"
              label="Avatar URL"
              value={formData?.avatar}
              onChange={handleChange}
            />
          )}

          <Box mt={3} display="flex" justifyContent="space-between">
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancle}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
