import { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme, Fab, Paper, Divider, IconButton } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import GlobalSnackbar from "./GlobalSnackbar";
import EmailInput from "./EmailInput";
import EmailResponse from "./EmailResponse";
import HistorySidebar from "./HistorySidebar";
import Footer from "./Footer";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  '&:hover': {
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
  }
};

const Body = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("emailHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [refinementInstruction, setRefinementInstruction] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);

  const responseRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    localStorage.setItem("emailHistory", JSON.stringify(history));
  }, [history]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}`, {
        emailContent,
        tone,
      });
      const reply =
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data);
      setGeneratedReply(reply);
      addToHistory(emailContent, reply);
      
      if (isMobile) {
          setTimeout(() => {
              responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
      }
    } catch (error) {
      const errorMessage = "Failed to generate email reply. Please try again";
      setError(errorMessage);
      showSnackbar(errorMessage, "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    setLoading(true);
    setError("");
    setIsRefining(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}`, {
        emailContent: emailContent, // Pass the original email context
        originalContent: generatedReply, // Pass the current draft to be refined
        refinementInstruction,
        tone,
      });
      const reply =
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data);
      setGeneratedReply(reply);
      addToHistory(emailContent, reply); 
      setRefinementInstruction("");
      setIsRefining(false);
    } catch (error) {
      const errorMessage = "Failed to refine email. Please try again";
      setError(errorMessage);
      showSnackbar(errorMessage, "error");
      console.error(error);
    } finally {
      setLoading(false);
      setIsRefining(false);
    }
  };

  const addToHistory = (original, generated) => {
    const newEntry = {
      id: Date.now(),
      original,
      generated,
      date: new Date().toLocaleString(),
    };
    setHistory([newEntry, ...history]);
  };

  const loadHistoryItem = (item) => {
    setEmailContent(item.original);
    setGeneratedReply(item.generated);
    if (isMobile) {
        setTimeout(() => {
            responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  };

  const clearHistory = () => {
      setHistory([]);
  };

  const deleteHistoryItem = (id) => {
      setHistory(history.filter(item => item.id !== id));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    showSnackbar("Copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
     
      <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          p: { xs: 2, md: 3 }, 
          overflowY: isMobile ? 'auto' : 'hidden', 
          height: '100%'
      }}>
          
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', flexShrink: 0 }}>
            {!isMobile && (
                <IconButton 
                    onClick={() => setOpenHistory(true)}
                    sx={{ 
                        mr: 2, 
                        color: 'white',
                        backdropFilter: 'blur(4px)',
                        background: 'rgba(255,255,255,0.1)', 
                        '&:hover': { background: 'rgba(255,255,255,0.2)' }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <AutoAwesomeIcon sx={{ fontSize: 36, mr: 1.5, color: 'white', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }} />
            <Box>
                <Typography variant="h4" sx={{ 
                    fontWeight: 800, 
                    color: '#fff', 
                    letterSpacing: '-0.5px',
                    textShadow: '0px 4px 12px rgba(0,0,0,0.1)' 
                }}>
                    Email Writer
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                    AI-Powered Professional Correspondence
                </Typography>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ flexGrow: 1, minHeight: 0, display: isMobile ? 'block' : 'flex' }}> 
            <Grid size={{ xs: 12, md: 5, lg: 5 }} sx={{ height: isMobile ? 'calc(100vh - 200px)' : '100%', mb: isMobile ? 3 : 0 }}>
                <Paper sx={{ ...glassStyle, p: 3, minHeight: isMobile ? '400px' : 'auto' }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }}></span>
                        Input Context
                    </Typography>
                    <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.06)' }} />
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                        <EmailInput
                            emailContent={emailContent}
                            setEmailContent={setEmailContent}
                            tone={tone}
                            setTone={setTone}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            isRefining={isRefining}
                            isMobile={isMobile}
                        />
                    </Box>
                </Paper>
            </Grid>

            {/* Output Panel */}
            <Grid size={{ xs: 12, md: 7, lg: 7 }} sx={{ height: isMobile ? 'auto' : '100%' }}>
                <Paper 
                    ref={responseRef}
                    sx={{ 
                        ...glassStyle, 
                        p: 3, 
                        position: 'relative', 
                        minHeight: isMobile ? '300px' : 'auto',
                        height: isMobile ? 'calc(100vh - 200px)' : '100%'
                    }}
                >
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
                        Generated Draft
                    </Typography>
                    <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.06)' }} />
                    <Box sx={{ pr: 1, display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
                        <EmailResponse
                            generatedReply={generatedReply}
                            loading={loading}
                            isRefining={isRefining}
                            handleRefine={handleRefine}
                            refinementInstruction={refinementInstruction}
                            setRefinementInstruction={setRefinementInstruction}
                            handleCopy={handleCopy}
                            copied={copied}
                            isMobile={isMobile}
                        />
                    </Box>
                </Paper>
                {isMobile && (
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Footer />
                    </Box>
                )}
            </Grid>
      </Grid> 
      </Box>

      {!isMobile && <Footer />}

      {/* History Sidebar */}
      <HistorySidebar
          history={history}
          loadHistoryItem={loadHistoryItem}
          clearHistory={clearHistory}
          deleteHistoryItem={deleteHistoryItem}
          open={openHistory}
          onClose={() => setOpenHistory(false)}
          variant="drawer"
          anchor="left"
      />
      {isMobile && (
        <Fab 
            color="primary" 
            aria-label="history"
            onClick={() => setOpenHistory(true)}
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1000,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.35)',
                background: 'rgba(255, 255, 255, 0.9)',
                color: theme.palette.primary.main,
                backdropFilter: 'blur(10px)',
            }}
        >
            <HistoryIcon />
        </Fab>
      )}

      {/* Global Snackbar */}
      <GlobalSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default Body;
