import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Divider,
  Paper,
  TableContainer,
  IconButton,
  Collapse,
  Select,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as XLSX from "xlsx";
import { getAllUsers, updateUserRoleStatus } from "../../api/admin";
import { getUserActivityLogsByEmail } from "../../api/activityLogs";

const UserLogsViewer = () => {
  const [users, setUsers] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logsData, setLogsData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleRowToggle = async (user) => {
    const userId = user.id;
    setOpenRows((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    if (!logsData[userId]) {
      setLoadingLogs(true);
      try {
        const logs = await getUserActivityLogsByEmail(user.email);
        setLogsData((prev) => ({ ...prev, [userId]: logs }));
      } catch (err) {
        console.error("Failed to fetch logs:", err);
        setLogsData((prev) => ({ ...prev, [userId]: [] }));
      } finally {
        setLoadingLogs(false);
      }
    }
  };

  const exportToExcel = async () => {
    const flattenedData = [];
    setLoadingLogs(true); 
  
    for (const user of users) {
      try {
        const logs = await getUserActivityLogsByEmail(user.email); 
        if (logs.length > 0) {
          logs.forEach((log) => {
            flattenedData.push({
              Username: user.username,
              Email: user.email,
              PhoneNumber: user.phone ? `+91 ${user.phone}` : "NA",
              Role: user.role,
              Action: log.action,
              IPAddress: log.ip_address,
              Timestamp: log.timestamp,
            });
          });
        } else {
          flattenedData.push({
            Username: user.username,
            Email: user.email,
            PhoneNumber: user.phone ? `+91 ${user.phone}` : "NA",
            Role: user.role,
            Action: "No logs available",
            IPAddress: "",
            Timestamp: "",
          });
        }
      } catch (err) {
        console.error(`Failed to fetch logs for ${user.email}:`, err);
      }
    }
  
    setLoadingLogs(false);
  

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Logs");
  
    const wscols = [
      { wch: 15 }, 
      { wch: 25 }, 
      { wch: 15 }, 
      { wch: 10 }, 
      { wch: 20 }, 
      { wch: 20 }, 
      { wch: 25 }, 
    ];
    worksheet["!cols"] = wscols;
    XLSX.writeFile(workbook, "user_logs.xlsx");
  };
  

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">User Management with Logs</Typography>
        <Button variant="contained" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>Username</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone Number</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <>
                <TableRow key={user.id}>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleRowToggle(user)}
                    >
                      {openRows[user.id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.phone ? `+91 ${user.phone}` : "NA"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onChange={(e) =>
                        updateUserRoleStatus({
                          user_id: user.id,
                          new_role: e.target.value,
                        })
                      }
                      size="small"
                      disabled={user.email === localStorage.getItem("email")}
                      style={{ fontSize: "12px" }}
                    >
                      <MenuItem value="User" style={{ fontSize: "12px" }}>
                        User
                      </MenuItem>
                      <MenuItem value="Admin" style={{ fontSize: "12px" }}>
                        Admin
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                  >
                    <Collapse
                      in={openRows[user.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Activity Log
                        </Typography>
                        {loadingLogs && !logsData[user.id] ? (
                          <Typography>Loading logs...</Typography>
                        ) :
                        logsData[user.id] && logsData[user.id].length === 0 ? (<div style={{textAlign: 'center', fontStyle: 'italic'}}>Logs Not Found !</div>) :
                        (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell><strong>Action</strong></TableCell>
                                <TableCell><strong>IP Address</strong></TableCell>
                                <TableCell><strong>Timestamp</strong></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(logsData[user.id] || []).map((log, index) => (
                                <TableRow key={index}>
                                  <TableCell>{log.action}</TableCell>
                                  <TableCell>{log.ip_address}</TableCell>
                                  <TableCell>{log.timestamp}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserLogsViewer;
