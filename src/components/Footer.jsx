import { Typography, Box, Link } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" sx={{ color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 1, fontWeight: 500 }}>
        <Link
          href="https://chromewebstore.google.com/detail/cjabpnjdgodpkanfkfcignmndeebhhkn?utm_source=item-share-cb"
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 0.5, transition: 'color 0.2s', '&:hover': { color: '#6366f1' } }}
        >
          Chrome Extension
          <ArrowOutwardIcon sx={{ fontSize: 14 }} />
        </Link>
        <Box component="span" sx={{ mx: 1, color: 'rgba(0,0,0,0.1)', display: { xs: 'none', sm: 'inline' } }}>|</Box>
        <Link
          href="https://swarup-portfolio-flame.vercel.app/"
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ color: '#6366f1', fontWeight: 600, transition: 'color 0.2s', '&:hover': { color: '#4f46e5' } }}
        >
          Visit Developer
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
