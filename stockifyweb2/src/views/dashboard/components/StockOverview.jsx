import React, { useState, useEffect } from "react";
import { Stack, Typography, Avatar, Fab, Box, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconAlertTriangle, IconCheck, IconBox } from "@tabler/icons-react";
import DashboardCard from "../../../components/shared/DashboardCard";
import StockOverviewService from "../../../services/stockOverviewService";

const StockOverview = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState(0);
  const [adequateStockItems, setAdequateStockItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStockMessage = (stockData) => {
      console.log("Dados recebidos:", stockData);

      setTotalItems((prevTotal) => prevTotal + 1);

      if (stockData.quantity === 0) {
        setOutOfStockItems((prevOutOfStock) => prevOutOfStock + 1);
      } else if (stockData.quantity < 5) {
        setLowStockItems((prevLowStock) => prevLowStock + 1);
      } else {
        setAdequateStockItems((prevAdequateStock) => prevAdequateStock + 1);
      }

      setLoading(false);
    };

    const eventSource = StockOverviewService.streamStocks(
      handleStockMessage,
      (error) => {
        console.error("Erro no streaming de dados:", error);
        setLoading(false);
      }
    );

    return () => {
      eventSource.close();
    };
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const theme = useTheme();
  const errorlight = "#fdede8";
  const warninglight = "#fff8e1";
  const successlight = "#e8f5e9";

  return (
    <DashboardCard
      title="Visão Geral do Estoque"
      action={
        <Fab
          color="secondary"
          size="medium"
          sx={{ color: "#ffffff" }}
          onClick={() => handleNavigate("/stock")}
        >
          <IconBox width={24} />
        </Fab>
      }
      sx={{ height: "240px", width: "125%", maxWidth: "600px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          minWidth: "400px",
        }}
      >
        {loading ? (
          <Grid container spacing={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              {[...Array(3)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2,
                    mr: 10,
                  }}
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton
                    variant="text"
                    width={100}
                    height={20}
                    sx={{ mt: 1 }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        ) : (
          <Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h4" fontWeight="700" mt="-10px">
                {totalItems} Itens
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Total em Estoque
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                onClick={() => handleNavigate("/stock/under-safety")}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  sx={{ bgcolor: warninglight, width: 40, height: 40, mr: 2 }}
                >
                  <IconAlertTriangle
                    width={24}
                    color={theme.palette.warning.main}
                  />
                </Avatar>
                <Box>
                  <Typography variant="h5">{lowStockItems}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Baixo Estoque
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                onClick={() => handleNavigate("/stock/out-of-stock")}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  sx={{ bgcolor: errorlight, width: 40, height: 40, mr: 2 }}
                >
                  <IconAlertTriangle
                    width={24}
                    color={theme.palette.error.main}
                  />
                </Avatar>
                <Box>
                  <Typography variant="h5">{outOfStockItems}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Fora de Estoque
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                onClick={() => handleNavigate("/stock/safety")}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  sx={{ bgcolor: successlight, width: 40, height: 40, mr: 2 }}
                >
                  <IconCheck width={24} color={theme.palette.success.main} />
                </Avatar>
                <Box>
                  <Typography variant="h5">{adequateStockItems}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Estoque Adequado
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
    </DashboardCard>
  );
};

export default StockOverview;
