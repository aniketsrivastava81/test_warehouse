import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LISTINGS } from '../lib/siteData';
import { fmtNum, makeWalkScoreLink } from '../lib/siteUtils';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const listing = LISTINGS.find((item) => item.id === id) || LISTINGS[0];
  const [toast, setToast] = useState(false);
  const walkLink = makeWalkScoreLink({ address: listing.address, lat: listing.lat, lng: listing.lng });

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const key = 'MM_tour_requests';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({ listingId: listing.id, ...payload, ts: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing).slice(0, 80000));
    e.currentTarget.reset();
    setToast(true);
    setTimeout(() => setToast(false), 6500);
  };

  return (
    <main id="main" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Property Detail</div>
            <h1 style={{ marginTop: '8px' }}>{listing.title}</h1>
          </div>
          <p>Use this detail template as the long-form commercial listing page. It combines the vibe, practicality, neighbourhood fit, and next-step conversion.</p>
        </div>
        <div className="grid grid-2">
          <div className="card glow">
            <div className="badges">
              <span className="pill"><strong>{listing.type}</strong></span>
              <span className="pill">{listing.neighbourhood}</span>
              <span className="pill"><strong>{fmtNum(listing.sqft)}</strong> SF</span>
              <span className="pill">{listing.rate}</span>
            </div>
            <h2 style={{ marginTop: '12px' }}>{listing.title}</h2>
            <p className="muted">{listing.address}</p>
            <div className="hr"></div>
            <h3>The Vibe</h3>
            <p className="muted">{listing.vibe}</p>
            <h3>The Practicality</h3>
            <div className="table-like">
              <div className="row"><b>Square footage</b><span>{fmtNum(listing.sqft)} SF</span></div>
              <div className="row"><b>Ceiling height</b><span>{listing.ceilingHeight}</span></div>
              <div className="row"><b>Parking</b><span>{listing.parking}</span></div>
            </div>
            <h3 style={{ marginTop: '14px' }}>Location Advantage</h3>
            <p className="muted">{listing.locationAdvantage}</p>
            <h3 style={{ marginTop: '14px' }}>Lease Flexibility</h3>
            <p className="muted">{listing.leaseFlex}</p>
            <div className="hero-actions">
              <button className="btn btn-primary" data-open-leadmagnet>Get the checklist</button>
              <a className="btn btn-secondary" href="/tools#footfall">Run footfall</a>
              <a className="btn btn-ghost" href={walkLink} target="_blank" rel="noreferrer">Open Walk Score</a>
            </div>
          </div>
          <div className="card soft">
            <div className="listing-thumb" style={{ minHeight: '280px' }}>
              <img src={listing.img} alt="Listing placeholder" />
            </div>
            <div className="hr"></div>
            <h3>Book a tour (demo form)</h3>
            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="t_name">Name</label>
                <input id="t_name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="t_email">Email</label>
                <input id="t_email" name="email" type="email" placeholder="you@company.com" required />
              </div>
              <div className="field">
                <label htmlFor="t_notes">What do you need this space for?</label>
                <textarea id="t_notes" name="notes" rows="4" placeholder="A quick note helps me shortlist the right fit (budget, timeline, use, staff size)."></textarea>
              </div>
              <button className="btn btn-primary" type="submit">Request a tour</button>
              {toast ? <div className="toast"><strong>Request saved.</strong> (Demo mode: no email is sent.)</div> : null}
            </form>
            <p className="tiny muted" style={{ marginTop: '12px' }}>Source link: <a href={listing.source} target="_blank" rel="noreferrer">{listing.source}</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}
