import { useMemo } from 'react';
import LegacyHtmlBlock from '../components/LegacyHtmlBlock';
import toolsHtmlRaw from '../legacy/tools_main.html?raw';
import { escapeHTML, footfallIndex, makeWalkScoreLink, officeGoerGuide, transformLegacyLinks } from '../lib/siteUtils';

export default function ToolsPage() {
  const html = useMemo(() => transformLegacyLinks(toolsHtmlRaw), []);

  const handleReady = (root) => {
    const tool = root.querySelector('[data-footfall-tool]');
    const form = root.querySelector('[data-footfall-form]');
    const out = root.querySelector('[data-footfall-output]');
    const addr = root.querySelector('[name="address"]');
    const lat = root.querySelector('[name="lat"]');
    const lng = root.querySelector('[name="lng"]');
    const walk = root.querySelector('[name="walk"]');
    const transit = root.querySelector('[name="transit"]');
    const bike = root.querySelector('[name="bike"]');
    const density = root.querySelector('[name="density"]');
    const category = root.querySelector('[name="category"]');
    const businessType = root.querySelector('[name="bizType"]');
    const walkScoreBtn = root.querySelector('[data-open-walkscore]');

    const openWalkScore = () => {
      const url = makeWalkScoreLink({ address: addr?.value, lat: lat?.value, lng: lng?.value });
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    walkScoreBtn?.addEventListener('click', openWalkScore);

    const onSubmit = (e) => {
      e.preventDefault();
      const idx = footfallIndex({ walk: walk?.value, transit: transit?.value, bike: bike?.value, officeDensity: density?.value });
      const guide = officeGoerGuide({ index: idx, category: category?.value || 'this location', businessType: businessType?.value || 'retail' });
      const link = makeWalkScoreLink({ address: addr?.value, lat: lat?.value, lng: lng?.value });
      if (out) out.innerHTML = `
        <div class="card glow">
          <div class="badges" style="margin-bottom:10px">
            <span class="pill"><strong>Footfall Index</strong> ${idx}/100</span>
            <span class="pill"><strong>Walk</strong> ${escapeHTML(walk?.value || '—')}</span>
            <span class="pill"><strong>Transit</strong> ${escapeHTML(transit?.value || '—')}</span>
            <span class="pill"><strong>Bike</strong> ${escapeHTML(bike?.value || '—')}</span>
          </div>
          <p class="muted" style="margin-top:0">${escapeHTML(guide.summary)} <a href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer">Open Walk Score</a></p>
          <div class="table-like">${guide.playbook.map((r) => `<div class="row"><b>${escapeHTML(r.k)}</b><span>${escapeHTML(r.v)}</span></div>`).join('')}</div>
        </div>`;
    };
    form?.addEventListener('submit', onSubmit);

    const emailTool = root.querySelector('[data-email-tool]');
    const emailForm = emailTool?.querySelector('[data-email-form]');
    const emailOut = emailTool?.querySelector('[data-email-output]');
    const onEmail = (e) => {
      e.preventDefault();
      const fd = new FormData(emailForm);
      const name = (fd.get('leadName') || 'there').toString().trim();
      const focus = (fd.get('leadFocus') || 'a commercial space').toString().trim();
      const link = (fd.get('marketLink') || '#').toString().trim();
      const body = `Subject: Thanks for requesting your valuation — next steps\n\nHi ${name},\n\nThanks for reaching out and requesting a Home Valuation. I’m excited to help.\n\nIf you’re open to it, I’d love to offer a quick, no‑obligation consultation (15 minutes) to understand your timeline and goals so the valuation reflects the factors that matter most to you.\n\nIn the meantime, here’s my latest market report: ${link}\n\nReply with 2–3 time windows that work for you this week, and I’ll confirm right away.\n\nWarmly,\nMegha Mehta\nCommercial Real Estate • GTA`;
      if (emailOut) emailOut.innerHTML = `
        <div class="card soft">
          <div class="badges" style="margin-bottom:10px">
            <span class="pill"><strong>Email Draft</strong> Contact Form Follow‑up</span>
            <span class="pill"><strong>Focus</strong> ${escapeHTML(focus)}</span>
          </div>
          <textarea class="field" style="min-height:220px; width:100%; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.10); background: rgba(0,0,0,.28); color: rgba(255,255,255,.92)">${escapeHTML(body)}</textarea>
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px">
            <button class="btn btn-primary" type="button" data-copy-email>Copy</button>
            <a class="btn btn-ghost" href="mailto:?subject=${encodeURIComponent('Thanks for requesting your valuation — next steps')}&body=${encodeURIComponent(body)}">Open in Email</a>
          </div>
        </div>`;
      emailOut?.querySelector('[data-copy-email]')?.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(body); alert('Copied to clipboard.'); }
        catch { alert('Copy failed. Please select the text and copy manually.'); }
      });
    };
    emailForm?.addEventListener('submit', onEmail);

    const outline = root.querySelector('[data-lead-outline]');
    if (outline) outline.innerHTML = `
      <div class="card soft">
        <div class="kicker">Lead Magnet</div>
        <h3 style="margin-top:6px">10 Mistakes First‑Time Buyers Make in Richmond Hill — and How to Avoid Them</h3>
        <ol style="margin:10px 0 0 18px; color: rgba(255,255,255,.82)">
          <li>Confusing rent with total occupancy cost (rent + TMI/ops + utilities).</li>
          <li>Underestimating build‑out time: permits, contractors, signage, IT, inspections.</li>
          <li>Signing without clarifying use clauses, exclusives, and zoning fit.</li>
          <li>Ignoring parking ratios, loading, and delivery access (operational reality).</li>
          <li>Not negotiating flexibility: renewal rights, assignment/sublease, expansion options.</li>
        </ol>
      </div>`;

    return () => {
      walkScoreBtn?.removeEventListener('click', openWalkScore);
      form?.removeEventListener('submit', onSubmit);
      emailForm?.removeEventListener('submit', onEmail);
    };
  };

  return <LegacyHtmlBlock as="main" id="main" className="section" html={html} onReady={handleReady} />;
}
