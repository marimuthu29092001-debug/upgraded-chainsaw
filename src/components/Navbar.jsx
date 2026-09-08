import React, { useState, useEffect, useRef } from 'react';
import { LogoIcon, IconMoon, IconSun, IconSparkles, IconArrowRight } from './Icons';

export default function Navbar({ theme, toggleTheme, onOpenReportModal, onSignInClick, onLogOut, currentUser }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = currentUser?.name || 'Super Admin';
  const displayEmail = currentUser?.email || 'admin@stackly.com';
  const displayInitials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2) || 'SA';

  const navLinks = [
    { label: 'Live Studio', href: '#live-dashboard', badge: 'Interactive' },
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates', badge: '40+' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo with Skyscraper Crest Emblem */}
        <a href="#" className="brand-logo">
          <svg className="logo-crest-svg" viewBox="0 0 80 80" fill="none" style={{ width: '42px', height: '42px' }}>
            <defs>
              <linearGradient id="navSilverTower" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
            <ellipse cx="40" cy="62" rx="34" ry="9" stroke="url(#navSilverTower)" strokeWidth="3" fill="none" />
            <polygon points="22,60 22,34 32,26 32,60" fill="url(#navSilverTower)" opacity="0.85" />
            <polygon points="34,60 34,16 46,6 46,60" fill="url(#navSilverTower)" />
            <polygon points="48,60 48,28 58,36 58,60" fill="url(#navSilverTower)" opacity="0.9" />
            <polygon points="18,22 20,15 27,17 22,20 25,27 19,23 14,26 17,19 11,17 18,15" fill="#38bdf8" />
          </svg>
          <div className="brand-text">
            <span className="brand-title">Stackly</span>
            <span className="brand-sub">Reports & Analytics</span>
          </div>
        </a>


        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
              {link.badge && <span className="nav-pill">{link.badge}</span>}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {onLogOut ? (
            <div className="user-profile-wrapper" ref={profileRef}>
              <button 
                type="button" 
                className={`user-profile-trigger ${profileDropdownOpen ? 'active' : ''}`}
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-expanded={profileDropdownOpen}
                title="User Profile Menu"
              >
                <div className="user-avatar-circle">
                  <span>{displayInitials}</span>
                  <span className="user-status-indicator"></span>
                </div>
                <span className="user-profile-meta-text">
                  <span>{displayName}</span>
                  <svg className="user-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {/* Exact White Dropdown Card from Screenshot */}
              <div className={`user-dropdown-card ${profileDropdownOpen ? 'show' : ''}`}>
                <div className="dropdown-header-block">
                  <div className="dropdown-user-title">{displayName}</div>
                  <div className="dropdown-user-email">{displayEmail}</div>
                </div>
                
                <div className="dropdown-hr-divider"></div>
                
                <div className="dropdown-items-group">
                  <button 
                    type="button" 
                    className="dropdown-item-action" 
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      alert(`👤 Profile Overview:\n\nUser: ${displayName}\nEmail: ${displayEmail}\nRole: System Administrator\nSecurity: 2FA Active`);
                    }}
                  >
                    <span className="item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <span>My Profile</span>
                  </button>

                  <button 
                    type="button" 
                    className="dropdown-item-action" 
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      alert(`⚙️ Settings Console:\n\nTelemetry: Columnar 12ms Streaming\nCluster: ClickHouse Primary Node\nCadence: Real-time Ingestion`);
                    }}
                  >
                    <span className="item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                    </span>
                    <span>Settings</span>
                  </button>
                </div>

                <div className="dropdown-hr-divider"></div>

                <div className="dropdown-items-group" style={{ paddingBottom: '2px' }}>
                  <button 
                    type="button" 
                    className="dropdown-item-action logout-action" 
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (onLogOut) onLogOut();
                    }}
                  >
                    <span className="item-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                    </span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              type="button"
              onClick={onSignInClick || (() => { window.location.href = 'login.html'; })} 
              className="btn btn-secondary btn-sm nav-login-btn"
            >
              Sign In
            </button>
          )}

          <button 
            onClick={onOpenReportModal} 
            className="btn btn-primary btn-sm nav-cta-btn"
          >
            <IconSparkles size={16} />
            <span>Generate Report</span>
          </button>


          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                {link.badge && <span className="nav-pill">{link.badge}</span>}
              </a>
            ))}
            <div className="mobile-drawer-cta">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReportModal();
                }} 
                className="btn btn-primary w-full"
              >
                <IconSparkles size={16} />
                Generate Instant Report
              </button>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          z-index: 1000;
          transition: all var(--transition-normal);
          background: rgba(8, 12, 20, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid transparent;
        }

        [data-theme="light"] .navbar-header {
          background: rgba(255, 255, 255, 0.65);
        }

        .navbar-header.scrolled {
          background: var(--bg-surface-glass);
          border-bottom-color: var(--border-subtle);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          height: 66px;
        }

        .navbar-container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: inherit;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.03em;
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-sub {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }

        .nav-link {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          position: relative;
          padding: 0.3rem 0;
        }

        .nav-link:hover, .nav-link:first-child {
          color: var(--text-primary);
        }

        .nav-link:first-child::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--text-primary);
          border-radius: 2px;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.20);
        }


        .nav-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
          background: rgba(99, 102, 241, 0.15);
          color: var(--accent-secondary);
          border: 1px solid rgba(56, 189, 248, 0.25);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .theme-toggle-btn {
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          color: var(--accent-secondary);
          border-color: var(--accent-secondary);
          transform: rotate(15deg);
        }

        .mobile-hamburger-btn {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
        }

        .bar {
          width: 100%;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-menu-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-medium);
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-link {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 900px) {
          .desktop-nav, .nav-login-btn {
            display: none;
          }
          .mobile-hamburger-btn {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
