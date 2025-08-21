import { Container, Paper, Box, useTheme, useMediaQuery } from "@mui/material";
import Footer from "./components/Footer";
import Copied from "./components/Copied";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 2 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters={isMobile}
        sx={{
          height: "100%",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            overflow: "hidden",
            borderRadius: { xs: 1, sm: 2 },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <Body />
          <Footer />
        </Paper>
        <Copied />
      </Container>
    </Box>
  );
}

export default App;
