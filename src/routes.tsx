import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./app/layout";
import DashboardWatchList from "./app/pages/watchList";

export const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard/watch-list" replace />,
      },
      {
        path: "watch-list",
        element: <DashboardWatchList />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/watch-list" replace />,
  },
]);
