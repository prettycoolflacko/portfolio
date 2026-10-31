import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import VistaIcon from '../VistaIcon';
import { routeMeta } from '../../data/navigation';

export default function AddressBar({ isLoading = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [typedPath, setTypedPath] = useState('');
  const inputRef = useRef(null);

  const query = searchParams.get('q') || '';
  const currentMeta = routeMeta[location.pathname] || {
    title: 'Windows Explorer',
    breadcrumbName: location.pathname.replace('/', '') || 'Computer',
    explorerPath: `C:\\Users\\Elyuzar${location.pathname.replace('/', '\\')}`,
    allowSearch: false,
  };

  const currentDisplayPath = currentMeta.explorerPath || `C:\\Users\\Elyuzar${location.pathname}`;

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setTypedPath(currentDisplayPath);
    setIsEditing(true);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    const cleaned = typedPath.trim().toLowerCase();

    // Map common Windows Explorer typed inputs to actual routes
    const pathMap = {
      'c:': '/',
      'c:\\': '/',
      'c:\\users': '/',
      'c:\\users\\elyuzar': '/',
      'home': '/',
      '/': '/',
      'about': '/about',
      'c:\\users\\elyuzar\\about': '/about',
      'c:\\users\\elyuzar\\system': '/about',
      'system': '/about',
      'skills': '/skills',
      'control panel': '/skills',
      'control panel\\skills': '/skills',
      'c:\\users\\elyuzar\\skills': '/skills',
      'projects': '/projects',
      'c:\\users\\elyuzar\\projects': '/projects',
      'experience': '/experience',
      'event viewer': '/experience',
      'c:\\users\\elyuzar\\experience': '/experience',
      'education': '/education',
      'libraries\\documents\\education': '/education',
      'c:\\users\\elyuzar\\education': '/education',
      'certifications': '/certifications',
      'certs': '/certifications',
      'certmgr.msc': '/certifications',
      'contact': '/contact',
      'mail': '/contact',
      'c:\\users\\elyuzar\\mail': '/contact',
    };

    if (pathMap[cleaned]) {
      navigate(pathMap[cleaned]);
    } else if (cleaned.startsWith('/')) {
      navigate(cleaned);
    } else {
      // Invalid typed path displays 404 dialog route
      navigate(`/not-found?path=${encodeURIComponent(typedPath)}`);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  // React Router sets idx in window.history.state
  const historyIdx = typeof window !== 'undefined' ? window.history.state?.idx ?? 0 : 0;
  const canGoBack = historyIdx > 0;

  return (
    <div className="win7-toolbar" style={{ position: 'relative' }}>
      {/* Back & Forward History Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button
          className={`win7-nav-btn${!canGoBack ? ' disabled' : ''}`}
          title="Back (Alt+Left Arrow)"
          aria-label="Back"
          onClick={() => navigate(-1)}
          disabled={!canGoBack}
          style={{ opacity: canGoBack ? 1 : 0.45, cursor: canGoBack ? 'pointer' : 'default' }}
        >
          ◀
        </button>
        <button
          className="win7-nav-btn"
          title="Forward (Alt+Right Arrow)"
          aria-label="Forward"
          onClick={() => navigate(1)}
          style={{ opacity: 0.85 }}
        >
          ▶
        </button>
      </div>

      {/* Address Bar Container */}
      <div
        className="win7-address-bar"
        style={{ position: 'relative', overflow: 'hidden', cursor: isEditing ? 'text' : 'pointer' }}
        onClick={() => !isEditing && handleStartEditing()}
      >
        {/* Authentic Windows 7 animated green progress bar during page load */}
        {isLoading && (
          <div
            className="win7-address-progress"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, #b9f6ca 0%, #00e676 50%, #00c853 100%)',
              opacity: 0.55,
              zIndex: 1,
              animation: 'win7-progress-glow 1.5s linear infinite',
              pointerEvents: 'none',
            }}
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', position: 'relative', zIndex: 2 }}>
          <VistaIcon id="computer" size={14} />

          {isEditing ? (
            <form onSubmit={handleAddressSubmit} style={{ width: '100%', display: 'flex' }}>
              <input
                ref={inputRef}
                type="text"
                value={typedPath}
                onChange={(e) => setTypedPath(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsEditing(false);
                }}
                className="win7-address-input"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  color: '#1e395b',
                  background: 'transparent',
                }}
              />
            </form>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, overflow: 'hidden' }}>
              <span
                className="win7-address-segment"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/');
                }}
                title="Go to Computer"
              >
                Computer
              </span>
              <span>›</span>
              <span
                className="win7-address-segment"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/');
                }}
                title="Go to Local Disk (C:)"
              >
                Local Disk (C:)
              </span>
              <span>›</span>
              <span
                className="win7-address-segment"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/');
                }}
                title="Go to Users"
              >
                Users
              </span>
              <span>›</span>
              <span
                className="win7-address-segment"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/');
                }}
                title="Go to Elyuzar"
              >
                Elyuzar
              </span>
              <span>›</span>
              <span
                className="win7-address-segment active"
                style={{ fontWeight: 700, color: '#0d47a1' }}
              >
                {currentMeta.breadcrumbName}
              </span>
            </div>
          )}

          {/* Refresh / Stop Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.location.reload();
            }}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0 4px',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Refresh (F5)"
            aria-label="Refresh page"
          >
            <VistaIcon id="refresh" size={14} />
          </button>
        </div>
      </div>

      {/* Toolbar Search Box */}
      <div
        style={{
          background: currentMeta.allowSearch ? '#ffffff' : '#f0f3f6',
          border: '1px solid #9bb7d4',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          padding: '2px 8px',
          gap: 6,
          width: 180,
          opacity: currentMeta.allowSearch ? 1 : 0.65,
        }}
        className="hidden sm:flex"
      >
        <VistaIcon id="search" size={13} title="Search" />
        <input
          type="text"
          placeholder={currentMeta.allowSearch ? `Search ${currentMeta.breadcrumbName}...` : 'Search disabled'}
          value={query}
          disabled={!currentMeta.allowSearch}
          onChange={handleSearchChange}
          aria-label={`Search ${currentMeta.breadcrumbName}`}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '11px',
            width: '100%',
            fontFamily: 'var(--font-body)',
            color: '#1e395b',
            background: 'transparent',
            cursor: currentMeta.allowSearch ? 'text' : 'not-allowed',
          }}
        />
        {query && (
          <button
            onClick={() => setSearchParams({})}
            style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '10px', color: '#90a4ae' }}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
