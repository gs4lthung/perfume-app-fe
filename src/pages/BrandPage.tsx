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
import toast from "react-hot-toast";

const PerfumeBrandsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [open, setOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>({
    _id: "",
    name: "",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);

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
    toast.success("Brand created successfully");
    setBrands([...brands, response.data]);
  };

  const updateBrand = async (brand: Brand) => {
    const response = await API.patch(`/brand/${brand._id}`, {
      name: brand.name,
    });
    toast.success("Brand updated successfully");
    setBrands(brands.map((b) => (b._id === brand._id ? response.data : b)));
  };

  const handleDeleteConfirm = (brand: Brand) => {
    setBrandToDelete(brand);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!brandToDelete) return;

    await API.delete(`/brand/${brandToDelete._id}`);
    setBrands(brands.filter((b) => b._id !== brandToDelete._id));

    setDeleteDialogOpen(false);
    setBrandToDelete(null);
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
                    onClick={() => handleDeleteConfirm(brand)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create / Edit Dialog */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>{brandToDelete?.name}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PerfumeBrandsPage;
