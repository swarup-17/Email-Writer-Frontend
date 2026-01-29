import { Typography, Box, useMediaQuery, useTheme, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        py: { xs: 1.5, sm: 2, md: 3 },
        px: { xs: 1.5, sm: 2, md: 4 },
        textAlign: "center",
        borderTopRightRadius: 5,
        background:
          "linear-gradient(135deg,rgba(90, 181, 241, 0.49) 0%,rgba(126, 121, 196, 0.49) 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EmailIcon
          sx={{
            fontSize: { xs: 24, sm: 32, md: 35 },
            mr: 1,
            color: "black",
          }}
        />
        <Typography variant={isMobile ? "h5" : "h4"} component="h1">
          <Link
            href="https://chromewebstore.google.com/detail/cjabpnjdgodpkanfkfcignmndeebhhkn?utm_source=item-share-cb"
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{
              color: "black",
              fontWeight: 600,
            }}
          >
            Email Reply Generator
          </Link>
        </Typography>
      </Box>
      <Typography
        variant={isMobile ? "caption" : "body2"}
        sx={{
          mt: 0.5,
          color: "rgba(0, 0, 0, 0.9)",
        }}
      >
        Generate professional email responses quickly and easily
      </Typography>
    </Box>
  );
};

export default Header;
