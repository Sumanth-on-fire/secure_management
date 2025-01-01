import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { getAllUsers, updateUserRoleStatus } from "../../api/admin";

const AdminControls = (props) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await updateUserRoleStatus({ user_id: userId, new_role: newRole });
      localStorage.setItem('role', newRole)
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError("Failed to update role.");
      console.error(err);
    }
  };

  return (
    <div>
        <div style={{width: '100%', textAlign: 'right'}}>
          <Button
            // variant="contained"
            onClick={props.handleExport}
            size="small"
            style={{background: ' #00796b', color: 'white', textTransform:'none'}}
            sx={{paddingX: '10px'}}
          >
            Export Data
          </Button>
          </div>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Username</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Phone Number</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  style={{fontSize: '12px'}}
                  size="small"
                  disabled={user.email === localStorage.getItem('email')}
                >
                  <MenuItem style={{fontSize:'12px'}} value="User">User</MenuItem>
                  <MenuItem style={{fontSize:'12px'}} value="Admin">Admin</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminControls;
