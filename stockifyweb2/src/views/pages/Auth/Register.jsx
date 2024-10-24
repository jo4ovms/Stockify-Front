import { Box, Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PageContainer from "../../../components/container/PageContainer.jsx";
import Logo from "../../../layouts/full/shared/logo/Logo.jsx";
import AuthRegister from "./AuthRegister.jsx";

const Register = () => (
  <PageContainer title="Register" description="this is Register page">
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          size={{ xs: 12, sm: 12, lg: 4, xl: 3 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={7}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ width: "600px", height: "100px", mb: 2, ml: -12 }}
            >
              <Logo />
            </Box>
            <AuthRegister />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Register;
