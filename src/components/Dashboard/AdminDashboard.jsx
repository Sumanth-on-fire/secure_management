import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllUsers, updateUserRoleStatus, exportLogs } from "../../api/admin";
import  LoadingSpinner  from "../Shared/LoadingSpinner";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await getAllUsers();
//         setUsers(response);
//       } catch (error) {
//         setMessage("Failed to fetch users");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await updateUserRoleStatus({ user_id: userId, new_role: newRole });
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === userId ? { ...user, role: newRole } : user
//         )
//       );
//       setMessage("User role updated successfully");
//     } catch (error) {
//       setMessage("Failed to update user role");
//       console.error(error);
//     }
//   };

//   const handleExportLogs = async () => {
//     try {
//       const result = await exportLogs();
//       window.location.href = result.file_path;
//     } catch (error) {
//       setMessage("Failed to export logs");
//       console.error(error);
//     }
//   };

//   if (loading) return <LoadingSpinner />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      {/* {message && <Typography color="error">{message}</Typography>}
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Username</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleRoleChange(
                      user.id,
                      user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                    )
                  }
                >
                  {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleExportLogs}
      >
        Export Logs
      </Button> */}
    </Box>
  );
};

export default AdminDashboard;
