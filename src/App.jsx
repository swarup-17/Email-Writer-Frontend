import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import Body from "./components/Body";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", 
          backgroundImage: `
            radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          animation: 'gradientAnimation 15s ease infinite',
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: 'relative'
        }}
      >

        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Body />
        </Box>


      </Box>
    </ThemeProvider>
  );
}

export default App;
