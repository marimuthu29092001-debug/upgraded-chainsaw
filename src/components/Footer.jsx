import React, { useState } from 'react';
import { LogoIcon, IconSparkles, IconCheck, IconArrowRight } from './Icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col reveal-left delay-1">
            <a href="#" className="footer-logo">
              <LogoIcon size={34} />
              <div className="footer-logo-text">
                <span className="footer-brand-name">Stackly</span>
                <span className="footer-brand-tag">Reports & Analytics</span>
              </div>
            </a>

            <p className="footer-tagline">
              The modern business intelligence studio built for teams who value both 
              aesthetic clarity and computational speed.
            </p>

            {/* Live Status indicator */}
            <div className="system-status-badge">
              <span className="status-indicator-dot"></span>
              <span>All Systems Operational • ClickHouse 12ms</span>
            </div>
          </div>

          {/* Nav Col 1: Platform */}
          <div className="footer-col reveal-left delay-2">
            <h4 className="footer-col-title">Product Studio</h4>
            <ul className="footer-links">
              <li><a href="#live-dashboard">Live Analytics Console</a></li>
              <li><a href="#features">Visual Report Builder</a></li>
              <li><a href="#templates">40+ Dashboard Templates</a></li>
              <li><a href="#features">AI Anomaly Diagnostics</a></li>
              <li><a href="#pricing">Enterprise Governance</a></li>
            </ul>
          </div>

          {/* Nav Col 2: Solutions */}
          <div className="footer-col reveal-right delay-2">
            <h4 className="footer-col-title">Solutions</h4>
            <ul className="footer-links">
              <li><a href="#templates">Executive C-Suite KPI</a></li>
              <li><a href="#templates">SaaS Churn & ARR Cohorts</a></li>
              <li><a href="#templates">E-Commerce Omnichannel</a></li>
              <li><a href="#templates">Performance Marketing ROI</a></li>
              <li><a href="#templates">Cloud FinOps Optimization</a></li>
            </ul>
          </div>

          {/* Nav Col 3: Developers & Newsletter */}
          <div className="footer-col footer-newsletter-col reveal-right delay-3">
            <h4 className="footer-col-title">Stay Ahead in BI</h4>
            <p className="newsletter-desc">
              Subscribe to the Stackly Intelligence dispatch. Bi-weekly teardowns of metrics that drive enterprise valuations.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter work email..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm newsletter-btn">
                  <span>Join</span>
                  <IconArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="subscribed-success">
                <IconCheck size={16} className="text-emerald" />
                <span>You're subscribed! Welcome to Stackly Dispatch.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © {new Date().getFullYear()} Stackly Analytics Inc. Inspired by Wix Design Freedom. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <span className="dot-sep">•</span>
            <a href="#">Terms of Service</a>
            <span className="dot-sep">•</span>
            <a href="#">Security & SOC-2</a>
            <span className="dot-sep">•</span>
            <a href="#">Cookie Preferences</a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
          padding: 80px 0 40px 0;
          position: relative;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.4fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: inherit;
          margin-bottom: 1.25rem;
        }

        .footer-brand-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }

        .footer-brand-tag {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .footer-tagline {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 320px;
        }

        .system-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          color: #10b981;
          font-weight: 600;
        }

        .status-indicator-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .footer-col-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 1.25rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--accent-secondary);
        }

        .newsletter-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          padding: 0.6rem 0.9rem;
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.85rem;
          outline: none;
        }

        .newsletter-input:focus {
          border-color: var(--accent-primary);
        }

        .subscribed-success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.8rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          color: #10b981;
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.82rem;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .legal-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .legal-links a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .legal-links a:hover {
          color: var(--text-secondary);
        }

        .dot-sep {
          color: var(--border-medium);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-bar {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
