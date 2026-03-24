import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeadMagnetModal from "./LeadMagnetModal";

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <Footer />
      <LeadMagnetModal />
    </div>
  );
}
