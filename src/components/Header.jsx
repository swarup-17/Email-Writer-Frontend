import React from "react";
import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 4 },
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h1"
        color="white"
        fontWeight="bold"
      >
        Email Reply Generator
      </Typography>
      <Typography variant="body2" color="primary.light" sx={{ mt: 0.5 }}>
        Generate professional email responses quickly and easily
      </Typography>
    </Box>
  );
};

export default Header;
