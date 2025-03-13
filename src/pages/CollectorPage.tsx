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
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Member } from "../interfaces/app.interface";
import API from "../services/api";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CollectorPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState<Member[]>([]);
  const [editingUser, setEditingUser] = useState<Member | null>(null);
  const [editedUser, setEditedUser] = useState<Member | null>(null);

  const fetchMembers = async () => {
    try {
      const response = await API.get("/member");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!authContext?.user?.isAdmin) {
      navigate("/");
    }
    fetchMembers();
  }, []);

  const handleEdit = (user: Member) => {
    setEditingUser(user);
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    if (editedUser) {
      try {
        await API.patch(`/member/${editedUser._id}`, {
          name: editedUser.name,
          email: editedUser.email,
          yob: Number(editedUser.yob),
          gender: editedUser.gender,
        });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === editedUser._id ? editedUser : user
          )
        );
        setEditingUser(null);
        setEditedUser(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };
  const handleSelectChange = (e: SelectChangeEvent<boolean>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Collector Page - User List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Year of Birth</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editingUser?._id === user._id ? (
                    <TextField
                      name="name"
                      value={editedUser?.name || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editingUser?._id === user._id ? (
                    <TextField
                      name="email"
                      value={editedUser?.email || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>*****</TableCell>
                <TableCell>
                  {editingUser?._id === user._id ? (
                    <TextField
                      name="yob"
                      value={editedUser?.yob || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    user.yob
                  )}
                </TableCell>
                <TableCell>
                  {editingUser?._id === user._id ? (
                    <Select
                      name="gender"
                      value={editedUser?.gender}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value={true}>Male</MenuItem>
                      <MenuItem value={false}>Female</MenuItem>
                    </Select>
                  ) : user.gender === true ? (
                    "♂️"
                  ) : (
                    "♀️"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CollectorPage;
