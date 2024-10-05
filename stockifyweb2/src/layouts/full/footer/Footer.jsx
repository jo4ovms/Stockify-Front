import { Box, Typography, IconButton } from "@mui/material";
import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        color: "white",
        padding: "15px 0",
        textAlign: "center",
        position: "relative",
        bottom: -60,
      }}
    >
      <Typography variant="body1">
        © 2024 Stockify. Todos os direitos reservados.
        {/* <IconButton
          sx={{
            color: "white",
            "&:hover": { color: "secondary.main", cursor: "pointer" },
          }}
        >
          <IconBrandInstagram />
        </IconButton>
        <IconButton
          sx={{
            color: "white",
            "&:hover": {
              color: "secondary.main",
              cursor: "pointer",
            },
          }}
        >
          <IconBrandWhatsapp />
        </IconButton> */}
      </Typography>
    </Box>
  );
};

export default Footer;
