import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Avatar,
  IconButton,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  IconShieldCheck,
  IconEye,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../components/container/PageContainer.jsx";
import DashboardCard from "../../../components/shared/DashboardCard.jsx";
import stockOverviewService from "../../../services/stockOverviewService";
import stockService from "../../../services/stockService";

let debounceTimeout = null;

const StockSafetyPage = () => {
  const [page, setPage] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [size] = useState(10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const threshold = 5;
  const [query, setQuery] = useState("");
  const [supplierId, setSupplierId] = useState(null);
  const [sortBy] = useState("quantity");
  const [sortDirection, setSortDirection] = useState("asc");

  const getSupplierName = () => {
    const supplier = suppliers.find((sup) => sup.id === supplierId);
    return supplier ? supplier.name : "";
  };

  const retrieveSuppliers = useCallback(() => {
    stockService
      .getAllWithoutPagination()
      .then((response) => {
        setSuppliers(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => setSuppliers([]));
  }, []);

  const retrieveAdequateStockProducts = useCallback(
    (currentPage) => {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      setLoading(true);

      debounceTimeout = setTimeout(() => {
        stockOverviewService
          .getFilteredAdequateStockReport(
            query,
            supplierId,
            threshold,
            currentPage,
            size,
            sortBy,
            sortDirection
          )
          .then((response) => {
            const productData = response.data._embedded?.stockDTOList || [];
            setProducts(productData);
            setTotalPages(response.data.page.totalPages);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            if (error.response && error.response.status === 404) {
              setProducts([]);
              setTotalPages(1);
            } else {
              console.error("Erro ao buscar produtos:", error);
            }
          });
      }, 300);
    },
    [query, supplierId, sortBy, sortDirection, size]
  );

  useEffect(() => {
    setPage(0);
  }, [query, supplierId, sortBy, sortDirection]);

  useEffect(() => {
    if (page >= 0 && page < totalPages) {
      retrieveAdequateStockProducts(page);
    }
  }, [
    page,
    query,
    supplierId,
    sortBy,
    sortDirection,
    retrieveAdequateStockProducts,
  ]);

  useEffect(() => {
    retrieveSuppliers();
  }, [retrieveSuppliers]);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/stock/${productId}/edit`);
  };

  return (
    <PageContainer
      title="Produtos com Estoque Seguro"
      description="Página de produtos com estoque adequado (5 ou mais)"
    >
      <DashboardCard title="Produtos com Estoque Seguro">
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Buscar por produto"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Fornecedor</InputLabel>
              <Select
                value={supplierId || ""}
                onChange={(e) => setSupplierId(e.target.value || null)}
              >
                <MenuItem value="">
                  <em>Todos os Fornecedores</em>
                </MenuItem>
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ p: 1.8 }}
              onClick={() =>
                setSortDirection(sortDirection === "asc" ? "desc" : "asc")
              }
            >
              Ordenar por Quantidade (
              {sortDirection === "asc" ? "Crescente" : "Decrescente"})
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <Grid container spacing={-5}>
            {[...Array(size)].map((_, index) => (
              <Grid size={{ xs: 12 }} key={index}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    mb: 2,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Skeleton variant="circular" width={27} height={27} />
                    <Skeleton
                      variant="text"
                      width={150}
                      sx={{ marginLeft: 2 }}
                      animation="wave"
                    />
                  </Box>
                  <Skeleton variant="rectangular" width={80} height={27} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={-5}>
            {products.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{
                  height: "50vh",
                  textAlign: "center",
                  margin: "0 auto",
                  maxWidth: "400px",
                }}
              >
                <IconExclamationCircle size={60} color="#FFAE1F" />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  {query
                    ? `Nenhum produto correspondente à pesquisa "${query}" foi encontrado para o fornecedor "${getSupplierName()}".`
                    : `Nenhum produto do fornecedor "${getSupplierName()}" está em baixo estoque.`}
                </Typography>
              </Box>
            ) : (
              products.map((product, index) => (
                <Grid size={{ xs: 12 }} key={product.id || index}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      padding: "10px",
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9",
                      mb: 2,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: "#e3f2fd",
                          width: 27,
                          height: 27,
                          mr: 2,
                        }}
                      >
                        <IconShieldCheck width={20} color="#1e88e5" />
                      </Avatar>
                      <Typography variant="subtitle2">
                        {product.productName}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="subtitle2"
                        color="success"
                        sx={{ mr: 2 }}
                      >
                        Quantidade: {product.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => handleProductClick(product.id)}
                        aria-label="Edit Product"
                      >
                        <IconEye width={20} />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        )}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={page === 0}
          >
            Página Anterior
          </Button>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
          >
            Próxima Página
          </Button>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default StockSafetyPage;
