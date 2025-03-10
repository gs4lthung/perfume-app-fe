import React, { useContext, useState } from "react";
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
  Chip,
  Badge,
  Select,
  MenuItem,
} from "@mui/material";
import { Member } from "../interfaces/app.interface";
import AuthContext from "../contexts/AuthContext";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Member | null>(null);

  const genderOptions = [
    { label: "Male", value: true },
    { label: "Female", value: false },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated data:", formData);
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
              value={authContext?.user?.name}
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
              value={authContext?.user?.email}
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
              value={authContext?.user?.yob}
            />
          ) : (
            <Typography>Year of Birth: {authContext?.user?.yob}</Typography>
          )}

          {isEditing ? (
            <Select
              name="gender"
              value={authContext?.user?.gender ?? ""}
              disabled // Prevent user from changing it
            >
              {genderOptions.map((option) => (
                <MenuItem
                  key={option.value.toString()}
                  value={option.value.toString()}
                >
                  {option.label}
                </MenuItem>
              ))}
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
              value={authContext?.user?.avatar}
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
