import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {fetchActivityLogs, clearAllActivity, clearActivityById} from '../../api/activityLogs.js'
import { convertToIST } from '../../common/common'

const DataAndPrivacy = (props) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async(id: number) => {
    if(await clearActivityById(id))
        setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleClearAll = async() => {
    if(await clearAllActivity())
        setHistory([]);
  };

  useEffect(() => {
    const getLogs = async () => {
      try {
        setIsLoading(true)
        const logs = await fetchActivityLogs(); // Assuming this function fetches logs
        const formattedLogs = logs.map((log, index) => ({
          id: log.id, // Unique ID for rendering
          action: log.action,
          ip: log.ip_address,
          timestamp: convertToIST(new Date(log.timestamp).toLocaleString()), // Format timestamp
        }));
        setHistory(formattedLogs);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
      }
      setIsLoading(false)
    };

    getLogs();
  }, []);

  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <div style={{ width: '100%', textAlign: 'right' }}>
        <Button
          // variant="contained"
          onClick={props.handleExport}
          size="small"
          style={{ background: ' #00796b', color: 'white', textTransform: 'none' }}
          sx={{ paddingX: '10px' }}
        >
          Export Data
        </Button>
      </div>
      <Typography variant="h4" gutterBottom sx={{ color: "#00796b" }}>
        Data and Privacy
      </Typography>
      {history.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            mt: 2,
            borderRadius: 3,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#37474f" }}>
                  Action
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#37474f" }}>
                  IP Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#37474f" }}>
                  Timestamp
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#37474f" }}>
                  Ṛemove
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry) => (
                <TableRow
                  key={entry.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1f8e9",
                    },
                  }}
                >
                  <TableCell>{entry.action}</TableCell>
                  <TableCell>{entry.ip}</TableCell>
                  <TableCell>{entry.timestamp}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(entry.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        isLoading ? 
                      <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          minHeight="50vh"
                      >
                          <CircularProgress style={{color:'red'}} />
                      </Box>
        :
                      <Typography variant="body1" sx={{ mt: 3, fontStyle: "italic" }}>
                          No activity history available.
                      </Typography>
      )}
      {history.length > 0 && (
        <div>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3, textTransform: "none" }}
          onClick={handleClearAll}
        >
          Clear All History
        </Button>
        </div>
      )}
    </Box>
  );
};

export default DataAndPrivacy