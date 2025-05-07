import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container display="block" spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={isMobile ? 6 : 8}
              variant="outlined"
              label="Original Email Content"
              placeholder="Paste the email you received here..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="tone-select-label">Tone (Optional)</InputLabel>
              <Select
                labelId="tone-select-label"
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
                <MenuItem value="formal">Formal</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size={isMobile ? "medium" : "large"}
              onClick={handleSubmit}
              disabled={!emailContent.trim() || loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              sx={{ py: 1.5 }}
            >
              {loading ? "Generating..." : "Generate Reply"}
            </Button>
          </Grid>
        </Grid>

        {generatedReply && (
          <Box sx={{ mt: 4 }}>
            <Card variant="outlined" sx={{ bgcolor: "grey.50" }}>
              <CardHeader
                title={
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    fontWeight="medium"
                  >
                    Generated Reply
                  </Typography>
                }
                sx={{ pb: 0 }}
              />
              <CardContent>
                <TextField
                  fullWidth
                  multiline
                  rows={isMobile ? 4 : 6}
                  variant="outlined"
                  value={generatedReply}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    bgcolor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "grey.300",
                      },
                    },
                  }}
                />
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  variant="outlined"
                  color={copied ? "success" : "primary"}
                  onClick={handleCopy}
                  startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                  sx={{ ml: "auto" }}
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
              </CardActions>
              <Copied
                openSnackbar={openSnackbar}
                setOpenSnackbar={setOpenSnackbar}
              />
            </Card>
          </Box>
        )}
      </Box>

      <Divider />
    </>
  );
};

export default Body;
