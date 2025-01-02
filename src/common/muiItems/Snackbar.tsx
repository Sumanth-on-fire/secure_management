import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackBarComponent = ({content, openSnackbar, setOpenSnackbar}) => {
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return false; // Prevent closing the Snackbar when clicking outside
    }
    setOpenSnackbar(false); // Close the Snackbar
    return true
  };

  return (
    <div>
      {/* Snackbar Component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }
    }
      >
        <Alert severity={content.includes('success') ? "success" : "error"} variant="filled">
          {content}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBarComponent;
