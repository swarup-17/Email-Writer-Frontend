import { Box, Typography, Button, IconButton, Drawer, useMediaQuery, useTheme, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";

const HistorySidebar = ({ history, loadHistoryItem, clearHistory, deleteHistoryItem, open, onClose, variant = 'drawer', anchor = 'left' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const glassStyle = {
      background: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(12px)",
      borderRight: "1px solid rgba(255, 255, 255, 0.3)",
      height: "100%",
  };

  const SidebarContent = (
    <Box
        sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            overflowY: 'auto',
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>History</Typography>
            </Box>
            <Box>
                <Button size="small" color="error" onClick={clearHistory} sx={{ mr: 1, textTransform: 'none' }} disabled={history.length === 0}>Clear</Button>
                {variant === 'drawer' && (
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
        <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.06)' }} />
        
        {history.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50%', opacity: 0.6 }}>
                <HistoryIcon sx={{ fontSize: 48, mb: 1, color: '#94a3b8' }} />
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    No emails yet
                </Typography>
            </Box>
        ) : (
            history.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        p: 2,
                        mb: 1.5,
                        borderRadius: "12px",
                        bgcolor: "rgba(255, 255, 255, 0.5)",
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: "all 0.2s ease",
                        '&:hover': { 
                            bgcolor: "rgba(255, 255, 255, 0.8)",
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
                        },
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        position: 'relative',
                        '&:hover .delete-btn': { display: 'flex' }
                    }}
                    onClick={() => {
                        loadHistoryItem(item);
                        if (variant === 'drawer') onClose();
                    }}
                >
                    <Typography variant="body2" noWrap sx={{ fontWeight: 600, pr: 3, mb: 0.5, color: '#334155' }}>
                        {item.original}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        {item.date}
                    </Typography>

                    <IconButton
                        className="delete-btn"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteHistoryItem(item.id);
                        }}
                        sx={{
                            display: isMobile ? 'flex' : 'none',
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: '#94a3b8',
                            '&:hover': { color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)' }
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ))
        )}
    </Box>
  );

  if (variant === 'drawer') {
      return (
          <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { 
                    width: '85%', 
                    maxWidth: '320px',
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                }
            }}
          >
              {SidebarContent}
          </Drawer>
      );
  }

  return (
      <Box sx={{ ...glassStyle, width: '100%', height: '100%', overflow: 'hidden' }}>
          {SidebarContent}
      </Box>
  );
};

export default HistorySidebar;
