import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadMagnetModal from './components/LeadMagnetModal';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ToolsPage from './pages/ToolsPage';
import GuidesPage from './pages/GuidesPage';
import ListingType2Page from './pages/ListingType2Page';

export default function App() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (event) => {
      const opener = event.target.closest('[data-open-leadmagnet]');
      if (opener) {
        event.preventDefault();
        setLeadModalOpen(true);
        return;
      }

      const anchor = event.target.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const isExternal = /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#');
      if (isExternal) return;
      if (!href.startsWith('/')) return;
      event.preventDefault();
      navigate(href);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  const pageName = useMemo(() => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/listings/')) return 'detail';
    if (location.pathname.startsWith('/listings')) return 'listings';
    if (location.pathname.startsWith('/tools')) return 'tools';
    if (location.pathname.startsWith('/guides')) return 'blog';
    if (location.pathname.startsWith('/listing-type-2')) return 'listing-type-2';
    return '';
  }, [location.pathname]);

  return (
    <div className="app-shell" data-page={pageName}>
      <div className="scrollProgressWrap">
        <div className="scrollProgressBar" style={{ width: `${typeof window !== 'undefined' ? (window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100 : 0}%` }} />
      </div>
      <Header openLeadModal={() => setLeadModalOpen(true)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/:id" element={<PropertyDetailPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/listing-type-2" element={<ListingType2Page openLeadModal={() => setLeadModalOpen(true)} />} />
      </Routes>
      <Footer openLeadModal={() => setLeadModalOpen(true)} />
      <LeadMagnetModal open={leadModalOpen} onClose={() => setLeadModalOpen(false)} />
    </div>
  );
}
