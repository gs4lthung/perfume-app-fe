import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState();
  const [brands, setBrands] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchPerfumes = async () => {
    try {
      const response = await API.get(
        `/perfume?query=${searchQuery}&filter=${selectedCategory}`
      );
      setPerfumes(response.data);
    } catch (error) {
      console.error("Error fetching perfumes:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await API.get("/brand");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchPerfumes();
    fetchBrands();
  }, [searchQuery, selectedCategory]);

  const PerfumeCard = ({ perfume }) => {
    return (
      <Card
        sx={{
          minWidth: 300,
          height: "100%",
          borderRadius: 3,
          border:
            perfume.concentration === "Extrait" ? "4px solid gold" : "none",
          boxShadow:
            perfume.concentration === "Extrait"
              ? "0 6px 15px rgba(255, 215, 0, 0.6)"
              : "0 2px 8px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.08)" },
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Extrait Badge */}
        {perfume.concentration === "Extrait" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              background: "linear-gradient(45deg, #FFD700, #FFA500)",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "0 0 10px 0",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.3)",
              zIndex: 2,
            }}
          >
            Extrait ✨
          </Box>
        )}

        <CardMedia
          component="img"
          height="220"
          image={perfume.uri}
          alt={perfume.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {perfume.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {perfume.brand.name}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="primary">
            {perfume.targetAudience}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color:
                perfume.concentration === "Extrait"
                  ? "goldenrod"
                  : "textSecondary",
              fontWeight:
                perfume.concentration === "Extrait" ? "bold" : "normal",
            }}
          >
            {perfume.concentration}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ padding: 4, position: "relative", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Perfume Collection
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Brand</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Brand"
          >
            <MenuItem value="">All Brands</MenuItem>
            {brands?.map((brand) => (
              <MenuItem key={brand._id} value={brand.name}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Perfume Collection Grid */}
      <Grid container spacing={3} justifyContent="center">
        {perfumes?.length > 0 ? (
          perfumes.map((perfume) => (
            <Grid item key={perfume.id}>
              <div onClick={() => navigate(`/perfume/${perfume._id}`)}>
                <PerfumeCard perfume={perfume} />
              </div>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No perfumes found.
          </Typography>
        )}
      </Grid>

      {/* Floating Action Button (FAB) */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          navigate("/perfume-new");
        }}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#1976D2",
          "&:hover": { backgroundColor: "#1565C0" },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
