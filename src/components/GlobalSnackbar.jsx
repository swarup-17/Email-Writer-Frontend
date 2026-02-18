import { Snackbar, Alert, useMediaQuery } from "@mui/material";
import theme from "../theme";

const GlobalSnackbar = ({ open, message, severity, onClose }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: isMobile ? "bottom" : "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
          fontWeight: 500,
          borderRadius: 2
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
