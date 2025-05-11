import { Typography, Box, Divider, Link } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const Footer = () => {
  return (
    <>
      <Divider sx={{ borderColor: grey[200] }} />
      <Box
        sx={{
          py: { xs: 1, sm: 1.5 },
          px: { xs: 1.5, sm: 2 },
          bgcolor: grey[50],
          textAlign: "center",
        }}
      >
        <Typography variant="caption">
          <Link
            href="https://chromewebstore.google.com/detail/cjabpnjdgodpkanfkfcignmndeebhhkn?utm_source=item-share-cb"
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{ color: grey[600] }}
          >
            Email Reply Generator
          </Link>{" "}
          •{" "}
          <Link
            href="https://swarup-portfolio-flame.vercel.app/"
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{ color: blue[600] }}
          >
            Visit Developer
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
