import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import LegacyHtmlBlock from '../components/LegacyHtmlBlock';
import { LISTINGS } from '../lib/siteData';
import { escapeHTML, fmtNum, saveLocalLead, transformLegacyLinks } from '../lib/siteUtils';
import homeHtmlRaw from '../legacy/landingpage_main.html?raw';

function renderFeatured(listing) {
  return `
    <div class="card soft">
      <div class="badges">
        <span class="pill"><strong>${escapeHTML(listing.type)}</strong></span>
        <span class="pill"><strong>${fmtNum(listing.sqft)}</strong> SF</span>
        <span class="pill">${escapeHTML(listing.neighbourhood)}</span>
      </div>
      <h3 style="margin-top:10px">${escapeHTML(listing.title)}</h3>
      <p class="muted">${escapeHTML(listing.vibe)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-sm" href="/listings/${encodeURIComponent(listing.id)}">View details</a>
        <a class="btn btn-ghost btn-sm" href="/listings">See all</a>
      </div>
    </div>
  `;
}

export default function HomePage() {
  const html = useMemo(() => transformLegacyLinks(homeHtmlRaw), []);

  const handleReady = (root) => {
    const featured = root.querySelector('[data-featured]');
    if (featured) featured.innerHTML = LISTINGS.slice(0, 3).map(renderFeatured).join('');

    const form = root.querySelector('[data-hero-form]');
    const toast = root.querySelector('[data-hero-toast]');
    const onSubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      saveLocalLead({ ...Object.fromEntries(fd.entries()), source: 'hero-form' });
      form.reset();
      if (toast) {
        toast.hidden = false;
        setTimeout(() => { toast.hidden = true; }, 6500);
      }
    };
    form?.addEventListener('submit', onSubmit);
    return () => form?.removeEventListener('submit', onSubmit);
  };

  return (
    <>
      <LegacyHtmlBlock as="main" id="main" className="home-shell" html={html} onReady={handleReady} />
      <section className="section listingtype2-highlight">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="kicker">Interactive experience</div>
              <h2>ListingType2 — Warehouse animation + game</h2>
            </div>
            <p>Use the working warehouse animation as a richer listing format. The page keeps the scene, camera views, and Game Mode inside one experience.</p>
          </div>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div className="card glow">
              <div className="badges" style={{ marginBottom: '12px' }}>
                <span className="pill"><strong>Warehouse demo</strong></span>
                <span className="pill">Interactive listing format</span>
                <span className="pill">Game-enabled</span>
              </div>
              <h3 style={{ marginBottom: '10px' }}>A fuller showcase for industrial inventory</h3>
              <p className="muted">This listing type turns a warehouse into a guided visual experience: interior views, operational storytelling, camera presets, and a branded game layer for dwell time.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" to="/listing-type-2">Open ListingType2</Link>
                <Link className="btn btn-secondary" to="/listings">Back to listings</Link>
              </div>
            </div>
            <div className="card soft iframe-preview-card">
              <div className="iframe-shell compact">
                <iframe title="ListingType2 preview" src="/warehouse-game/index.html" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
