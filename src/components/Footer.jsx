import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box sx={{ py: 1.5, px: 2, bgcolor: "grey.100", textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          Email Reply Generator •{" "}
          <Link
            href="https://swarup-portfolio-flame.vercel.app/"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            Visit Developer
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
