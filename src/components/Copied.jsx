import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Copied = ({ openSnackbar, setOpenSnackbar }) => {
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="success" variant="filled">
        Copied to clipboard!
      </Alert>
    </Snackbar>
  );
};

export default Copied;
