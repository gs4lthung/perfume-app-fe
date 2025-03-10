import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        textAlign: "center",
        p: 3,
        mt: 4,
      }}
    >
      {/* Navigation Links */}
      <Box sx={{ mb: 2 }}>
        <Link href="#" color="inherit" sx={{ mx: 2 }}>
          About Us
        </Link>
        <Link href="#" color="inherit" sx={{ mx: 2 }}>
          Contact
        </Link>
        <Link href="#" color="inherit" sx={{ mx: 2 }}>
          Privacy Policy
        </Link>
      </Box>

      {/* Social Media Icons */}
      <Box sx={{ mb: 2 }}>
        <IconButton href="#" color="inherit">
          <FacebookIcon />
        </IconButton>
        <IconButton href="#" color="inherit">
          <TwitterIcon />
        </IconButton>
        <IconButton href="#" color="inherit">
          <InstagramIcon />
        </IconButton>
      </Box>

      {/* Copyright */}
      <Typography variant="body2">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </Typography>
    </Box>
  );
}
