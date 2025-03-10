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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const perfumes = [
    {
      id: 1,
      name: "Oud Royal",
      brand: "Armani Privé",
      targetAudience: "Unisex",
      concentration: "Extrait",
      image:
        "https://images.pexels.com/photos/1961791/pexels-photo-1961791.jpeg?cs=srgb&dl=pexels-valeriya-1961791.jpg&fm=jpg",
    },
    {
      id: 2,
      name: "Bleu de Chanel",
      brand: "Chanel",
      targetAudience: "Men",
      concentration: "Eau de Parfum",
      image:
        "https://carltonlondon.co.in/cdn/shop/files/2_cbbb36aa-4b9a-4d05-8945-0bbcebdaf7a0.jpg?v=1705483116",
    },
    {
      id: 3,
      name: "La Vie Est Belle",
      brand: "Lancôme",
      targetAudience: "Women",
      concentration: "Extrait",
      image: "https://m.media-amazon.com/images/I/614+6kcDXOL.jpg",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter perfumes based on search and category
  const filteredPerfumes = perfumes.filter((perfume) => {
    return (
      perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? perfume.targetAudience === selectedCategory : true)
    );
  });

  const handleCreatePerfume = () => {
    alert("Redirecting to create perfume page..."); // Replace with navigation logic
  };

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
          image={perfume.image}
          alt={perfume.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {perfume.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {perfume.brand}
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

      {/* Search & Category Filter */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        {/* Search Input */}
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Dropdown */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Unisex">Unisex</MenuItem>
            <MenuItem value="Men">Men</MenuItem>
            <MenuItem value="Women">Women</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Perfume Collection Grid */}
      <Grid container spacing={3} justifyContent="center">
        {filteredPerfumes.length > 0 ? (
          filteredPerfumes.map((perfume) => (
            <Grid item key={perfume.id}>
              <PerfumeCard perfume={perfume} />
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
