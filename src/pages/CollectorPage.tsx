import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const CollectorPage = () => {
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    yearOfBirth: number;
    gender: string;
    isDeleted: boolean;
  }
  
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulating fetching users from an API
    setUsers([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "******",
        yearOfBirth: 1990,
        gender: "Male",
        isDeleted: false,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        password: "******",
        yearOfBirth: 1995,
        gender: "Female",
        isDeleted: false,
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        password: "******",
        yearOfBirth: 1988,
        gender: "Male",
        isDeleted: true,
      },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Collector Page - User List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Year of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Is Deleted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.yearOfBirth}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.isDeleted ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: 8 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    Delete
                  </Button>
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
