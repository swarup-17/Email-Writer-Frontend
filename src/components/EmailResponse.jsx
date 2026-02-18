import { Box, TextField, Button, CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EmailResponse = ({ generatedReply, loading, isRefining, handleRefine, refinementInstruction, setRefinementInstruction, handleCopy, copied, isMobile }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: '100%',
      }}
    >
      <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TextField
            fullWidth
            multiline
            minRows={isMobile ? 6 : 10}
            maxRows={isMobile ? 8 : 20}
            variant="outlined"
            placeholder={
            generatedReply
                ? ""
                : "Your generated reply will appear here..."
            }
            value={generatedReply || ""}
            slotProps={{
            readOnly: true,
            }}
            sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            '& .MuiInputBase-root': {
                height: '100%',
                alignItems: 'flex-start',
                pb: 6
            },
            '& .MuiInputBase-input': {
                height: '100% !important',
                overflow: 'auto !important'
            }
            }}
        />
        <Button
            variant="contained"
            color="secondary"
            onClick={handleCopy}
            disabled={!generatedReply}
            size="small"
            startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
            sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                zIndex: 10,
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                background: copied 
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                    : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                    background: copied 
                        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
                        : 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                }
            }}
        >
            {copied ? "Copied" : "Copy"}
        </Button>
      </Box>
      
      {/* Refinement Section */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
           <TextField
              fullWidth
              size="small"
              placeholder="Refine draft (e.g. 'Make it shorter', 'More formal')..."
              value={refinementInstruction}
              onChange={(e) => setRefinementInstruction(e.target.value)}
              disabled={!generatedReply}
              sx={{
                '& .MuiOutlinedInput-root': {
                    height: '100%',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                }
              }}
           />
           <Button
              variant="contained"
              color="primary"
              onClick={handleRefine}
              disabled={loading || !refinementInstruction.trim() || !generatedReply}
              sx={{
                  minWidth: '90px',
                   borderRadius: '12px',
                   textTransform: 'none',
                   fontWeight: 600
              }}
           >
               {isRefining ? <CircularProgress size={20} color="inherit" /> : "Refine"}
           </Button>
      </Box>
    </Box>
  );
};

export default EmailResponse;
