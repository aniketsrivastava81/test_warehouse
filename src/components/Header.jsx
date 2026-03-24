import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLeadMagnet } from "../context/LeadMagnetContext";

function linkClass({ isActive }) {
  return isActive ? "active-link" : undefined;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { openLeadMagnet } = useLeadMagnet();

  const closeDrawer = () => setOpen(false);

  return (
    <header className="site-header" role="banner">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="container">
        <div
          className="header-top"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            padding: "10px 0 6px 0",
            borderBottom: "1px solid rgba(24,32,43,.06)",
          }}
        >
          <div className="badges" style={{ gap: "8px" }}>
            <span className="pill">
              <strong>20+ years</strong> commercial guidance
            </span>
            <span className="pill">
              <strong>50+ businesses</strong> supported
            </span>
          </div>

          <div
            className="tiny muted"
            style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}
          >
            <a href="tel:+14165551234">+1 (416) 555-1234</a>
            <a href="mailto:megha@yourbrokerage.ca">megha@yourbrokerage.ca</a>
          </div>
        </div>

        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="Go to homepage">
            <span className="brand-mark" aria-hidden="true">
              MM
            </span>
            <span className="brand-text">
              <span className="brand-name">Megha Mehta</span>
              <span className="brand-sub">Commercial Leasing • Greater Toronto Area</span>
            </span>
          </NavLink>

          <nav className="nav" aria-label="Primary">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/property-list" className={linkClass}>
              Listings
            </NavLink>
            <NavLink to="/tools" className={linkClass}>
              Tools
            </NavLink>
            <NavLink to="/blog" className={linkClass}>
              Guides
            </NavLink>
            <NavLink to="/warehouse" className={linkClass}>
              Warehouse
            </NavLink>
            <button className="btn btn-primary btn-sm" type="button" onClick={openLeadMagnet}>
              Get the Checklist
            </button>
          </nav>

          <button
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={open ? "true" : "false"}
            onClick={() => setOpen((s) => !s)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {!open ? null : (
        <div className="nav-drawer">
          <div className="container">
            <div className="nav-drawer-inner">
              <div className="card soft" style={{ padding: "14px", marginBottom: "4px" }}>
                <div className="kicker">Commercial Leasing • GTA</div>
                <h3 style={{ marginTop: "8px" }}>Megha Mehta</h3>
                <p className="tiny muted" style={{ marginBottom: 0 }}>
                  Relationship-first guidance for first leases, renewals, and relocations.
                </p>
              </div>

              <NavLink to="/" className={linkClass} onClick={closeDrawer} end>
                Home
              </NavLink>
              <NavLink to="/property-list" className={linkClass} onClick={closeDrawer}>
                Listings
              </NavLink>
              <NavLink to="/tools" className={linkClass} onClick={closeDrawer}>
                Tools
              </NavLink>
              <NavLink to="/blog" className={linkClass} onClick={closeDrawer}>
                Guides
              </NavLink>
              <NavLink to="/warehouse" className={linkClass} onClick={closeDrawer}>
                Warehouse
              </NavLink>

              <div className="card soft" style={{ padding: "14px", marginTop: "4px" }}>
                <div
                  className="tiny muted"
                  style={{ display: "grid", gap: "6px", marginBottom: "12px" }}
                >
                  <a href="tel:+14165551234">+1 (416) 555-1234</a>
                  <a href="mailto:megha@yourbrokerage.ca">megha@yourbrokerage.ca</a>
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    openLeadMagnet();
                  }}
                >
                  Get the Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
