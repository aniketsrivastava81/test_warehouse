import { NavLink } from 'react-router-dom';

export default function Header({ openLeadModal }) {
  return (
    <header className="site-header" role="banner">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container">
        <div className="header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '10px 0 6px 0', borderBottom: '1px solid rgba(24,32,43,.06)' }}>
          <div className="badges" style={{ gap: '8px' }}>
            <span className="pill"><strong>20+ years</strong> commercial guidance</span>
            <span className="pill"><strong>50+ businesses</strong> supported</span>
          </div>
          <div className="tiny muted" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a href="tel:+14165551234">+1 (416) 555-1234</a>
            <a href="mailto:megha@yourbrokerage.ca">megha@yourbrokerage.ca</a>
          </div>
        </div>
        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="Go to homepage">
            <span className="brand-mark" aria-hidden="true">MM</span>
            <span className="brand-text">
              <span className="brand-name">Megha Mehta</span>
              <span className="brand-sub">Commercial Leasing • Greater Toronto Area</span>
            </span>
          </NavLink>
          <nav className="nav" aria-label="Primary">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/listings">Listings</NavLink>
            <NavLink to="/tools">Tools</NavLink>
            <NavLink to="/guides">Guides</NavLink>
            <NavLink to="/listing-type-2">ListingType2</NavLink>
            <button className="btn btn-primary btn-sm" type="button" onClick={openLeadModal}>Get the Checklist</button>
          </nav>
        </div>
      </div>
    </header>
  );
}
