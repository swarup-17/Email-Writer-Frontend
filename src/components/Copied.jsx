import { Snackbar, Alert, useMediaQuery } from "@mui/material";
import { teal } from "@mui/material/colors";
import theme from "../theme";

const Copied = ({ openSnackbar, setOpenSnackbar }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{
        vertical: isMobile ? "bottom" : "top",
        horizontal: "center",
      }}
    >
      <Alert
        severity="success"
        variant="filled"
        sx={{
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
          bgcolor: teal[600],
        }}
      >
        Copied to clipboard!
      </Alert>
    </Snackbar>
  );
};

export default Copied;
