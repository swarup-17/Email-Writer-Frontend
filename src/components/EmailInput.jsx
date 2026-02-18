import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const EmailInput = ({ emailContent, setEmailContent, tone, setTone, handleSubmit, loading, isRefining, isMobile }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={isMobile ? 6 : 10}
        maxRows={isMobile ? 8 : 20}
        variant="outlined"
        placeholder="Paste the email you received here..."
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        sx={{
           flexGrow: 1,
           display: 'flex',
           flexDirection: 'column',
           '& .MuiInputBase-root': {
               height: '100%',
               alignItems: 'flex-start',
           },
           '& .MuiInputBase-input': {
               height: '100% !important',
               overflow: 'auto !important'
           }
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="tone-select-label">Tone (Optional)</InputLabel>
        <Select
          labelId="tone-select-label"
          value={tone}
          label="Tone (Optional)"
          onChange={(e) => setTone(e.target.value)}
          sx={{
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            backdropFilter: 'blur(8px)',
             '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e2e8f0',
             },
             '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#94a3b8',
             },
             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6366f1',
             }
          }}
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
        disabled={!emailContent.trim() || loading || isRefining}
        size="large"
        startIcon={
          loading && !isRefining ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <SendIcon />
          )
        }
        sx={{
           mt: 1,
           height: '48px',
           fontSize: '1rem',
        }}
      >
        {loading && !isRefining ? "Generating..." : "Generate Reply"}
      </Button>
    </Box>
  );
};

export default EmailInput;
