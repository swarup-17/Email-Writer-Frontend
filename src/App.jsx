import React from "react";
import { Container, Paper, useMediaQuery, useTheme } from "@mui/material";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Copied from "./components/Copied";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          overflow: "hidden",
          borderRadius: 2,
          background: "linear-gradient(to right bottom, #ffffff, #f8f9fa)",
        }}
      >
        <Header />
        <Body />
        <Footer />
      </Paper>
      <Copied />
    </Container>
  );
}

export default App;
