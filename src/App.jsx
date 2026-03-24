import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LeadMagnetProvider } from "./context/LeadMagnetContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import PropertyListPage from "./pages/PropertyListPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ToolsPage from "./pages/ToolsPage";
import WarehousePage from "./pages/WarehousePage";

export default function App() {
  return (
    <LeadMagnetProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/property-list" element={<PropertyListPage />} />
          <Route path="/property-details" element={<PropertyDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/warehouse" element={<WarehousePage />} />
          <Route path="/landingpage.html" element={<Navigate to="/" replace />} />
          <Route path="/blog.html" element={<Navigate to="/blog" replace />} />
          <Route path="/propertylist.html" element={<Navigate to="/property-list" replace />} />
          <Route path="/propertydetail.html" element={<Navigate to="/property-details" replace />} />
          <Route path="/tools.html" element={<Navigate to="/tools" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </LeadMagnetProvider>
  );
}
