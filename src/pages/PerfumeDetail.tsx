import React, { useContext, useEffect, useState } from "react";
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
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  Rating,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { Brand, Comment, Perfume } from "../interfaces/app.interface";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";

const PerfumeDetail = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment | null>(null);
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Perfume | null>(perfume);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tempImage, setTempImage] = useState(perfume?.uri);

  const fetchPerfume = async () => {
    try {
      const response = await API.get(`/perfume/${id}`);
      if (!response.data) {
        navigate("/");
      }
      setPerfume(response.data);
      setFormData(response.data);
      setTempImage(response.data?.uri);
    } catch (error) {
      console.error("Error fetching perfume:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await API.get("/brand");
      setBrands(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    const response = await API.get(`/comment/perfume/${id}`);
    console.log(response.data);
    setComments(response.data);
  };
  useEffect(() => {
    fetchPerfume();
    fetchBrands();
    fetchComments();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "uri") {
      if (e.target.value === "") {
        setTempImage(perfume?.uri);
      } else setTempImage(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const brand = brands.find((brand) => brand._id === event.target.value);
    setFormData({ ...formData, brand });
  };

  // Save the updated perfume information
  const handleSave = async () => {
    await API.patch(`/perfume/${id}`, {
      ...formData,
      volume: parseInt(formData?.volume),
      price: parseInt(formData?.price),
      brand: formData?.brand._id,
    });
    toast.success("Perfume updated successfully!");
    setPerfume(formData);
    setIsEditing(false);
  };

  // Delete confirmation
  const handleDelete = async () => {
    await API.delete(`/perfume/${id}`);
    toast.success("Perfume deleted successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
    setOpenDeleteDialog(false);
  };

  const handleAddComment = async () => {
    if (!authContext?.user) {
      toast.error("Please login to add a comment");
      return;
    }
    if (newComment?.content) {
      await API.post("/comment", {
        content: newComment?.content,
        rating: Number(newComment?.rating),
        perfumeId: id,
        authorId: authContext?.user?._id,
      });
      toast.success("Comment added successfully!");
      fetchComments();
    }
  };
  return (
    <>
      <Box sx={{ maxWidth: 1000, margin: "auto", mt: 4, p: 3 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            borderRadius: 3,
            position: "relative",
          }}
        >
          {/* Extrait Badge */}
          {perfume?.concentration === "Extrait" && (
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
              width: { xs: "100%", md: 300 },
              height: "auto",
              objectFit: "cover",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: { md: 12 },
            }}
            loading="lazy"
            src={tempImage}
            alt={perfume?.name}
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
                    value={formData?.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Price $"
                    name="price"
                    type="number"
                    value={formData?.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="brand-label">Brand</InputLabel>
                    <Select
                      name="brand"
                      labelId="brand-label"
                      value={formData?.brand._id ?? ""} // Ensuring it's never undefined
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="" disabled>
                        Select Brand
                      </MenuItem>
                      {brands.map((brand) => (
                        <MenuItem key={brand._id} value={brand._id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="concentration-label">
                      Concentration
                    </InputLabel>
                    <Select
                      labelId="concentration-label"
                      value={formData?.concentration}
                      name="concentration"
                      onChange={handleChange}
                    >
                      <MenuItem value="EDP">EDP</MenuItem>
                      <MenuItem value="EDC">EDC</MenuItem>
                      <MenuItem value="EDT">EDT</MenuItem>
                      <MenuItem value="Parfum">Parfum</MenuItem>
                      <MenuItem value="Extrait">Extrait</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    value={formData?.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ingredients"
                    name="ingredients"
                    value={formData?.ingredients}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Volume (ml)"
                    name="volume"
                    type="number"
                    value={formData?.volume}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Target Audience"
                    name="targetAudience"
                    value={formData?.targetAudience}
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
                    name="uri"
                    value={formData?.uri}
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
                  {perfume?.name}
                </Typography>
                <Typography variant="h6" color="green">
                  $ {perfume?.price}
                </Typography>
                <Typography variant="h6">
                  <strong>Brand:</strong> {perfume?.brand?.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Concentration:</strong> {perfume?.concentration}
                </Typography>
                <Typography variant="body2" mt={2}>
                  {perfume?.description}
                </Typography>
                <Typography variant="body2" mt={2}>
                  <strong>Ingredients:</strong> {perfume?.ingredients}
                </Typography>
                <Typography variant="body2">
                  <strong>Volume:</strong> {perfume?.volume} ml
                </Typography>
                <Typography variant="body2">
                  <strong>Target Audience:</strong> {perfume?.targetAudience}{" "}
                  {perfume?.targetAudience === "Unisex"
                    ? "👫"
                    : perfume?.targetAudience === "Male"
                    ? "👨"
                    : "👩"}
                </Typography>

                {/* Admin Actions */}
                {authContext?.user?.isAdmin && (
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

        {!authContext?.user?.isAdmin &&
          !comments.some(
            (comment) => comment.author._id === authContext?.user?._id
          ) && (
            <>
              <Box display="flex" alignItems="center" gap={2} mt={2}>
                <TextField
                  fullWidth
                  label="Write a comment..."
                  variant="outlined"
                  value={newComment?.content || ""}
                  onChange={(e) =>
                    setNewComment({ ...newComment, content: e.target.value })
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                >
                  Submit
                </Button>
              </Box>
              <Rating
                name="rating"
                max={3}
                value={newComment?.rating || 0}
                onChange={(e) => {
                  console.log(e.target.value);
                  setNewComment({ ...newComment, rating: e.target.value });
                }}
              />
            </>
          )}

        {/* Comment List */}
        <List
          sx={{
            mt: 2,
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Box key={comment._id || index} sx={{ p: 2 }}>
                <ListItem
                  alignItems="flex-start"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={comment.author?.avatar}
                      alt={comment.author?.name}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight="bold">
                        {authContext?.user?._id === comment.author._id ? (
                          <Typography
                            variant="subtitle2"
                            color="primary"
                            fontWeight="bold"
                          >
                            You
                          </Typography>
                        ) : (
                          comment.author?.name
                        )}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                          {comment.content}
                        </Typography>
                        <Rating
                          max={3}
                          name="read-only"
                          value={comment.rating}
                          readOnly
                          sx={{ mt: 1 }}
                        />
                      </>
                    }
                  />
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ p: 2, textAlign: "center" }}
            >
              No comments yet. Be the first to share your thoughts!
            </Typography>
          )}
        </List>
      </Box>
    </>
  );
};

export default PerfumeDetail;
