import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  Skeleton,
} from "@mui/material";

const PerfumeDetail = ({ userRole }) => {
  // Mock perfume data
  const [perfume, setPerfume] = useState({
    id: 1,
    name: "Oud Royal",
    image:
      "https://images.pexels.com/photos/1961791/pexels-photo-1961791.jpeg?cs=srgb&dl=pexels-valeriya-1961791.jpg&fm=jpg",
    price: 250,
    concentration: "Extrait",
    description:
      "A luxurious blend of oud and floral notes, perfect for any occasion. A luxurious blend of oud and floral notes, perfect for any occasion. A luxurious blend of oud and floral notes, perfect for any occasion. A luxurious blend of oud and floral notes, perfect for any occasion.",
    ingredients: "Oud, Rose, Amber, Musk",
    volume: 100,
    targetAudience: "Unisex",
    brand: "Armani Privé",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(perfume);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tempImage, setTempImage] = useState(perfume.image);

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      if (e.target.value === "") {
        setTempImage(perfume.image);
      } else setTempImage(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save the updated perfume information
  const handleSave = () => {
    setPerfume(formData);
    setIsEditing(false);
  };

  // Delete confirmation
  const handleDelete = () => {
    alert("Perfume deleted successfully!");
    setOpenDeleteDialog(false);
    // Add deletion logic (e.g., API call)
  };

  const currentUser = {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/50", // Placeholder avatar image
  };

  interface Comment {
    author: string;
    avatar: string;
    text: string;
    date: string;
  }

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        author: currentUser.name,
        avatar: currentUser.avatar,
        text: newComment,
        date: new Date().toLocaleString(), // Format: "3/5/2025, 10:30 AM"
      };

      setComments([...comments, newCommentObj]);
      setNewComment(""); // Clear input field after submitting
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 1000, margin: "auto", mt: 4, p: 3 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on larger screens
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            borderRadius: 3,
            position: "relative",
          }}
        >
          {/* Extrait Badge */}
          {perfume.concentration === "Extrait" && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                background: "linear-gradient(45deg, #FFD700, #FFA500)",
                color: "black",
                fontWeight: "bold",
                textTransform: "uppercase",
                padding: "6px 12px",
                fontSize: "14px",
                borderRadius: "5px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.3)",
                zIndex: 2,
              }}
            >
              Extrait ✨
            </Box>
          )}

          {/* Image Section */}
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", md: 300 }, // Full width on small screens, fixed width on larger
              height: "auto",
              objectFit: "cover",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: { md: 12 },
            }}
            loading="lazy"
            image={tempImage}
            alt={perfume.name}
          />
          {/* Content Section */}
          <CardContent sx={{ flex: 1 }}>
            {isEditing ? (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Price $"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  >
                    <MenuItem value="Armani Privé">Armani Privé</MenuItem>
                    <MenuItem value="Tom Ford">Tom Ford</MenuItem>
                    <MenuItem value="Creed">Creed</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Concentration"
                    name="concentration"
                    value={formData.concentration}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Volume (ml)"
                    name="volume"
                    type="number"
                    value={formData.volume}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Target Audience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Unisex">Unisex</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="space-between"
                >
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
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <>
                {/* User View */}
                <Typography variant="h4" fontWeight="bold">
                  {perfume.name}
                </Typography>
                <Typography variant="h6" color="green">
                  $ {perfume.price}
                </Typography>
                <Typography variant="h6">
                  <strong>Brand:</strong> {perfume.brand}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Concentration:</strong> {perfume.concentration}
                </Typography>
                <Typography variant="body2" mt={2}>
                  {perfume.description}
                </Typography>
                <Typography variant="body2" mt={2}>
                  <strong>Ingredients:</strong> {perfume.ingredients}
                </Typography>
                <Typography variant="body2">
                  <strong>Volume:</strong> {perfume.volume} ml
                </Typography>
                <Typography variant="body2">
                  <strong>Target Audience:</strong> {perfume.targetAudience}{" "}
                  {perfume.targetAudience === "Unisex"
                    ? "👫"
                    : perfume.targetAudience === "Male"
                    ? "👨"
                    : "👩"}
                </Typography>

                {/* Admin Actions */}
                {userRole === "admin" && (
                  <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </>
            )}
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
              Are you sure you want to delete this perfume? This action cannot
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold">
          Comments
        </Typography>

        {/* Comment Input */}
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <TextField
            fullWidth
            label="Write a comment..."
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
          >
            Submit
          </Button>
        </Box>

        {/* Comment List */}
        <List sx={{ mt: 2 }}>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Box key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={comment.avatar} alt={comment.author} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight="bold">
                        {comment.author}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          {comment.date}
                        </Typography>
                        <Typography variant="body1">{comment.text}</Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No comments yet. Be the first to share your thoughts!
            </Typography>
          )}
        </List>
      </Box>
    </>
  );
};

export default PerfumeDetail;
