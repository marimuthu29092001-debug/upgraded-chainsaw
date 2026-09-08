import React from 'react';
import { IconZap, IconCheck, IconShieldCheck, IconTrendingUp } from './Icons';

export default function MetricsCounter() {
  const stats = [
    {
      value: '$4.8B+',
      label: 'Gross Revenue Tracked',
      detail: 'Across 14,000+ connected Stripe & billing accounts',
      icon: <IconTrendingUp size={22} className="text-emerald" />
    },
    {
      value: '18.2M+',
      label: 'Executive Reports Synthesized',
      detail: 'Automated daily Slack & PDF digests delivered',
      icon: <IconZap size={22} className="text-indigo" />
    },
    {
      value: '14ms',
      label: 'Median Query Speed',
      detail: 'Ultra-low latency powered by ClickHouse columns',
      icon: <IconZap size={22} className="text-cyan" />
    },
    {
      value: '99.99%',
      label: 'Guaranteed SLA Uptime',
      detail: 'SOC-2 Type II, HIPAA, and GDPR enterprise grade',
      icon: <IconShieldCheck size={22} className="text-emerald" />
    }
  ];

  const brands = [
    'LINEAR', 'STRIPE', 'VERCEL', 'SUPABASE', 'NOTION', 'RETROFIT', 'DATALAYER'
  ];

  return (
    <section className="metrics-scale-section">
      <div className="container">
        {/* Brand Logos Strip */}
        <div className="logos-strip-wrapper reveal-up">
          <span className="logos-label">POWERING ANALYTICS AT HIGH-GROWTH COMPANIES</span>
          <div className="logos-row reveal-up delay-1">
            {brands.map((b, i) => (
              <span key={i} className="brand-logo-pill">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Big Numbers Grid */}
        <div className="stats-counter-grid">
          {stats.map((item, idx) => {
            const sideClass = idx < 2 ? 'reveal-left' : 'reveal-right';
            const delayClass = `delay-${(idx % 2) + 1}`;
            return (
              <div key={idx} className={`stat-box glass-card ${sideClass} ${delayClass}`}>
                <div className="stat-top">
                  <span className="stat-num gradient-text">{item.value}</span>
                  <span className="stat-icon-wrap">{item.icon}</span>
                </div>
                <h3 className="stat-label">{item.label}</h3>
                <p className="stat-detail">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .metrics-scale-section {
          padding: 60px 0 80px 0;
          position: relative;
        }

        .logos-strip-wrapper {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .logos-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .brand-logo-pill {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          opacity: 0.55;
          transition: opacity var(--transition-fast), color var(--transition-fast);
          cursor: default;
        }

        .brand-logo-pill:hover {
          opacity: 1;
          color: var(--text-primary);
        }

        .stats-counter-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .stat-box {
          padding: 1.75rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
        }

        .stat-box:hover {
          border-color: var(--border-glow);
          transform: translateY(-3px);
        }

        .stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .stat-num {
          font-family: var(--font-heading);
          font-size: 2.35rem;
          font-weight: 800;
          line-height: 1;
        }

        .stat-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .stat-detail {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .text-indigo { color: #818cf8; }
        .text-cyan { color: #38bdf8; }

        @media (max-width: 1024px) {
          .stats-counter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .stats-counter-grid {
            grid-template-columns: 1fr;
          }
          .logos-row {
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
