import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Brand } from "../interfaces/app.interface";
import API from "../services/api";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PerfumeBrandsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [open, setOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>({
    _id: "",
    name: "",
  });

  useEffect(() => {
    if (!authContext?.user?.isAdmin) {
      navigate("/");
    }
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const response = await API.get("/brand");
    setBrands(response.data);
  };

  const createBrand = async (brand: Brand) => {
    const response = await API.post("/brand", {
      name: brand.name,
    });
    setBrands([...brands, response.data]);
  };

  const updateBrand = async (brand: Brand) => {
    const response = await API.patch(`/brand/${brand._id}`, {
      name: brand.name,
    });
    setBrands(brands.map((b) => (b._id === brand._id ? response.data : b)));
  };

  const deleteBrand = async (brand: Brand) => {
    await API.delete(`/brand/${brand._id}`);
    setBrands(brands.filter((b) => b._id !== brand._id));
  };

  const handleOpen = (brand = { _id: "", name: "" }) => {
    setCurrentBrand(brand);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Perfume Brands</h1>
      <div className="w-1/2 flex justify-end mb-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add New Brand
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ width: "50%", margin: "0 auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand, index) => (
              <TableRow key={brand._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    style={{ marginRight: 8 }}
                    onClick={() => handleOpen(brand)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteBrand(brand)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentBrand && currentBrand._id ? "Edit Brand" : "Add New Brand"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Brand Name"
            fullWidth
            value={currentBrand ? currentBrand.name : ""}
            onChange={(e) =>
              setCurrentBrand({
                ...currentBrand,
                name: e.target.value,
                _id: currentBrand?._id || "",
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (currentBrand && currentBrand._id) updateBrand(currentBrand);
              else if (currentBrand) createBrand(currentBrand);
              handleClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PerfumeBrandsPage;
