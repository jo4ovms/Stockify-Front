import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import StockUnderSafetyPage from "../views/pages/StockOverview/StockUnderSafetyPage";
import StockSafetyPage from "../views/pages/StockOverview/StockSafetyPage";
import OutOfStockPage from "../views/pages/StockOverview/OutOfStockPage";
import CriticalStockPage from "../views/pages/StockOverview/CriticalStockPage";
import LogReportPage from "../views/pages/Log/LogReportPage";
import SalePage from "../views/pages/Sale/SalePage";
import SoldItemsPage from "../views/pages/Sale/SoldItemsPage";

const FullLayout = lazy(() => import("../layouts/full/FullLayout"));
const BlankLayout = lazy(() => import("../layouts/Blank/BlankLayout"));

const SupplierPage = lazy(() => import("../views/pages/Supplier/SupplierPage"));
const StockPage = lazy(() => import("../views/pages/Stock/StockPage"));
const AboutUs = lazy(() => import("../views/pages/AboutUs/AboutUs"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/supplier",
        element: <SupplierPage />,
      },
      {
        path: "/stock",
        element: <StockPage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/stock/under-safety",
        element: <StockUnderSafetyPage />,
      },
      {
        path: "/stock/safety",
        element: <StockSafetyPage />,
      },
      {
        path: "/stock/out-of-stock",
        element: <OutOfStockPage />,
      },
      {
        path: "/stock/:id/edit",
        element: <StockPage />,
      },
      {
        path: "report-logs/:logId",
        element: <LogReportPage />,
      },
      {
        path: "/stock/critical-stock",
        element: <CriticalStockPage />,
      },
      {
        path: "/report-logs",
        element: <LogReportPage />,
      },
      {
        path: "/register-sale",
        element: <SalePage />,
      },
      {
        path: "/sold-items",
        element: <SoldItemsPage />,
      },
    ],
  },
];

export default Router;
