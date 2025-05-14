import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { blue, teal, grey } from "@mui/material/colors";
import axios from "axios";
import Copied from "./Copied";

const Body = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://email-writer-k8tb.onrender.com/api/email/generate",
        {
          emailContent,
          tone,
        }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate eamil reply. Please try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setOpenSnackbar(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <>
      <Box
        sx={{
          pl: { xs: 2, sm: 2, md: 5 },
          py: { xs: 1.5, sm: 2, md: 3 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{
            flexGrow: 1,
            height: "100%",
          }}
        >
          {/* Left Side - Input Section */}
          <Grid
            sx={{
              width: isMobile ? "95%" : "45%",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: { xs: 1.5, sm: 2, md: 3 },
                bgcolor: grey[100],
                borderRadius: { xs: 1, sm: 2 },
                border: `1px solid ${grey[700]}`,
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  color: blue[700],
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Input Email
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={isMobile ? 7 : 13.3}
                variant="outlined"
                label="Original Email Content"
                placeholder="Paste the email you received here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                error={!!error}
                helperText={error}
                size={isMobile ? "small" : "medium"}
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  flexGrow: 1,
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: grey[300],
                      transition: "border-color 0.2s ease-in-out",
                    },
                    "&:hover fieldset": {
                      borderColor: blue[200],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: blue[500],
                    },
                  },
                }}
              />

              <FormControl
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: grey[500],
                    },
                    "&:hover fieldset": {
                      borderColor: blue[300],
                    },
                  },
                }}
              >
                <InputLabel id="tone-select-label">Tone (Optional)</InputLabel>
                <Select
                  labelId="tone-select-label"
                  value={tone}
                  label="Tone (Optional)"
                  onChange={(e) => setTone(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                  <MenuItem value="formal">Formal</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={!emailContent.trim() || loading}
                size={isMobile ? "medium" : "large"}
                startIcon={
                  loading ? (
                    <CircularProgress
                      size={isMobile ? 16 : 20}
                      color="inherit"
                    />
                  ) : (
                    <SendIcon />
                  )
                }
                sx={{
                  py: isMobile ? 1 : 1.5,
                  borderRadius: 1.5,
                  background: `linear-gradient(135deg, ${blue[500]} 0%, ${blue[700]} 100%)`,
                  boxShadow: "0px 3px 5px rgba(0,105,217,0.2)",
                  "&:hover": {
                    boxShadow: "0px 5px 8px rgba(0,105,217,0.3)",
                    background: `linear-gradient(135deg, ${blue[600]} 0%, ${blue[800]} 100%)`,
                  },
                }}
              >
                {loading ? "Generating..." : "Generate Reply"}
              </Button>
            </Box>
          </Grid>

          {/* Right Side - Output Section */}
          <Grid
            sx={{
              width: isMobile ? "95%" : "50%",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: { xs: 1.5, sm: 2, md: 3 },
                bgcolor: grey[100],
                borderRadius: { xs: 1, sm: 2 },
                border: `1px solid ${grey[700]}`,
                opacity: generatedReply ? 1 : isMobile ? 1 : 0.7,
                transition: "opacity 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: generatedReply
                    ? "0px 4px 12px rgba(0, 0, 0, 0.05)"
                    : "none",
                },
              }}
            >
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  color: teal[700],
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Generated Reply
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={isMobile ? 7 : 17}
                variant="outlined"
                placeholder={
                  generatedReply
                    ? ""
                    : "Your generated reply will appear here..."
                }
                value={generatedReply}
                size={isMobile ? "small" : "medium"}
                slotProps={{
                  readOnly: true,
                }}
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  flexGrow: 1,
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: grey[500],
                    },
                    "&:hover fieldset": {
                      borderColor: teal[300],
                    },
                  },
                }}
              />

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCopy}
                disabled={!generatedReply}
                size={isMobile ? "small" : "medium"}
                startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                sx={{
                  alignSelf: "flex-end",
                  borderRadius: 1.5,
                  borderColor: copied ? teal[400] : teal[500],
                  color: copied ? teal[700] : teal[600],
                  "&:hover": {
                    backgroundColor: teal[50],
                    borderColor: teal[400],
                  },
                }}
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            </Box>
            <Copied
              openSnackbar={openSnackbar}
              setOpenSnackbar={setOpenSnackbar}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Body;
