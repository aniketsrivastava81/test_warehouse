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

export default function WarehousePage() {
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
    <section className="section warehouse-page">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Warehouse Experience</div>
            <h1 style={{ marginTop: "8px" }}>3D Warehouse + Pallet Stack Game</h1>
          </div>
          <p>
            The scene stays inside one iframe, but the desktop controls now live above it so the
            warehouse view feels cleaner and more cinematic.
          </p>
        </div>

        <div className="card soft warehouse-controls-card">
          <div className="warehouse-toolbar-meta">
            <div>
              <div className="kicker">Desktop control deck</div>
              <h2 style={{ marginTop: "8px" }}>Controls sit above the stage now</h2>
            </div>
            <p className="muted">
              Same warehouse logic, cleaner viewport. Views, toggles, reset, and game mode are now
              managed from the page shell instead of floating over the scene.
            </p>
          </div>

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
        </div>

        <div className="warehouse-page-shell warehouse-page-shell--clean">
          <iframe
            ref={iframeRef}
            className="warehouse-embed"
            src="/warehouse.html?externalControls=1"
            title="3D warehouse experience"
            loading="lazy"
            onLoad={syncFrameState}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
