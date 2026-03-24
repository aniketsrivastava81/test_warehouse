import { NavLink } from 'react-router-dom';

export default function Footer({ openLeadModal }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="card glow" style={{ marginBottom: '24px' }}>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="kicker">Move with more clarity</div>
              <h2 style={{ margin: '8px 0 10px 0' }}>The right commercial space should support growth, not create hidden stress.</h2>
              <p className="muted" style={{ maxWidth: '62ch' }}>
                Whether you are signing your first lease, renewing an expiring one, or comparing relocation options,
                Megha Mehta helps you move forward with practical guidance, better-fit options, and stronger decision support.
              </p>
            </div>
            <div className="card soft">
              <h3>Get started with one clear next step</h3>
              <p className="muted">Download the Lease Renewal vs. Relocation Checklist or explore the tools page for footfall, ROI, CAM, and market trend support.</p>
              <div className="footer-actions" style={{ marginTop: '12px' }}>
                <button className="btn btn-primary btn-sm" type="button" onClick={openLeadModal}>Download Checklist</button>
                <NavLink className="btn btn-secondary btn-sm" to="/tools">Explore Tools</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-mark" aria-hidden="true">MM</span>
              <div>
                <div className="footer-name">Megha Mehta</div>
                <div className="footer-sub">Commercial Leasing • Greater Toronto Area</div>
              </div>
            </div>
            <p className="muted">Over 20 years of helping business owners secure locations with more confidence, less confusion, and better long-term fit.</p>
            <div className="badges" style={{ marginTop: '14px' }}>
              <span className="pill"><strong>20+ years</strong> experience</span>
              <span className="pill"><strong>50+ businesses</strong> supported</span>
              <span className="pill"><strong>Client-first</strong> guidance</span>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/listings">Property Listings</NavLink></li>
              <li><NavLink to="/tools">Tools & Calculators</NavLink></li>
              <li><NavLink to="/guides">Guides & Neighbourhood Insights</NavLink></li>
              <li><NavLink to="/listing-type-2">ListingType2</NavLink></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul className="footer-links">
              <li><a href="tel:+14165551234">+1 (416) 555-1234</a></li>
              <li><a href="mailto:megha@yourbrokerage.ca">megha@yourbrokerage.ca</a></li>
              <li>Serving Richmond Hill, Markham, Vaughan, Toronto, Mississauga, and the wider GTA</li>
            </ul>
          </div>
        </div>
        <div className="card soft" style={{ marginTop: '24px' }}>
          <p className="tiny muted" style={{ marginBottom: 0 }}><strong>Disclaimer:</strong> This website template is for demonstration purposes. Property listings, walkability inputs, market metrics, and calculator outputs are illustrative unless connected to verified live data.</p>
        </div>
        <div className="footer-bottom">
          <span className="tiny muted">© {new Date().getFullYear()} Megha Mehta. All rights reserved.</span>
          <span className="tiny muted">Commercial leasing support built to be clear, elegant, and conversion-focused.</span>
        </div>
      </div>
    </footer>
  );
}
