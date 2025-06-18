import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { AnaliticPage } from "@/pages/AnaliticPage/AnaliticPage";
import { GeneratorPage } from "@/pages/GeneratorPage/GeneratorPage";
import { HistoryPage } from "@/pages/HistoryPage/HistoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <AnaliticPage /> },
      { path: "generate", element: <GeneratorPage /> },
      { path: "history", element: <HistoryPage /> },
    ],
  },
]);
