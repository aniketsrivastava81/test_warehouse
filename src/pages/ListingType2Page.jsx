import React, { useEffect, useRef, useState } from "react";

const VIEW_OPTIONS = [
  { key: "inside", label: "Interior" },
  { key: "wide", label: "Wide Shot" },
  { key: "wideinside", label: "Wide Inside" },
  { key: "aisle", label: "Down Aisle" },
  { key: "overhead", label: "Overhead" },
  { key: "dock", label: "Dock Side" },
  { key: "street", label: "Horner Ave" },
  { key: "sitebird", label: "Site Bird" },
];

const LAYER_OPTIONS = [
  { key: "shell", label: "Exterior Shell" },
  { key: "logistics", label: "Logistics" },
  { key: "ground", label: "Ground" },
  { key: "context", label: "Context" },
  { key: "landscape", label: "Landscape" },
];

const DEFAULT_LAYERS = {
  shell: true,
  logistics: true,
  ground: true,
  context: true,
  landscape: true,
};

export default function ListingType2Page({ openLeadModal }) {
  const iframeRef = useRef(null);
  const [activeView, setActiveView] = useState("inside");
  const [animateOn, setAnimateOn] = useState(false);
  const [wireframeOn, setWireframeOn] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [layers, setLayers] = useState(DEFAULT_LAYERS);

  const postToWarehouse = (payload) => {
    iframeRef.current?.contentWindow?.postMessage(
      { scope: "warehouse-controls", ...payload },
      window.location.origin
    );
  };

  const syncFrameState = () => {
    postToWarehouse({ type: "view", view: activeView });
    postToWarehouse({ type: "animate", value: animateOn });
    postToWarehouse({ type: "wireframe", value: wireframeOn });
    Object.entries(layers).forEach(([layer, value]) => {
      postToWarehouse({ type: "layer", layer, value });
    });
  };

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.type !== "warehouse:state") return;

      if (typeof data.activeView === "string") {
        setActiveView(data.activeView);
      }
      if (typeof data.animating === "boolean") {
        setAnimateOn(data.animating);
      }
      if (typeof data.wireframe === "boolean") {
        setWireframeOn(data.wireframe);
      }
      if (typeof data.gameActive === "boolean") {
        setGameActive(data.gameActive);
      }
      if (data.layers && typeof data.layers === "object") {
        setLayers((prev) => ({ ...prev, ...data.layers }));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const handleViewClick = (view) => {
    setActiveView(view);
    postToWarehouse({ type: "view", view });
  };

  const handleAnimateToggle = () => {
    const next = !animateOn;
    setAnimateOn(next);
    postToWarehouse({ type: "animate", value: next });
  };

  const handleWireframeToggle = () => {
    const next = !wireframeOn;
    setWireframeOn(next);
    postToWarehouse({ type: "wireframe", value: next });
  };

  const handleLayerToggle = (layer) => {
    const next = !layers[layer];
    const nextLayers = { ...layers, [layer]: next };
    setLayers(nextLayers);
    postToWarehouse({ type: "layer", layer, value: next });
  };

  const handleReset = () => {
    setActiveView("inside");
    setAnimateOn(false);
    setWireframeOn(false);
    setGameActive(false);
    setLayers(DEFAULT_LAYERS);
    postToWarehouse({ type: "reset" });
  };

  const handleGameToggle = () => {
    const next = !gameActive;
    setGameActive(next);
    postToWarehouse({ type: "game", action: next ? "enter" : "exit" });
  };

  return (
    <main id="main" className="section listingtype2-page">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">ListingType2</div>
            <h1 style={{ marginTop: "8px" }}>Warehouse animation + interactive game</h1>
          </div>
          <p>
            This page keeps the same warehouse build but gives it a cleaner desktop presentation by
            pulling the controls out above the stage.
          </p>
        </div>

        <div className="grid grid-2 listingtype2-grid" style={{ alignItems: "start" }}>
          <div className="card glow">
            <div className="badges" style={{ marginBottom: "12px" }}>
              <span className="pill">
                <strong>Animation</strong>
              </span>
              <span className="pill">Camera presets</span>
              <span className="pill">Game mode</span>
            </div>
            <h2 style={{ marginBottom: "10px" }}>What this listing type adds</h2>
            <div className="table-like">
              <div className="row">
                <b>Cleaner hero stage</b>
                <span>
                  The warehouse scene no longer has the desktop button stack floating inside the
                  viewport.
                </span>
              </div>
              <div className="row">
                <b>Richer storytelling</b>
                <span>
                  Interior capacity, loading flow, aisle logic, and storage style become easier to
                  read at a glance.
                </span>
              </div>
              <div className="row">
                <b>Future-ready</b>
                <span>
                  The working warehouse build still lives in the same React project and can later
                  evolve into a tighter component-based scene.
                </span>
              </div>
            </div>
            <div className="hero-actions" style={{ marginTop: "16px" }}>
              <button className="btn btn-primary" type="button" onClick={openLeadModal}>
                Get the checklist
              </button>
              <a className="btn btn-secondary" href="/warehouse" target="_blank" rel="noreferrer">
                Open full warehouse tab
              </a>
            </div>
          </div>

          <div className="card soft warehouse-stage-card">
            <div className="warehouse-toolbar-group">
              <div className="warehouse-toolbar-label">Views</div>
              <div className="warehouse-toolbar-row">
                {VIEW_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    className={`warehouse-toolbar-btn ${
                      activeView === option.key ? "is-active" : ""
                    }`}
                    onClick={() => handleViewClick(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="warehouse-toolbar-group">
              <div className="warehouse-toolbar-label">Scene toggles</div>
              <div className="warehouse-toolbar-row">
                <button
                  type="button"
                  className={`warehouse-toolbar-btn ${animateOn ? "is-toggle-on" : ""}`}
                  onClick={handleAnimateToggle}
                >
                  {animateOn ? "Stop Animate" : "Animate"}
                </button>
                <button
                  type="button"
                  className={`warehouse-toolbar-btn ${wireframeOn ? "is-toggle-on" : ""}`}
                  onClick={handleWireframeToggle}
                >
                  {wireframeOn ? "Hide Wireframe" : "Wireframe"}
                </button>
                {LAYER_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    className={`warehouse-toolbar-btn ${
                      layers[option.key] ? "is-toggle-on" : ""
                    }`}
                    onClick={() => handleLayerToggle(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="warehouse-toolbar-group warehouse-toolbar-group--actions">
              <div className="warehouse-toolbar-label">Actions</div>
              <div className="warehouse-toolbar-row">
                <button type="button" className="warehouse-toolbar-btn" onClick={handleReset}>
                  Reset Scene
                </button>
                <button
                  type="button"
                  className={`warehouse-toolbar-btn warehouse-toolbar-btn--game ${
                    gameActive ? "is-danger" : ""
                  }`}
                  onClick={handleGameToggle}
                >
                  {gameActive ? "Exit Game" : "3D Pallet Stack"}
                </button>
              </div>
            </div>

            <div className="warehouse-page-shell warehouse-page-shell--clean">
              <iframe
                ref={iframeRef}
                className="warehouse-embed"
                title="ListingType2 warehouse animation and game"
                src="/warehouse.html?externalControls=1"
                loading="eager"
                onLoad={syncFrameState}
              />
            </div>
          </div>
        </div>

        <section className="section tight">
          <div className="grid grid-3">
            <div className="card soft">
              <div className="kicker">Use case</div>
              <h3>Premium industrial marketing</h3>
              <p className="muted">
                Use this format for a hero warehouse listing, a featured campaign landing page, or
                a gated subscription-style showcase later.
              </p>
            </div>
            <div className="card soft">
              <div className="kicker">Current structure</div>
              <h3>Embedded from the same repo</h3>
              <p className="muted">
                The working warehouse build is shipped from the React app’s public folder, so
                deployment stays simple and self-contained.
              </p>
            </div>
            <div className="card soft">
              <div className="kicker">Next step</div>
              <h3>Mobile navigation logic later</h3>
              <p className="muted">
                The desktop cleanup is now done. Mobile menu behavior can be handled next without
                disturbing the warehouse scene itself.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
