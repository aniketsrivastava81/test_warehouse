import { useEffect, useState } from 'react';
import { saveLocalLead } from '../lib/siteUtils';

export default function LeadMagnetModal({ open, onClose }) {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.space = fd.getAll('space');
    saveLocalLead(payload);
    e.currentTarget.reset();
    setToast(true);
    setTimeout(() => setToast(false), 6500);
  };

  return (
    <div className="modal" data-leadmagnet-modal aria-hidden={!open}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-card" role="dialog" aria-modal="true" aria-label="Get the Lease Checklist">
        <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        <div className="modal-header">
          <div className="badges" style={{ marginBottom: '10px' }}>
            <span className="pill"><strong>Free PDF</strong></span>
            <span className="pill">First lease • Renewal • Relocation</span>
          </div>
          <h2>Lease Renewal vs. Relocation Checklist</h2>
          <p className="muted">A calm, practical checklist designed to help GTA business owners compare options, reduce uncertainty, and move forward with more confidence.</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="lm_name">Name</label>
              <input id="lm_name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="lm_email">Email</label>
              <input id="lm_email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="lm_stage">Where are you in your leasing journey?</label>
            <select id="lm_stage" name="stage" required defaultValue="">
              <option value="" disabled>Select one</option>
              <option value="first-lease">First commercial lease (0–3 months)</option>
              <option value="renewal">Lease renewal (expires in 0–6 months)</option>
              <option value="relocation">Relocating / scaling into a new space</option>
              <option value="exploring">Exploring early options (6+ months out)</option>
            </select>
          </div>
          <div className="field">
            <label>What type of space are you considering?</label>
            <div className="checks">
              <label className="check"><input type="checkbox" name="space" value="office" /> <span>Office</span></label>
              <label className="check"><input type="checkbox" name="space" value="retail" /> <span>Retail</span></label>
              <label className="check"><input type="checkbox" name="space" value="warehouse" /> <span>Warehouse / Industrial</span></label>
            </div>
          </div>
          <div className="field">
            <label htmlFor="lm_note">Anything helpful to know? (optional)</label>
            <textarea id="lm_note" name="note" rows="3" placeholder="Budget range, preferred area, timing, or any concerns you want help with."></textarea>
          </div>
          <button className="btn btn-primary" type="submit">Send me the checklist</button>
          <p className="tiny muted">No spam. Just practical leasing guidance and a clearer starting point.</p>
          {toast ? (
            <div className="toast" data-leadmagnet-toast>
              <strong>Done.</strong> Your request has been saved. (Demo mode: no email is sent.)
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
