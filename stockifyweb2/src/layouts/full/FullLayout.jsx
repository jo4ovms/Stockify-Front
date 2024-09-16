import React, { useState } from "react";
import { styled, Container, Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const MainWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  //flexDirection: "row", //nao funcionou
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrown: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

const ContentWrapper = styled("div")(() => ({
  flexGrow: 1,
}));

const FullLayout = () => {
  const theme = useTheme();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <MainWrapper>
      {isMediumUp && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
      )}
      <PageWrapper>
        <Header
          toggleSidebar={() => setIsSideBarOpen(!isSideBarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <ContentWrapper>
          <Container sx={{ paddingTop: "20px", maxWidth: "none" }}>
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
              <Outlet />
            </Box>
          </Container>
        </ContentWrapper>
        <Footer />
      </PageWrapper>
      {!isMediumUp && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
      )}
    </MainWrapper>
  );
};

export default FullLayout;
