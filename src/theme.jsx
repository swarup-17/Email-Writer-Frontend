import "@fontsource/poppins";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Poppins', sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          '&:hover': {
             background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
             boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          }
        },
        outlined: {
           borderWidth: '2px',
           '&:hover': {
              borderWidth: '2px',
           }
        }
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
             backgroundColor: '#ffffff',
             backdropFilter: 'blur(8px)',
             transition: 'all 0.2s ease-in-out',
            '& fieldset': {
              borderColor: '#e2e8f0',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#94a3b8',
            },
            '&.Mui-focused': {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                '& fieldset': {
                    borderWidth: '2px',
                    borderColor: '#6366f1',
                }
            }
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
            }
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            input: {
                padding: '16px',
            },
            multiline: {
                 padding: '0',
            }
        }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 660,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
