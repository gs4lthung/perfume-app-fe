import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Brand } from "../interfaces/app.interface";
import API from "../services/api";
import toast from "react-hot-toast";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreatePerfume() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    concentration: "",
    ingredients: "",
    volume: 0,
    targetAudience: "",
    uri: "",
  });

  const fetchBrands = async () => {
    try {
      const response = await API.get("/brand");
      console.log(response.data);
      setBrands(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (authContext?.user?.isAdmin === false) {
      navigate("/");
    }
    fetchBrands();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.brand ||
      !formData.description ||
      !formData.price ||
      !formData.concentration ||
      !formData.ingredients ||
      !formData.volume ||
      !formData.targetAudience ||
      !formData.uri
    ) {
      toast.error("All fields are required");
      return;
    }

    formData.price = Number(formData.price);
    formData.volume = Number(formData.volume);
    await API.post("/perfume", formData);
    toast.success("Create perfume successfully");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 5, mx: "auto", maxWidth: 800 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Perfume
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              size="small"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="brand-label">Brand</InputLabel>
            <Select
              fullWidth
              labelId="brand-label"
              defaultValue={""}
              value={formData.brand}
              name="brand"
              onChange={handleSelectChange}
              label="Brand"
              size="small"
              required
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
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              value={formData.description}
              name="description"
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Price $"
              variant="outlined"
              size="small"
              type="number"
              value={formData.price}
              name="price"
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="concentration-label">Concentration</InputLabel>
            <Select
              fullWidth
              label="Concentration"
              labelId="concentration-label"
              defaultValue={""}
              variant="outlined"
              size="small"
              name="concentration"
              onChange={handleSelectChange}
              value={formData.concentration}
              required
            >
              <MenuItem value="EDT">EDT</MenuItem>
              <MenuItem value="EDP">EDP</MenuItem>
              <MenuItem value="EDC">EDC</MenuItem>
              <MenuItem value="Parfum">Parfum</MenuItem>
              <MenuItem value="Extrait">Extrait</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Ingredients"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              value={formData.ingredients}
              name="ingredients"
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Volume (ml)"
              variant="outlined"
              size="small"
              type="number"
              value={formData.volume}
              name="volume"
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="target-audience-label">Target Audience</InputLabel>
            <Select
              fullWidth
              label="Target Audience"
              labelId="target-audience-label"
              defaultValue={""}
              variant="outlined"
              size="small"
              name="targetAudience"
              onChange={handleSelectChange}
              value={formData.targetAudience}
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Unisex">Unisex</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              size="small"
              value={formData.uri}
              name="uri"
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box component={"img"} src={formData.uri} sx={{ width: "50%" }} />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
